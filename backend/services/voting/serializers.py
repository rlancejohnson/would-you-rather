from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Option, Question, Vote

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
    class Meta:
        model = Vote
        fields = (
            'id',
            'question',
            'choice',
        )

    def create(self, validated_data):
        user = self.context['request'].user
        question = validated_data['question']
        question_options = question.options.values()
        option = validated_data['choice']

        if option.label in [q_option['label'] for q_option in question_options]:
            new_vote = Vote.objects.create(
                user = user,
                question = question,
                choice = option
            )

        else:
            raise ValueError('The choice must match one of the options related to the question.')

        return new_vote