from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Option, Question, Vote


class GetQuestionSerializer(serializers.ModelSerializer):
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

class CreateQuestionSerializer(serializers.ModelSerializer):
    optionOne = serializers.CharField(max_length = 500, source='option_one')
    optionTwo = serializers.CharField(max_length = 500, source='option_two')

    class Meta:
        model = Question
        fields = (
            'id',
            'optionOne',
            'optionTwo'
        )

    def create(self, question):
        user = self.context['request'].user

        if question['option_one'] == question['option_two']:
            raise ValueError('Option one and two cannot be the same.')

        req_option_labels = [question['option_one'], question['option_two']]

        options = {option.label: option for option in Option.objects.filter(label__in=req_option_labels)}
        qy_option_labels = [option.label for option in options.values()]
        option_labels_to_create = [label for label in req_option_labels if label not in qy_option_labels]

        if len(option_labels_to_create) > 0:
            for label in option_labels_to_create:
                options[label] = Option.objects.create(label = label)

        new_question = Question.objects.create(author = user, option_one = options[question['option_one']], option_two = options[question['option_two']])

        return new_question


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

        if len(vote) == 0 and choice.label in [question.option_one.label, question.option_two.label]:
            new_vote = Vote.objects.create(
                voter = user,
                question = question,
                choice = choice
            )

        elif len(vote) == 0:
            raise ValueError('The choice must match one of the options related to the question.')

        else:
            raise ValueError('Only one vote can exist for each user and question.')

        return new_vote