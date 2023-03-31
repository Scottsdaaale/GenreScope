from django.urls import path
from .views import genres, search_artists, search_top_tracks
# csrf , 
# ping, 
# get_csrf_token

urlpatterns = [
    # path('search/', search_spotify, name='search'),
    path('artists/', search_artists, name='artists'),
    path('tracks/', search_top_tracks, name='tracks'),
    path('genres/', genres, name='genres'),
    # path('csrf/', csrf, name='csrf'),
    # path('ping/', ping, name='ping'),
    # path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]