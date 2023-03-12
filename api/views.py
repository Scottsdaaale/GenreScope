# from rest_framework import generics
# from .serializers import GenreSerializer, BandSerializer, VideoSerializer, TrackSerializer
# from .models import Genre, Band, Video, Track


# class GenreView(generics.CreateAPIView):
#     queryset = Genre.objects.all()
#     serializer_class = GenreSerializer


# class BandView(generics.CreateAPIView):
#     queryset = Band.objects.all()
#     serializer_class = BandSerializer


# class TrackView(generics.CreateAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer


# class VideoView(generics.CreateAPIView):
#     queryset = Video.objects.all()
#     serializer_class = VideoSerializer
from django.http import JsonResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from metal_genres import genres
# import requests


def get_genres(request):
    # Initialize Spotify API client
    client_credentials_manager = SpotifyClientCredentials(client_id='410266b82776476a9150da374a77ec8e', client_secret='6856da9a3db2433c97f4dfefa8885672')
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    
    # Loop through genres and search for artists
    results = {}
    for genre in genres:
        artists = []
        results[genre] = artists
        search_results = sp.search(q=genre, type='artist', limit=5)
        for artist in search_results['artists']['items']:
            artists.append(artist['name'])
    
    # Return results as JSON
    return JsonResponse(results)