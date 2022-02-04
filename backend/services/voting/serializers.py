from rest_framework import serializers
from django.contrib.auth import get_user_model
from services.voting.models import Option, Question, Vote

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = (
            'id',
            'label',
        )

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            'id',
            'author_id',
            'created_date',
            'options'
        )
        depth = 1

class VoteSerializer(serializers.ModelSerializer):
    question = serializers.CharField()
    choice = serializers.CharField()

    class Meta:
        model = Vote
        fields = (
            'id',
            'question',
            'choice',
        )