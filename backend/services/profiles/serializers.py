from rest_framework import serializers
from django.contrib.auth import get_user_model
from services.utils.serializers import DictSerializer
from services.voting.models import Question


class GetUserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    avatarURL = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        list_serializer_class = DictSerializer
        fields = (
            'id',
            'name',
            'avatarURL',
            'questions',
            'answers',
        )

    def get_id(self, user):
        return user.username

    def get_name(self, user):
        return f'{user.first_name} {user.last_name}'

    def get_avatarURL(self, user):
        request = self.context['request']
        return request.build_absolute_uri(user.avatar.url)

    def get_questions(self, user):
        return [question['id'] for question in user.questions.values()]

    def get_answers(self, user):
        questions = {question['id']: question for question in Question.objects.values()}
        return {vote.question.id: 'optionOne' if questions[vote.question.id]['option_one_id'] == vote.choice.id else 'optionTwo' for vote in user.votes.all()}


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'avatar',
        )

    def create(self, validated_data):
        User = get_user_model()
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            avatar = validated_data['avatar']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user