# open the cleaned_genre_list.txt file in read mode
with open('cleaned_metal_genres.txt', 'r') as file:
    # read the contents of the file and split it into a list of genres
    genres = file.read().split('\n')
    # remove any empty strings from the list of genres
    genres = [genre for genre in genres if genre]
    # write the list of genres to a new file called list_of_genres.py
    with open('list_of_metal_genres.py', 'w') as new_file:
        new_file.write('genres = ' + str(genres))