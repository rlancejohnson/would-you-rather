
from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Q
from django.core.exceptions import ValidationError
from .models import Question, Option
from .serializers import CreateQuestionSerializer, GetQuestionSerializer, VoteSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()

    def get_serializer_class(self):
        print(self.request)
        return CreateQuestionSerializer if self.request.method == 'POST' else GetQuestionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context

    def create(self, request, *args, **kwargs):
        user = request.user
        question = request.data
        question_keys = [f'{question.option_one.label}{question.option_two.label}' for question in Question.objects.filter(
            Q(option_one__label = question['optionOne'], option_two__label = question['optionTwo']) | Q(option_one__label = question['optionTwo'], option_two__label = question['optionOne'])
        )]

        if question['optionOne'] == question['optionTwo']:
            raise ValidationError('Option one and two cannot be the same.')

        elif f"{question['optionOne']}{question['optionTwo']}" in question_keys or f"{question['optionTwo']}{question['optionOne']}" in question_keys:
            raise ValidationError('This question already exists.')

        req_option_labels = [question['optionOne'], question['optionTwo']]

        options = {option.label: option for option in Option.objects.filter(label__in=req_option_labels)}
        qy_option_labels = [option.label for option in options.values()]
        option_labels_to_create = [label for label in req_option_labels if label not in qy_option_labels]

        if len(option_labels_to_create) > 0:
            for label in option_labels_to_create:
                options[label] = Option.objects.create(label = label)

        new_question = Question.objects.create(author = user, option_one = options[question['optionOne']], option_two = options[question['optionTwo']])

        return Response(GetQuestionSerializer(new_question).data)


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context