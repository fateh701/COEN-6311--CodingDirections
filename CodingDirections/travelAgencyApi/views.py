from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Flight, Hotel, Activity, TravelPackage
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer
     def list(self, request, *args, **kwargs):
      queryset = self.filter_queryset(self.get_queryset())
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
     def destroy(self, request, *args, **kwargs):
      instance = self.get_object()
      self.perform_destroy(instance)
      return Response(status=status.HTTP_204_NO_CONTENT)

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
