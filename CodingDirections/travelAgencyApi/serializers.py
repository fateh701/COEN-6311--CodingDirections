from rest_framework import serializers
from .models import Flight, Hotel, Activity, TravelPackage, BookingDetails, BookingAgent, Modification


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

# class NotificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Notification
#         fields = '__all__'

class BookingDetailsSerializer(serializers.ModelSerializer):
    travel_package = TravelPackageSerializer(many=True,read_only=True) #read_only=True is used to make the field read only wwhen we want to update the booking detail
    class Meta:
        model = BookingDetails
        fields = '__all__'

class BookingAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingAgent
        fields = '__all__'

#Patch by Prinkal: 26-2-2024
class ModificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modification
        fields = '__all__'
