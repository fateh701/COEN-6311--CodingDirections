from django.db.models import Count
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Flight, Hotel, Activity, TravelPackage, BookingDetails, BookingAgent, Modification, CustomTravelPackage,BookingDetailsCustomPackage
from .serializers import FlightSerializer, HotelSerializer, ActivitySerializer, TravelPackageSerializer, BookingDetailsSerializer, BookingAgentSerializer, CustomTravelPackageSerializer, BookingDetailsCustomPackageSerializer
from django.shortcuts import get_object_or_404, render, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
# from django.contrib.auth.models import User
from authenticationBackend.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import logging
from rest_framework.views import APIView
from django.http import HttpResponseBadRequest
from django.views.decorators.http import require_POST, require_http_methods
from channels.layers import get_channel_layer
import json
from django.template import RequestContext
from asgiref.sync import async_to_sync
# from ..notification_app.tasks import test_func
from django.core.mail import send_mail
# from authenticationBackend.forms import SignUpForm

import sys
import stripe

sys.path.append("../..")

logger = logging.getLogger(__name__)  # creating  a logger instance

stripe.api_key = 'sk_test_51P27GmRvQV0xL8xGvRm518DYriB1MfB7QRRORSvZrj6x9LIVugSDjYO2xvUp8pr64oDrDqD2M1gsOAdXp8BrrNiF00LOGn57GN'


def create_payment(request):
    if request.method == 'POST':
        token = request.POST.get('token')
        try:
            charge = stripe.Charge.create(
                amount=1000,  # Amount in cents
                currency='usd',
                description='Example charge',
                source=token,
            )
            return JsonResponse({'success': True})
        except stripe.error.CardError as e:
            return JsonResponse({'success': False, 'error': e})


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

    # def cancel_TravelPackage(request,TravelPackage.name):
    #     TravelPackage = get_object_or_404(Booking, pk=TravelPackage_name)
    #     TravelPackage.cancelled = True
    #     TravelPackage.save()
    #     return JsonResponse({'message': 'TravelPackage cancelled'})

class CustomTravelPackageViewSet(viewsets.ModelViewSet):
    queryset = CustomTravelPackage.objects.all()
    serializer_class = CustomTravelPackageSerializer

    def get_queryset(self):
        queryset = CustomTravelPackage.objects.all()
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


