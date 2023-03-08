from django.urls import path
from .views import GenreView, BandView, VideoView

urlpatterns = [
    path('genres/', GenreView.as_view(), name='genre_list'),
    path('bands/', BandView.as_view(), name='band_list'),
    path('videos/', VideoView.as_view(), name='video_list'),
]
