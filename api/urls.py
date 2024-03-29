from django.urls import path
from .views import genres, search_artists, search_top_tracks, search_playlists, search_tracks, search_youtube_genre, search_youtube_artist
# csrf ,
# ping,
# get_csrf_token

urlpatterns = [
    # path('search/', search_spotify, name='search'),
    path('artists/', search_artists, name='artists'),
    path('top_tracks/', search_top_tracks, name='top_tracks'),
    path('genres/', genres, name='genres'),
    path('playlists/', search_playlists, name='playlists'),
    path('tracks/', search_tracks, name='tracks'),
    path('videos/genre/', search_youtube_genre, name='videos_genre'),
    path('videos/artist/', search_youtube_artist, name='videos_artist'),
    # path('csrf/', csrf, name='csrf'),
    # path('ping/', ping, name='ping'),
    # path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]
