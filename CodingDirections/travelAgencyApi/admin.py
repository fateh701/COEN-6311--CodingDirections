from .models import Flight, Hotel, Activity, TravelPackage, BookingDetails, BookingAgent, CustomTravelPackage, PaymentDetails,BookingDetailsCustomPackage

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
admin.site.register(CustomTravelPackage)
# admin.site.register(Notification)
admin.site.register(BookingDetails)
admin.site.register(BookingAgent)
admin.site.register(PaymentDetails)
admin.site.register(BookingDetailsCustomPackage)
