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
        choice = validated_data['choice']
        vote = Vote.objects.filter(user=user, question=question)

        if len(vote) == 0 and choice.label in [q_option['label'] for q_option in question_options]:
            new_vote = Vote.objects.create(
                user = user,
                question = question,
                choice = choice
            )

        elif len(vote) == 0:
            raise ValueError('The choice must match one of the options related to the question.')

        else:
            raise ValueError('Only one vote can exist for each user and question.')

        return new_vote