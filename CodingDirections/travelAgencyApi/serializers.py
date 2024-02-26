from rest_framework import serializers
from .models import Flight, Hotel, Activity, TravelPackage, Notification, BookingDetails, BookingAgent


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class TravelPackageSerializer(serializers.ModelSerializer):
    flights = FlightSerializer(many=True)
    hotels = HotelSerializer(many=True)
    activities = ActivitySerializer(many=True)

    class Meta:
        model = TravelPackage
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class BookingDetailsSerializer(serializers.ModelSerializer):
    travel_package = TravelPackageSerializer(many=True)
    class Meta:
        model = BookingDetails
        fields = '__all__'

class BookingAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingAgent
        fields = '__all__'