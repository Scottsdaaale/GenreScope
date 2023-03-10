from rest_framework import generics
from .serializers import GenreSerializer, BandSerializer, VideoSerializer, TrackSerializer
from .models import Genre, Band, Video, Track


class GenreView(generics.CreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class BandView(generics.CreateAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer


class TrackView(generics.CreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class VideoView(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer