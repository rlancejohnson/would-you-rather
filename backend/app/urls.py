"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import services.profiles.views as profile_views
import services.voting.views as voting_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', profile_views.UserList.as_view()),
    path('api/v1/questions/', voting_views.QuestionList.as_view()),
    path('api/v1/questions/new', voting_views.QuestionViewSet.as_view({'post': 'create'})),
    path('api/v1/votes/new', voting_views.VoteViewSet.as_view({'post': 'create'}))
]
