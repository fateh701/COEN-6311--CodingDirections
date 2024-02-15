from .models import Flight, Hotel, Activity, TravelPackage
from django.contrib import admin
from django.apps import AppConfig

class travelAgencyApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'travelAgencyApi'

# Register your models here.
admin.site.register(Flight)
admin.site.register(Hotel)
admin.site.register(Activity)
admin.site.register(TravelPackage)
