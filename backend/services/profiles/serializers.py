from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'avatar_url',
        )

    def create(self, validated_data):
        User = get_user_model()
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            avatar_url = validated_data['avatar_url']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user