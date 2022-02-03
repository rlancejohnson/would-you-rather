from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from services.voting.models import Question, Vote, Option


class UserList(APIView):
    def get(self, request):
        User = get_user_model()

        user_query = User.objects.values()
        user_ids = {}
        users = {}

        for user in user_query:
            user_ids[user['id']] = user['username']

            users[user['username']] = {
                'id': user['username'],
                'name': f"{user['first_name']} {user['last_name']}",
                'avatarURL': user['avatar_url']
            }

        questions = Question.objects.filter(author__in=user_ids.keys()).values()

        for question in questions:
            users[user_ids[question['author_id']]]['questions'] = []
            users[user_ids[question['author_id']]]['questions'].append(question['id'])

        votes = Vote.objects.filter(user__in=user_ids.keys()).values()
        choices = {option['id']: option['label'] for option in Option.objects.filter(id__in=[vote['choice_id'] for vote in votes]).values()}

        for vote in votes:
            first = True

            if first:
                first = False
                users[user_ids[vote['user_id']]]['answers'] = {
                    vote['question_id']: choices[vote['choice_id']]
                }

            else:
                users[user_ids[vote['user_id']]]['answers'][vote['question_id']] = choices[vote['choice_id']]

        return Response(users)