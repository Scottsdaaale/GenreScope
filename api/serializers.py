from rest_framework import serializers
from .models import Genre, Band, Video, Track

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')

class BandSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Band
        fields = ('id', 'name', 'genres')

class TrackSerializer(serializers.ModelSerializer):
    band = BandSerializer()
    genres = GenreSerializer(many=True, read_only=True, source='band.genres')

    class Meta:
        model = Track
        fields = ('id', 'title', 'url', 'band', 'genres')
        
class VideoSerializer(serializers.ModelSerializer):
    band = BandSerializer()

    class Meta:
        model = Video
        fields = ('id', 'title', 'description', 'url', 'band')