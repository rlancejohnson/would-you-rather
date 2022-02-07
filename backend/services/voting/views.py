from rest_framework import viewsets
from .models import Question
from .serializers import CreateQuestionSerializer, GetQuestionSerializer, VoteSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()

    def get_serializer_class(self):
        print(self.request)
        return CreateQuestionSerializer if self.request.method == 'POST' else GetQuestionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context