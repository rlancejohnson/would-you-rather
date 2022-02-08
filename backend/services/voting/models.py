from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.conf import settings

class Option(models.Model):
    label = models.TextField(max_length=500, unique=True)

    def __str__(self):
        return f'{self.id} - {self.label}'

class Question(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='questions', on_delete=models.CASCADE)
    option_one = models.ForeignKey(Option, related_name='first_options', on_delete=models.CASCADE)
    option_two = models.ForeignKey(Option, related_name='second_options', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id} - {self.author.username} | {self.option_one.label}, {self.option_two.label}'

    def clean(self):
        question_keys = [f'{question.option_one.id}{question.option_two.id}' for question in Question.objects.filter(
            Q(option_one = self.option_one, option_two = self.option_two) | Q(option_one = self.option_two, option_two = self.option_one)
        )]

        if self.option_one == self.option_two:
            raise ValidationError('The two options related to a question must be different.')

        elif f'{self.option_one.id}{self.option_two.id}' in question_keys or f'{self.option_two.id}{self.option_one.id}' in question_keys:
            raise ValidationError('This question already exists.')


class Vote(models.Model):
    voter = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='votes', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name='votes', on_delete=models.CASCADE)
    choice = models.ForeignKey(Option, related_name='votes', on_delete=models.CASCADE)

    def clean(self):
        vote_keys = [f'{vote.voter.id}{vote.question.id}' for vote in Vote.objects.filter(voter = self.voter, question = self.question)]

        if f'{self.voter.id}{self.question.id}' in vote_keys:
            raise ValidationError('You have already answered this question.')

    def __str__(self):
        return f'{self.id} - {self.voter.username} | {self.choice.label}'