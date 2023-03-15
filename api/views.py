import requests
from django.http import HttpResponse
import requests
from django.http import JsonResponse
from .metal_genres import filtered_metal_genres
from .oauth import access_token

def search_spotify(request):
    query_params = {
        'q': 'metal',
        'type': 'artist',
        'market': 'US',
        'limit': 50,
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




def genres(request):
    return JsonResponse(filtered_metal_genres)