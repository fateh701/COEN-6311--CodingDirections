from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

#
class Flight(models.Model):
    name = models.CharField(max_length=100)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    departure_time = models.DateTimeField(default=timezone.now())  #Set the default value to the current time
    arrival_time = models.DateTimeField(default=timezone.now() + timezone.timedelta(hours=3)) #Set the default value to the current time + 3 hours
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta:  # this is to display the list of flights in ascending order of departure time
        ordering = ['departure_time'];


class Hotel(models.Model):
    name = models.CharField(max_length=100)
    checkinDate = models.DateTimeField(default=timezone.now())  # Set the default value to the current date
    checkoutDate = models.DateTimeField(default=timezone.now()+timezone.timedelta(days=1))  # Set the default value
    # to the current date + 1 day
    location = models.CharField(max_length=100)
    occupancy = models.IntegerField(default=1) # Set the default value to 1
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta:  # this is to display the list of hotels in ascending order of name
        ordering = ['name'];


class Activity(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta: # this is to display the list of activities in ascending order of name
        ordering = ['name'];


class TravelPackage(models.Model):
    name = models.CharField(max_length=100)
    flights = models.ManyToManyField(Flight)
    hotels = models.ManyToManyField(Hotel)
    activities = models.ManyToManyField(Activity, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=1122.00)

    def __str__(self):
        return self.name

    class Meta:
      ordering = ['name'];
  
class Notification(models.Model):
    Notification = ('info', 'Information'),
    message = models.TextField()
    notification = models.CharField(max_length=250, default= 'info')
    Date_Time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.message
      
    class Meta:
        ordering = ['Date_Time']

class BookingDetails(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    travel_package = models.ManyToManyField(TravelPackage)
    payment_status_flag = models.BooleanField(default=False)

    def __str__(self):
        return self.customer.username + " " + str(self.payment_status_flag)

    class Meta:
        ordering = ['customer']

