from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Option, Question, Vote


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            'id',
            'created_date',
            'options'
        )

    def create(self, validated_data):
        print(validated_data)

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = (
            'id',
            'created_date',
            'options'
        )

    def create(self, validated_date):
        user = self.context['request'].user
        options = validated_date['options']
        print(options)

        # if len(req_option_labels) > 2 or len(req_option_labels) < 2:
        #     raise ValueError('A question must have exactly 2 options.')

        # qy_options = list(Option.objects.filter(label__in=req_option_labels))
        # qy_option_labels = [option.label for option in qy_options]
        # option_labels_to_create = [label for label in req_option_labels if label not in qy_option_labels]

        # if len(option_labels_to_create) > 0:
        #     options_to_create = []

        #     for label in option_labels_to_create:
        #         options_to_create.append(Option.objects.create(label=label))

        #     qy_options.extend(Option.objects.bulk_create(options_to_create))

        new_question = Question.objects.create(author=user)
        new_question.options.set(options)
        new_question.save()

        return new_question


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