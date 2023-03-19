from django.urls import path
from .views import search_spotify, genres, csrf , ping

urlpatterns = [
    path('search/', search_spotify, name='search'),
    path('genres/', genres, name='genres'),
    path('csrf/', csrf, name='csrf'),
    path('ping/', ping, name='ping'),
]