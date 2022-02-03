from rest_framework import serializers
from django.contrib.auth import get_user_model
from collections import OrderedDict
from services.voting.models import Option, Question, Vote


class ReturnDict(OrderedDict):
    def __init__(self, *args, **kwargs):
        self.serializer = kwargs.pop('serializer')
        super(ReturnDict, self).__init__(*args, **kwargs)

class DictSerializer(serializers.ListSerializer):
    dict_key = 'id'

    @property
    def data(self):
        ret = super(serializers.ListSerializer, self).data
        return ReturnDict(ret, serializer=self)

    def to_representation(self, data):
        items = super(DictSerializer, self).to_representation(data)
        return {item[self.dict_key]: item for item in items}

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
        )

class VoteSerializer(serializers.ModelSerializer):
    choice = OptionSerializer()

    class Meta:
        model = Vote
        list_serializer_class=DictSerializer
        fields = (
            'id',
            'question',
            'choice',
        )

class UserSerializer(serializers.ModelSerializer):
    votes = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = (
            'username',
            'first_name',
            'last_name',
            'avatar_url',
            'questions',
            'votes',
        )

    def get_votes(self, user):
        votes = Vote.objects.filter(user=user)
        return VoteSerializer(votes, many=True, context={'request': self.context['request']}).data