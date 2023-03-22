import requests
import json
from django.http import HttpResponse, JsonResponse
# from django.middleware.csrf import get_token
from .metal_genres import metal_genres
from .oauth import access_token

def search_spotify(request):
    if request.method == "POST":
        data = json.loads(request.body) 
        genre = data.get("genre")
        print(genre)
        query_params = {
            "q": genre,
            "type": "artist",
            "market": "US",
            "limit": 1,
            "include_external": "audio",
        }

        headers = {"Authorization": f"Bearer {access_token}"}

        response = requests.get(
            "https://api.spotify.com/v1/search", headers=headers, params=query_params
        )

        if response.status_code == 200:
            results = response.json()
            artists = results["artists"]["items"]
            sorted_artists = sorted(artists, key=lambda x: x["popularity"], reverse=True)
            response_data = {"total": results["artists"]["total"], "artists": []}
            for artist in sorted_artists:
                artist_data = {
                    "name": artist["name"],
                    "id": artist["id"],
                    "genres": artist["genres"],
                    "popularity": artist["popularity"],
                    "top_tracks": [],
                }
                top_tracks_response = requests.get(
                    f"https://api.spotify.com/v1/artists/{artist['id']}/top-tracks?market=ES",
                    headers=headers,
                )
                if top_tracks_response.status_code == 200:
                    top_tracks_results = top_tracks_response.json()
                    top_tracks = top_tracks_results["tracks"]
                    artist_data["top_tracks"] = [
                        {
                            "name": track["name"],
                            "id": track["id"],
                            "preview_url": track["preview_url"],
                        }
                        for track in top_tracks
                    ]
                response_data["artists"].append(artist_data)

            return JsonResponse(response_data)
        else:
            print(f"Request failed with status code {response.status_code}")
            return HttpResponse("Search failed.")
    else:
        return HttpResponse("Invalid request method")


def genres(request):
    return JsonResponse(metal_genres)

# def genre()

# def csrf(request):
#     return JsonResponse({'csrfToken': get_token(request)})

# def ping(request):
#     return JsonResponse({'result': 'OK'})

# def get_csrf_token(request):
#     return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})
