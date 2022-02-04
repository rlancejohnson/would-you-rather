from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Question, Option, Vote
from .serializers import QuestionSerializer, VoteSerializer


class QuestionList(APIView):
    def get(self, request):
        User = get_user_model()
        users = {user['id']: user['username'] for user in User.objects.values()}

        questions_query = Question.objects.all()
        questions = {question['id']: question for question in questions_query.values()}


        for question in questions_query:
            option_index = 1

            for option in question.options.values():
                option_name = 'optionOne' if option_index == 1 else 'optionTwo'
                option_index += 1

                questions[question.id] = {
                    **questions[question.id],
                    option_name: {
                        'text': option['label'],
                        'votes': [users[vote['user_id']] for vote in question.votes.values() if vote['choice_id'] == option['id']]
                    }
                }

        return Response(questions)


class QuestionViewSet(viewsets.ModelViewSet):
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