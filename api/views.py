import json
import requests
from django.http import JsonResponse, HttpResponse
from .metal_genres import metal_genres
from .oauth import access_token
from .filter_genres import filtered_genres

# has sorting for popularity data
# def search_artists(request):
#     if request.method == "POST":
#         data = json.loads(request.body)
#         genre = data.get("genre")
#         unwanted_genres = filtered_genres['genres'] # list of unwanted genres
#         query_params = {
#             "q": genre,
#             "type": "artist",
#             "market": "US",
#             "limit": 50,
#             "include_external": "audio",
#         }
#         headers = {"Authorization": f"Bearer {access_token}"}
#         response = requests.get(
#             "https://api.spotify.com/v1/search", headers=headers, params=query_params
#         )
#         if response.status_code == 200:
#             results = response.json()
#             artists = results["artists"]["items"]
#             sorted_artists = sorted(artists, key=lambda x: x["popularity"], reverse=True)
#             response_data = {"total": results["artists"]["total"], "artists": []}
#             num_removed = 0  # keep track of how many artists are removed
#             for artist in sorted_artists:
#                 if any(genre in artist["genres"] for genre in unwanted_genres):
#                     num_removed += 1
#                     continue  # skip artist if they have any unwanted genre
#                 artist_data = {
#                     "name": artist["name"],
#                     "id": artist["id"],
#                     "image_url": artist["images"][0]["url"] if artist["images"] else None,
#                     "popularity": artist["popularity"],
#                     "genres": artist["genres"]
#                 }
#                 response_data["artists"].append(artist_data)
#                 if len(response_data["artists"]) == 50:
#                     break  # stop adding artists if we already have 50
#             response_data["total"] = min(len(response_data["artists"]), 50)  # adjust the total to account for removed artists
#             query_params["limit"] = len(response_data["artists"]) + num_removed  # adjust the limit to account for removed artists
#             return JsonResponse(response_data)
#         else:
#             print(f"Request failed with status code {response.status_code}")
#             return HttpResponse("Search failed.")
#     else:
#         return HttpResponse("Invalid request method")

def search_artists(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genre = data.get("genre")
        unwanted_genres = filtered_genres['genres'] # list of unwanted genres
        query_params = {
            "q": genre,
            "type": "artist",
            "market": "US",
            "limit": 50,
            "include_external": "audio",
        }
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(
            "https://api.spotify.com/v1/search", headers=headers, params=query_params
        )
        if response.status_code == 200:
            results = response.json()
            artists = results["artists"]["items"]
            response_data = {"total": results["artists"]["total"], "artists": []}
            num_removed = 0  # keep track of how many artists are removed
            for artist in artists:
                if any(genre in artist["genres"] for genre in unwanted_genres):
                    num_removed += 1
                    continue  # skip artist if they have any unwanted genre
                artist_data = {
                    "name": artist["name"],
                    "id": artist["id"],
                    "image_url": artist["images"][0]["url"] if artist["images"] else None,
                    "popularity": artist["popularity"],
                    "genres": artist["genres"]
                }
                response_data["artists"].append(artist_data)
                if len(response_data["artists"]) == 50:
                    break  # stop adding artists if we already have 50
            response_data["total"] = min(len(response_data["artists"]), 50)  # adjust the total to account for removed artists
            query_params["limit"] = len(response_data["artists"]) + num_removed  # adjust the limit to account for removed artists
            return JsonResponse(response_data)
        else:
            print(f"Request failed with status code {response.status_code}")
            return HttpResponse("Search failed.")
    else:
        return HttpResponse("Invalid request method")

def search_top_tracks(request):
    if request.method == "POST":
        data = json.loads(request.body)
        artist_id = data.get("artist_id")
        headers = {"Authorization": f"Bearer {access_token}"}
        top_tracks_response = requests.get(
            f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=ES",
            headers=headers,
        )
        if top_tracks_response.status_code == 200:
            top_tracks_results = top_tracks_response.json()
            top_tracks = top_tracks_results["tracks"]
            response_data = {"tracks": []}
            for track in top_tracks:
                track_data = {
                    "name": track["name"],
                    "id": track["id"],
                    "preview_url": track["preview_url"],
                }
                response_data["tracks"].append(track_data)
            return JsonResponse(response_data)
        else:
            print(f"Request failed with status code {top_tracks_response.status_code}")
            return HttpResponse("Top tracks search failed.")
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

