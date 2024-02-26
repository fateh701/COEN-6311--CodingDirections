"""CodingDirections URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
import travelAgencyApi.views as views
from django.contrib import admin

router = DefaultRouter()
router.register(r'flights', views.FlightViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'travel-packages', views.TravelPackageViewSet)
router.register(r'booking-details', views.BookingDetailsViewSet)
#add url for create_booking method

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path(r'create-booking/',views.create_booking,name='create-booking'), #add booking detail in form of json,mainly used for frontend,dont remove
    path(r'current-user-info/',views.current_user_info,name='current-user-info'), #for current user info
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),   #for login option in default page
]
