from django.urls import path
from .views import search_spotify, genres
# csrf , 
# ping, 
# get_csrf_token

urlpatterns = [
    path('search/', search_spotify, name='search'),
    path('genres/', genres, name='genres'),
    # path('csrf/', csrf, name='csrf'),
    # path('ping/', ping, name='ping'),
    # path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]