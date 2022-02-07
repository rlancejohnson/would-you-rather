from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Option, Question, Vote


class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    optionOne = serializers.SerializerMethodField()
    optionTwo = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = (
            'id',
            'author',
            'timestamp',
            'optionOne',
            'optionTwo'
        )

    def get_author(self, question):
        return question.author.username

    def get_timestamp(self, question):
        return int(question.created_date.timestamp())

    def get_optionOne(self, question):
        print(self)
        return {
            'text': question.option_one.label,
            'votes': [vote.voter.username for vote in question.votes.all() if vote.choice == question.option_one]
        }

    def get_optionTwo(self, question):
        print(self)
        return {
            'text': question.option_two.label,
            'votes': [vote.voter.username for vote in question.votes.all() if vote.choice == question.option_two]
        }

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