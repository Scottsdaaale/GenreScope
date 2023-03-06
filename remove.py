import re

with open('metal_genres.txt', 'r') as f:
    genres = f.readlines()

cleaned_genres = []
for genre in genres:
    cleaned_genre = re.sub(r'[^a-zA-Z ]', '', genre).strip()
    if cleaned_genre:
        cleaned_genres.append(cleaned_genre)

with open('cleaned__metal_genres_.txt', 'w') as f:
    f.write('\n'.join(cleaned_genres))