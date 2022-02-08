from rest_framework import serializers
from django.db.models import Q
from django.core.exceptions import ValidationError
from services.utils.serializers import DictSerializer
from .models import Option, Question, Vote


class GetQuestionSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    optionOne = serializers.SerializerMethodField()
    optionTwo = serializers.SerializerMethodField()

    class Meta:
        model = Question
        list_serializer_class = DictSerializer
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
        return {
            'text': question.option_one.label,
            'votes': [vote.voter.username for vote in question.votes.all() if vote.choice == question.option_one]
        }

    def get_optionTwo(self, question):
        return {
            'text': question.option_two.label,
            'votes': [vote.voter.username for vote in question.votes.all() if vote.choice == question.option_two]
        }

class CreateQuestionSerializer(serializers.Serializer):
    optionOne = serializers.CharField(max_length = 500, source='option_one')
    optionTwo = serializers.CharField(max_length = 500, source='option_two')

    class Meta:
        model = Question
        fields = (
            'id',
            'optionOne',
            'optionTwo'
        )

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = (
            'id',
            'question',
            'choice',
        )

    def create(self, vote):
        user = self.context['request'].user
        question = vote['question']
        choice = vote['choice']
        vote = Vote.objects.filter(voter = user, question = question)

        vote_keys = [f'{vote.voter.id}{vote.question.id}' for vote in Vote.objects.filter(voter = self.voter, question = self.question)]

        if f'{self.voter.id}{self.question.id}' in vote_keys:
            raise ValidationError('You have already answered this question.')

        if len(vote) == 0 and choice.label in [question.option_one.label, question.option_two.label]:
            new_vote = Vote.objects.create(
                voter = user,
                question = question,
                choice = choice
            )

        elif len(vote) == 0:
            raise ValidationError('The choice must match one of the options related to the question.')

        else:
            raise ValidationError('Only one vote can exist for each user and question.')

        return new_vote