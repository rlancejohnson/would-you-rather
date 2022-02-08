from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from .models import User
from .serializers import CreateUserSerializer, GetUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    # permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_serializer_class(self):
        return CreateUserSerializer if self.request.method == 'POST' else GetUserSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context