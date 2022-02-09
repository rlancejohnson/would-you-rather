from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import User
from .serializers import RegisterUserSerializer, UserSerializer


class RegisterUserViewSet(ModelViewSet):
    serializer_class = RegisterUserSerializer

class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context