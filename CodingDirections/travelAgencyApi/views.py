from rest_framework import viewsets
from .models import Flight, Hotel, Activity, TravelPackage, Modification
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer, ModificationSerializer
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
class ModificationViewSet(viewsets.ModelViewSet):
    queryset = Modification.objects.all()
    serializer_class = ModificationSerializer