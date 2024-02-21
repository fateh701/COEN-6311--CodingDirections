from requests import Response
from rest_framework import viewsets,generics
from .models import Flight, Hotel, Activity, TravelPackage, BookingDetails
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer, BookingDetailsSerializer


class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = Flight.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get_queryset(self):
        queryset = Hotel.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset


class TravelPackageViewSet(viewsets.ModelViewSet):
    queryset = TravelPackage.objects.all()
    serializer_class = TravelPackageSerializer

    def get_queryset(self):
        queryset = TravelPackage.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset


class BookingDetailsViewSet(viewsets.ModelViewSet):
    queryset = BookingDetails.objects.all()
    serializer_class = BookingDetailsSerializer
    def get_queryset(self):
        queryset = BookingDetails.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset
