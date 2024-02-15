from rest_framework import viewsets
from .models import Flight, Hotel, Activity, TravelPackage
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer


class FlightViewSet(viewsets.HyperlinkedModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class HotelViewSet(viewsets.HyperlinkedModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class ActivityViewSet(viewsets.HyperlinkedModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class TravelPackageViewSet(viewsets.HyperlinkedModelViewSet):
    queryset = TravelPackage.objects.all()
    serializer_class = TravelPackageSerializer
