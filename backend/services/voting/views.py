from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Question, Option, Vote
from .serializers import QuestionSerializer, VoteSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    '''
        Takes a list of option labels
    '''
    def create(self, request, *args, **kwargs):
        req_option_labels = request.data

        if len(req_option_labels) > 2 or len(req_option_labels) < 2:
            raise ValueError('A question must have exactly 2 options.')

        qy_options = list(Option.objects.filter(label__in=req_option_labels))
        qy_option_labels = [option.label for option in qy_options]
        option_labels_to_create = [label for label in req_option_labels if label not in qy_option_labels]

        if len(option_labels_to_create) > 0:
            options_to_create = []

            for label in option_labels_to_create:
                options_to_create.append(Option.objects.create(label=label))

            qy_options.extend(options_to_create)

        new_question = Question.objects.create(author=request.user)
        new_question.options.set(qy_options)

        return Response(QuestionSerializer(new_question).data)


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context