# creating a  function to create booking using only travel package id and user id as input
@api_view(['POST'])
# @authentication_classes([TokenAuthentication]) #15-3
# @permission_classes([IsAuthenticated]) #15-3
def create_booking(request):
    if request.method == 'POST':
        # Assuming the request contains the travel package ID
        travel_package_id = request.data.get('travel_package_id')

        # pass here user id so that we can get the user object and use it to create booking
        try:
            travel_package = TravelPackage.objects.get(pk=travel_package_id)
            # return Response({'message': 'Travel package exists', 'travel_package': travel_package.name})
            try:
                # user = request.user
                user = User.objects.get(pk=request.data.get('user_id'))  # 18-3
                logger.info('Booking to be created for user %s with travel package %s', user.id, travel_package_id)
                customer_location = "canada"  # get the location of the customer from the request send from frontend ,pick location from user profiel directly
                bookingAgent = BookingAgent.objects.filter(location=customer_location).first()
                if bookingAgent is None:
                    return Response({'error': 'Booking agent not found'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

            travel_package = get_object_or_404(TravelPackage, id=travel_package_id)
            booking = BookingDetails.objects.create(customer=user, payment_status_flag=True, agent=bookingAgent)
            booking.travel_package.set([travel_package])
            serializer: BookingDetailsSerializer = BookingDetailsSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except TravelPackage.DoesNotExist:
            return Response({'error': 'Travel package does not exist'}, status=status.HTTP_404_NOT_FOUND)
    # to test whether create booking page works or not uncomment below two line,you will get user info who is logged in.
    # elif request.method=='GET':
    #     return profile_view(request)

# creating a  function to create booking  for custom packageusing only travel package id as input
@api_view(['POST'])
# @authentication_classes([TokenAuthentication]) #15-3
# @permission_classes([IsAuthenticated]) #15-3
def create_customPackage_booking(request):
    if request.method == 'POST':
        # Assuming the request contains the travel package ID
        travel_package_id = request.data.get('travel_package_id')

        # pass here user id so that we can get the user object and use it to create booking
        try:
            travel_package = CustomTravelPackage.objects.get(pk=travel_package_id)
            # return Response({'message': 'Travel package exists', 'travel_package': travel_package.name})
            try:
                # user = request.user
                user = User.objects.get(pk=request.data.get('user_id'))  # 18-3
                logger.info('Booking to be created for user %s with custom travel package %s', user.id, travel_package_id)
                customer_location = "canada"  # get the location of the customer from the request send from frontend ,pick location from user profiel directly
                bookingAgent = BookingAgent.objects.filter(location=customer_location).first()
                if bookingAgent is None:
                    return Response({'error': 'Booking agent not found'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

            cust_travel_package = get_object_or_404(CustomTravelPackage, id=travel_package_id)
            booking = BookingDetailsCustomPackage.objects.create(customer=user, payment_status_flag=True, agent=bookingAgent)
            booking.custom_travel_package.set([cust_travel_package])
            serializer: BookingDetailsCustomPackageSerializer = BookingDetailsCustomPackageSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except CustomTravelPackage.DoesNotExist:
            return Response({'error': 'Custom Travel package does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def profile_view(request):
    return render(request, 'profile.html', {'user': request.user})


class CustomerBookingsViewSet(APIView):

    def get_single_object(self, pk):

        try:
            return get_object_or_404(BookingDetails, pk=pk)  # get the booking object from the database
        except BookingDetails.DoesNotExist:
            return Response({'error': 'Booking object not found'}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve all the bookings made by the logged in user
    def get(self, request, pk=None):
        if pk is not None:
            # Retrieve a single booking by its primary key,will be needed for crud operations api redirection
            booking = get_object_or_404(BookingDetails, pk=pk)
            serializer = BookingDetailsSerializer(booking)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Retrieve all bookings for the current customer
            # user_id = request.user.id
            user_id = request.query_params.get(
                'user_id')  # PATCH-BY-PUJAN 15-3 (URL with userid =3 will be  http://127.0.0.1:8000/customerBookings/?user_id=3)
            if user_id is None:
                return Response({'error': 'User ID not send for GET request'}, status=status.HTTP_400_BAD_REQUEST)

            logger.log(logging.INFO, 'Retrieving bookings for user %s', user_id)
            bookings = BookingDetails.objects.filter(customer=user_id)
            serializer = BookingDetailsSerializer(bookings, many=True)
            return Response(serializer.data)

    # Update the booking detail as per the user request
    def put(self, request, pk=None):
        booking = self.get_single_object(pk)
        serializer = BookingDetailsSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete the booking detail as per the user request
    def delete(self, request, pk=None):
        booking = self.get_single_object(pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# for travelpackage vs booking count report
class TravelPackageVsBookingCountReportViewData(APIView):
    def get(self, request):
        start_date = request.query_params.get('startDate')
        end_date = request.query_params.get('endDate')
        if start_date is None or end_date is None:
            booking_counts = BookingDetails.objects.values('travel_package', 'created_date').annotate(
                booking_count=Count('customer'))
        else:
            booking_counts = BookingDetails.objects.filter(created_date__range=[start_date, end_date]).values(
                'travel_package', 'created_date').annotate(booking_count=Count('customer'))

        # #if we want to get travel package name from booking then
        # for entry in booking_counts:
        #     id = entry['travel_package']
        #     name = TravelPackage.objects.get(pk=id).name
        #     print(name)

        # we will pass id,travelpackage name and total count of ooking ,so this is report for package Vs Booking count
        data = [{'travel_package_id': entry['travel_package'],
                 'created_date': entry['created_date'],  # for date of booking
                 'travel_package_name': TravelPackage.objects.get(pk=entry['travel_package']).name,
                 'booking_count': entry['booking_count']} for entry in booking_counts]
        return Response(data)


# for Revenue Report Chart
class RevenueReportViewData(APIView):
    def get(self, request):
        start_date = request.query_params.get('startDate')
        end_date = request.query_params.get('endDate')
        if start_date is None or end_date is None:
            booking_counts = BookingDetails.objects.values('travel_package', 'created_date').annotate(
                booking_count=Count('customer'))
        else:
            booking_counts = BookingDetails.objects.filter(created_date__range=[start_date, end_date]).values(
                'travel_package', 'created_date').annotate(booking_count=Count('customer'))

        # we want travel package name and its revenue generated so will loop through above query data and calculate revenue for each package
        # we will pass Each Travel Package object and its booking count to calculateRevenuePerPackage function
        data = [{'travel_package_name': TravelPackage.objects.get(pk=entry['travel_package']).name,
                 'created_date': entry['created_date'],  # for date of booking
                 'revenue': calculateRevenuePerPackage(TravelPackage.objects.get(pk=entry['travel_package']),
                                                       entry['booking_count'])} for entry in booking_counts]
        return Response(data)


# it will take Travel Package,and how many times it was booked and calculate Revenue for that package
def calculateRevenuePerPackage(TravelPackage, bookingCount):
    revenuePerPackage = TravelPackage.price * bookingCount
    return revenuePerPackage


def get_users_data(request):
    users = User.objects.all()
    data = [{'id': user.id, 'username': user.username, 'FirstName': user.first_name, 'LastName': user.last_name,
             'email': user.email, 'IsActive': user.is_active, 'lastLogin': user.last_login} for user in users if
            user.user_type == 'User']
    return JsonResponse(data, safe=False)


# for User management from angular
# it will work for both user and agent deletion as it simply delete based on id
@require_http_methods(["DELETE"])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'}, status=204)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


# for Agent management from angular
def get_agents_data(request):
    agents = User.objects.all()
    data = [{'id': user.id, 'username': user.username, 'FirstName': user.first_name, 'LastName': user.last_name,
             'email': user.email, 'IsActive': user.is_active, 'lastLogin': user.last_login} for user in agents if
            user.user_type == 'Agent']
    return JsonResponse(data, safe=False)


# class NotificationViewSet(viewsets.ModelViewSet):
#     notificationlist = Notification.objects.all()


# for notification in notificationlist:
#     send_mail(
#         'Booking Update Notification',
#         notification.message,
#         'abc@gmail.com',
#         [notification.recepient.email],
#         fail_silently=False,
#     )

# def notificationhome(request):
#     return render(request, 'index.html', {
#         'room_name': "broadcast"
#     })
#
# def testnotification(request):
#     channel_layer = get_channel_layer()
#     #as messsages are asyncronous,we need to use async_to_sync to send the message
#     async_to_sync(channel_layer.group_send)(
#         "notification_broadcast",
#         {
#             'type': 'send_notification',
#             'message': json.dumps("Notification")
#         }
#     )
#     return HttpResponse("Notification  sent successfully")
# views.py
# @require_POST
# def my_view(request):
#     # View logic here
#     return HttpResponseBadRequest('Only POST requests are allowed')
# # @require_POST
# def delete_booking(request):
#     booking_id = request.POST.get('booking_id')
#     try:
#         booking = BookingDetails.objects.get(id=booking_id)
#         booking.delete()
#         return JsonResponse({'message': 'Booking deleted'})
#     except BookingDetails.DoesNotExist:
#         return JsonResponse({'message': 'Not Found'})

# def register(request):
#     msg = None
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             msg = 'user created'
#             return msg
#         else:
#             msg = 'form is not valid'
#     else:
#         form = SignUpForm()
#     return render(request,'register.html', {'form': form, 'msg': msg})


@api_view(['POST'])
def create_travel_package(request):
    if request.method == 'POST':
        # Create a new travel package

        # Extract data from the request
        name = request.data.get('name')
        flights_ids = request.data.get('flights', [])
        hotels_ids = request.data.get('hotels', [])
        activities_ids = request.data.get('activities', [])
        price = request.data.get('price', 0)  # Default price if not provided

        # Check if all required fields are present
        if not name or not flights_ids or not hotels_ids:
            return Response({'error': 'Name, flights, and hotels are required fields'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Fetch flights, hotels, and activities
        flights = Flight.objects.filter(id__in=flights_ids)
        hotels = Hotel.objects.filter(id__in=hotels_ids)
        activities = Activity.objects.filter(id__in=activities_ids)

        # Create the travel package
        travel_package = TravelPackage.objects.create(name=name, price=price)
        travel_package.flights.set(flights)
        travel_package.hotels.set(hotels)
        travel_package.activities.set(activities)

        # Serialize the created travel package
        serializer = TravelPackageSerializer(travel_package)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_travel_package(request, pk):
    if request.method == 'PUT':
        try:
            travel_package = TravelPackage.objects.get(pk=pk)
        except TravelPackage.DoesNotExist:
            return Response({'error': 'Travel package does not exist'}, status=status.HTTP_404_NOT_FOUND)

            # Extract data from the request
        name = request.data.get('name')
        flights_ids = request.data.get('flights', [])
        hotels_ids = request.data.get('hotels', [])
        activities_ids = request.data.get('activities', [])
        price = request.data.get('price', travel_package.price)  # Use current price if not provided

        # Update the travel package
        travel_package.name = name
        travel_package.price = price
        travel_package.flights.clear()
        travel_package.hotels.clear()
        travel_package.activities.clear()
        travel_package.save()

        # Update flights, hotels, and activities
        flights = Flight.objects.filter(id__in=flights_ids)
        hotels = Hotel.objects.filter(id__in=hotels_ids)
        activities = Activity.objects.filter(id__in=activities_ids)

        travel_package.flights.set(flights)
        travel_package.hotels.set(hotels)
        travel_package.activities.set(activities)

        # Serialize the updated travel package
        serializer = TravelPackageSerializer(travel_package)

        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def create_custom_travel_package(request):
    if request.method == 'POST':
        # Create a new custom travel package

        # Extract data from the request
        name = request.data.get('name')
        flights_ids = request.data.get('flights', [])
        hotels_ids = request.data.get('hotels', [])
        activities_ids = request.data.get('activities', [])
        price = request.data.get('price', 0)  # Default price if not provided

        # Check if all required fields are present
        if not name or not flights_ids or not hotels_ids:
            return Response({'error': 'Name, flights, and hotels are required fields'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Fetch flights, hotels, and activities
        flights = Flight.objects.filter(id__in=flights_ids)
        hotels = Hotel.objects.filter(id__in=hotels_ids)
        activities = Activity.objects.filter(id__in=activities_ids)

        # Create the custom travel package
        custom_travel_package = CustomTravelPackage.objects.create(name=name, price=price)
        custom_travel_package.flights.set(flights)
        custom_travel_package.hotels.set(hotels)
        custom_travel_package.activities.set(activities)

        # Serialize the created custom travel package
        serializer = CustomTravelPackageSerializer(custom_travel_package)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_custom_travel_package(request, pk):
    if request.method == 'PUT':
        try:
            custom_travel_package = CustomTravelPackage.objects.get(pk=pk)
        except CustomTravelPackage.DoesNotExist:
            return Response({'error': 'Custom Travel package does not exist'}, status=status.HTTP_404_NOT_FOUND)

            # Extract data from the request
        name = request.data.get('name')
        flights_ids = request.data.get('flights', [])
        hotels_ids = request.data.get('hotels', [])
        activities_ids = request.data.get('activities', [])
        price = request.data.get('price', custom_travel_package.price)  # Use current price if not provided

        # Update the custom travel package
        custom_travel_package.name = name
        custom_travel_package.price = price
        custom_travel_package.flights.clear()
        custom_travel_package.hotels.clear()
        custom_travel_package.activities.clear()
        custom_travel_package.save()

        # Update flights, hotels, and activities
        flights = Flight.objects.filter(id__in=flights_ids)
        hotels = Hotel.objects.filter(id__in=hotels_ids)
        activities = Activity.objects.filter(id__in=activities_ids)

        custom_travel_package.flights.set(flights)
        custom_travel_package.hotels.set(hotels)
        custom_travel_package.activities.set(activities)

        # Serialize the updated custom travel package
        serializer = CustomTravelPackageSerializer(custom_travel_package)

        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
