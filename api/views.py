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
# from django.http import JsonResponse
# import spotipy
# from spotipy.oauth2 import SpotifyClientCredentials
# # from metal_genres import genres
# from django.http import HttpResponse
# from oauth import access_token

# def get_genres(request):
#     # Initialize Spotify API client
#     client_credentials_manager = SpotifyClientCredentials(client_id='410266b82776476a9150da374a77ec8e', client_secret='6856da9a3db2433c97f4dfefa8885672')
#     sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    
#     # Loop through genres and search for artists
#     results = {}
#     for genre in genres:
#         artists = []
#         results[genre] = artists
#         search_results = sp.search(q=genre, type='artist', limit=5)
#         for artist in search_results['artists']['items']:
#             artists.append(artist['name'])
    
#     # Return results as JSON
#     return JsonResponse(results)

import requests
from django.http import HttpResponse
import requests
import json
from django.http import JsonResponse

CLIENT_ID = '410266b82776476a9150da374a77ec8e'
CLIENT_SECRET = '6856da9a3db2433c97f4dfefa8885672'

auth_url = 'https://accounts.spotify.com/api/token'
auth_response = requests.post(auth_url, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
})

auth_response_data = auth_response.json()
access_token = auth_response_data['access_token']



def search_spotify(request):
    query_params = {
        'q': 'metal',
        'type': 'artist',
        # 'marker': 'US',
        'limit': 10,
        'include_external': 'audio'
    }

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=query_params)

    if response.status_code == 200:
        results = response.json()
        artists = results['artists']['items']
        sorted_artists = sorted(artists, key=lambda x: x['popularity'], reverse=True)
        response_data = {
            'total': results['artists']['total'],
            'artists': []
        }
        for artist in sorted_artists:
            artist_data = {
                'name': artist['name'],
                'id': artist['id'],
                'genres': artist['genres'],
                'popularity': artist['popularity'],
                'top_tracks': []
            }
            top_tracks_response = requests.get(f'https://api.spotify.com/v1/artists/{artist["id"]}/top-tracks?market=ES', headers=headers)
            if top_tracks_response.status_code == 200:
                top_tracks_results = top_tracks_response.json()
                top_tracks = top_tracks_results['tracks']
                artist_data['top_tracks'] = [{'name': track['name'], 'id': track['id'], 'preview_url': track['preview_url']} for track in top_tracks]
            response_data['artists'].append(artist_data)

        return JsonResponse(response_data)
    else:
        print(f'Request failed with status code {response.status_code}')
        return HttpResponse("Search failed.")




def hello(request):
    return HttpResponse("Hello, world!")