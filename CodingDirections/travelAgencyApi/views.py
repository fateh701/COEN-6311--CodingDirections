from rest_framework import viewsets
from .models import Flight, Hotel, Activity, TravelPackage, Modification
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer, ModificationSerializer
from django.http import JsonResponse, Json
from django.shortcuts import get_object_or_404
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    def get_queryset(self):
        queryset = Flight.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset
    def get_flight(request):
        arrival_city = request.GET.get('arrival city')
        arrival_time = request.GET.get('arrival_time')
        departure_time = request.GET.get('departure_time')
        price = request.GET.get('price')
        return JsonResponse({'status': 'success'})

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
    def cancel TravelPackage(request, Travel_Package_name:
        TravelPackage = get_object_or_404(Booking, pk=TravelPackage_name)
        TravelPackage.cancelled = True
        TravelPackage.save()
        return JsonResponse({'message': 'TravelPackage'})
    def update TravelPackage(request, TravelPackage_name):
        TravelPackage = get_object_or_404(TravelPackage, pk=Travel_Package_name)
        data = json.loads(request.body)
        for key, value in data.items():
        setattr(Travel_Package, key, value)
        TravelPackage.save()
        return JsonResponse({'message': 'TravelPackage updated'})
class ModificationViewSet(viewsets.ModelViewSet):
    queryset = Modification.objects.all()
    serializer_class = ModificationSerializer

    def send_confirmation_email(request):
        modified_data = " All the modified data"
        send_mail(
            'Confirmation for the Modifications',
            f'All the required modifications have been implemented successfully.Modified data: {modified_data}',
            settings.EMAIL_HOST_USER,  # email address of the sender
            ['customer@example.com'],  #list of recievers
            fail_silently=False,
         )
        return HttpResponse('Email Sent Successfully')

