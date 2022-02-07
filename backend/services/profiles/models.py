from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

def get_user_avatar_path(instance, filename):
    return f'services/profiles/static/user_avatars/{instance.username}.{filename[filename.rindex(".") + 1:]}'

class User(AbstractUser):
    avatar = models.ImageField(upload_to=get_user_avatar_path)