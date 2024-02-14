from django.contrib import admin
from .models import Book
from django.apps import AppConfig

# Register your models here.

class travelAgencyApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'travelAgencyApi'

admin.site.register(Book)