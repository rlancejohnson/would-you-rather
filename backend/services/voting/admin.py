from django.contrib import admin
from .models import Option, Question, Vote

admin.site.register(Option)
admin.site.register(Question)
admin.site.register(Vote)