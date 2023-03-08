from django.shortcuts import render
from rest_framework import generics
from .serializers import GenreSerializer, BandSerializer, VideoSerializer
from .models import Genre, Band, Video


class GenreView(generics.CreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class BandView(generics.CreateAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer

class VideoView(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer