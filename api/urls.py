from django.urls import path
from .views import search_spotify, genres

urlpatterns = [
    path('search/', search_spotify, name='search'),
    path('genres/', genres, name='genres')
]