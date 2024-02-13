from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=150)
    release_date = models.IntegerField(default=2000)
    image = models.URLField(help_text="From imdb")
    summary = models.TextField(help_text="short description"),
    ##