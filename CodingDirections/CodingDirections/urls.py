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
from django.urls import path
from . import views
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'flights', views.FlightViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'travel-packages', views.TravelPackageViewSet)
router.register(r'modification', views.ModificationViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),   #for login option in default page
    path('', include(router.urls)),
    path('travelAgencyApi/', include('travelAgencyApi.urls')),
    path('search/', views.flight, name='flight'),
    path('send_confirmation_email/', views.send_confirmation_email, name='send_confirmation_email'),

]