import json
import requests
from django.http import JsonResponse, HttpResponse
from .metal_genres import metal_genres
from .oauth import access_token
from .filter_genres import filtered_genres
from googleapiclient.discovery import build
from django.http import JsonResponse



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
    
def search_playlists(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genre = data.get("genre")
        headers = {"Authorization": f"Bearer {access_token}"}
        query_params = {
            "q": genre,
            "type": "playlist",
            "market": "US",
            "limit": 10,
        }
        response = requests.get(
            "https://api.spotify.com/v1/search", headers=headers, params=query_params
        )
        if response.status_code == 200:
            results = response.json()
            playlists = results["playlists"]["items"]
            response_data = {"total": results["playlists"]["total"], "playlists": []}
            for playlist in playlists:
                playlist_data = {
                    "name": playlist["name"],
                    "id": playlist["id"],
                    "image_url": playlist["images"][0]["url"] if playlist["images"] else None,
                    "owner": playlist["owner"]["display_name"] if playlist["owner"] else None,
                    "tracks": playlist["tracks"]["total"] if playlist["tracks"] else 0,
                }
                response_data["playlists"].append(playlist_data)
            response_data["total"] = min(len(response_data["playlists"]), 50)
            return JsonResponse(response_data)
        else:
            print(f"Request failed with status code {response.status_code}")
            return HttpResponse("Search failed.")
    else:
        return HttpResponse

def search_tracks(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genre = data.get("genre")
        query_params = {
            "q": genre,
            "type": "track",
            "market": "US",
            "limit": 10,
        }
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(
            "https://api.spotify.com/v1/search", headers=headers, params=query_params
        )
        if response.status_code == 200:
            results = response.json()
            tracks = results["tracks"]["items"]
            response_data = {"total": results["tracks"]["total"], "tracks": []}
            for track in tracks:
                track_data = {
                    "name": track["name"],
                    "id": track["id"],
                    "album": track["album"]["name"],
                    "album_id": track["album"]["id"],
                    "artists": [{"name": artist["name"], "id": artist["id"]} for artist in track["artists"]],
                    "duration_ms": track["duration_ms"],
                }
                response_data["tracks"].append(track_data)
                if len(response_data["tracks"]) == 50:
                    break  # stop adding tracks if we already have 50
            response_data["total"] = min(len(response_data["tracks"]), 50)  # adjust the total to account for removed tracks
            query_params["limit"] = len(response_data["tracks"])  # adjust the limit to account for removed tracks
            return JsonResponse(response_data)
        else:
            print(f"Request failed with status code {response.status_code}")
            return HttpResponse("Search failed.")
    else:
        return HttpResponse("Invalid request method")

def genres(request):
    return JsonResponse(metal_genres)

# def csrf(request):
#     return JsonResponse({'csrfToken': get_token(request)})

# def ping(request):
#     return JsonResponse({'result': 'OK'})

# def get_csrf_token(request):
#     return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})

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
# ______________________________________________YOUTUBE___________________________________________________________


def search_youtube_genre(request):
    if request.method == 'POST':
        # get genre from request body
        genre = json.loads(request.body)['genre']

        print("Genre before YouTube API request:", genre)
        
        # build youtube api client
        api_key = 'AIzaSyDOusyMRQKetwboKs0UdfNREresyyLVvmA'
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # search for live videos with given genre
        search_response = youtube.search().list(
            q=f'{genre}',
            type='video',
            part='id,snippet',
            videoDefinition='high',
            maxResults=5
        ).execute()

        # extract video information from search response
        videos = []
        for search_result in search_response.get('items', []):
            if search_result['id']['kind'] == 'youtube#video':
                video = {
                    'id': search_result['id']['videoId'],
                    'title': search_result['snippet']['title'],
                    'description': search_result['snippet']['description'],
                    'thumbnail': search_result['snippet']['thumbnails']['high']['url']
                }
                videos.append(video)

        # create response data
        response_data = {
            'videos': videos
        }

        print("Genre after YouTube API request:", genre)

        # return response
        return JsonResponse(response_data)

    else:
        return HttpResponse('Invalid request method.')


def search_youtube_artist(request):
    if request.method == 'POST':
        # Get artist name from request body
        artist_name = json.loads(request.body)['artist_name']

        print("Artist name before YouTube API request:", artist_name)
        
        # Build YouTube API client
        api_key = 'AIzaSyDOusyMRQKetwboKs0UdfNREresyyLVvmA'  # Replace with your YouTube API key
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # Search for live videos related to the artist name
        search_response = youtube.search().list(
            q=f'{artist_name}',
            type='video',
            part='id,snippet',
            videoDefinition='high',
            maxResults=5
        ).execute()
        print("YouTube API response:", search_response)
        # Extract video information from search response
        videos = []
        for search_result in search_response.get('items', []):
            if search_result['id']['kind'] == 'youtube#video':
                video = {
                    'id': search_result['id']['videoId'],
                    'title': search_result['snippet']['title'],
                    'description': search_result['snippet']['description'],
                    'thumbnail': search_result['snippet']['thumbnails']['high']['url']
                }
                videos.append(video)

        # Create response data
        response_data = {
            'videos': videos
        }
        print("DATA:", response_data)

        print("Artist name after YouTube API request:", artist_name)

        # Return response
        return JsonResponse(response_data)

    else:
        return HttpResponse('Invalid request method.')