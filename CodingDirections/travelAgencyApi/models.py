from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    image = models.URLField(max_length=500,help_text="Enter the URL of the image")
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.FloatField()
    rating = models.FloatField()

    def __str__(self):
        return self.title    # this is to display the title of the book in admin page in database (nothing related to api view)

    class Meta:
        ordering = ['title']  # ordering the list of books in ascending order of title