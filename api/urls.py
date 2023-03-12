from django.urls import path
# from .views import get_genres
from .views import hello, search_spotify

urlpatterns = [
    # path('genres/', get_genres, name='genres'),
    path('hello/', hello, name='hello'),
    path('search/', search_spotify, name='search'),
]