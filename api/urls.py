from django.urls import path
from .views import get_genres

urlpatterns = [
    path('genres/', get_genres, name='genres'),
]