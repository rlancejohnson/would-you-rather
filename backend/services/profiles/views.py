from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import CreateQuestionSerializer, GetUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()

    def get_serializer_class(self):
        return CreateQuestionSerializer if self.request.method == 'POST' else GetUserSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context