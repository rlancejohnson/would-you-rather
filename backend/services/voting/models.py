from django.db import models, transaction
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

    def save(self, *args, **kwargs):
        instance = super(Question, self).save(*args, **kwargs)
        transaction.on_commit(self.validate_options)
        return instance

    def validate_options(self):
        if self.option_one == self.option_two:
            raise ValueError('The two options related to a question must be different.')

class Vote(models.Model):
    voter = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='votes', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name='votes', on_delete=models.CASCADE)
    choice = models.ForeignKey(Option, related_name='votes', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id} - {self.voter.username} | {self.choice.label}'