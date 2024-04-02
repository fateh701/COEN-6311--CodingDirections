from django.apps import AppConfig


class TravelagencyapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'travelAgencyApi'

    # def ready(self):
    #     import travelAgencyApi.signals
