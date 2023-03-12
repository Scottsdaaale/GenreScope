import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from metal_genres import genres

client_credentials_manager = SpotifyClientCredentials(client_id='410266b82776476a9150da374a77ec8e', client_secret='6856da9a3db2433c97f4dfefa8885672')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

for genre in genres:
    results = sp.search(q=genre, type='track')
    tracks = results['tracks']['items']
    print(f'Tracks for {genre}:')
    for track in tracks:
        print(track['name'], '-', track['artists'][0]['name'])
    print('\n')