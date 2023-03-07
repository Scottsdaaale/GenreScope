from django.db import models

# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Band(models.Model):
    name = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre, related_name='bands')

    def __str__(self):
        return self.name

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()
    band = models.ForeignKey(Band, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return self.title