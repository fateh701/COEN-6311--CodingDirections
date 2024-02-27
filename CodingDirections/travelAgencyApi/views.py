from rest_framework.response import Response
from rest_framework import viewsets,status
from .models import Flight, Hotel, Activity, TravelPackage, BookingDetails, BookingAgent
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer, BookingDetailsSerializer, BookingAgentSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import logging
from rest_framework.views import APIView

logger = logging.getLogger(__name__) # creating  a logger instance

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

class BookingAgentViewSet(viewsets.ModelViewSet):
    queryset = BookingAgent.objects.all()
    serializer_class = BookingAgentSerializer
    def get_queryset(self):
        queryset = BookingAgent.objects.all()
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

@api_view(['POST'])
def create_booking(request):
    try:
        travel_package_id = request.data.get('travel_package_id')  # get the travel package id from the request send from frontend
        # if request.data.get('user_id')=='':
        user_id = User.objects.get(pk=request.user.id)
        logger.info('Booking to be created for user %s with travel package %s', user_id, travel_package_id)

        customer_location = "canada" #get the location of the customer from the request send from frontend
        # which we will do when we create the user profile in the EPIC6
        bookingAgent = BookingAgent.objects.filter(location=customer_location).first()
        if bookingAgent is None:
            return  Response({'error': 'Booking agent not found'}, status=status.HTTP_400_BAD_REQUEST)

        #     return Response({'error': 'User id is required'}, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     user_id = request.data.get('id') # get the user id from the request send from frontend


        # Check if the travel package exists or not
        travel_package = get_object_or_404(TravelPackage, id=travel_package_id)

        #create a Booking
        booking = BookingDetails.objects.create(customer=user_id,payment_status_flag=True,agent=bookingAgent)
        booking.travel_package.set([travel_package])
        serializer: BookingDetailsSerializer = BookingDetailsSerializer(booking)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


#made for testing purposes in API endpoint
@api_view(['GET'])
def current_user_info(request):
    userId = request.user.id
    username = request.user.username
    return JsonResponse({'id':userId,'username': username})


class CustomerBookingsViewSet(APIView):
    def get(self, request):
        user_id = request.user.id
        bookings = BookingDetails.objects.filter(customer=user_id)
        serializer = BookingDetailsSerializer(bookings, many=True)
        return Response(serializer.data)
