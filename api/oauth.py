import requests

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

