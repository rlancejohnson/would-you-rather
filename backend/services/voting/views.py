from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from services.voting.models import Question, Vote, Option


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
                        'votes': [users[vote['user_id']] if vote['choice_id'] == option['id'] else '' for vote in question.votes.values()]
                    }
                }

        return Response(questions)