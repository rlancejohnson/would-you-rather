from django.db import models, transaction
from django.conf import settings

class Option(models.Model):
    label = models.TextField(max_length=500)

    def __str__(self):
        return f'{self.id} - {self.label}'

class Question(models.Model):
    create_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    options = models.ManyToManyField(Option)

    def __str__(self):
        return f'{self.id} - {self.author.username} | {", ".join(str(option.label) for option in self.options.all())}'

    def save(self, *args, **kwargs):
        instance = super(Question, self).save(*args, **kwargs)
        transaction.on_commit(self.validate_options)
        return instance

    def validate_options(self):
        if len(self.options.all()) > 2:
            raise ValueError('A question must have only 2 options.')

class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.ForeignKey(Option, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id} - {self.user.username} | {self.choice.label}'