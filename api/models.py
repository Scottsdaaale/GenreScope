from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Band(models.Model):
    name = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=100, default='')
    genres = models.ManyToManyField(Genre, related_name='bands')

    def __str__(self):
        return self.name

class Track(models.Model):
    title = models.CharField(max_length=100)
    band = models.ForeignKey(Band, on_delete=models.CASCADE, related_name='tracks')
    spotify_id = models.CharField(max_length=100)
    preview_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()
    band = models.ForeignKey(Band, on_delete=models.CASCADE, related_name='videos')
    youtube_id = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.title