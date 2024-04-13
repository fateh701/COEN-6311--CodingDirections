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
# import notification_app.urls as no_urls

from django.contrib import admin

router = DefaultRouter()
router.register(r'flights', views.FlightViewSet)
router.register(r'hotels', views.HotelViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'travel-packages', views.TravelPackageViewSet)
router.register(r'booking-details', views.BookingDetailsViewSet) #get all the bookings made till now
router.register(r'booking-agent', views.BookingAgentViewSet)
#add url for create_booking method

urlpatterns = [
    path('', include(router.urls)),
    path('',include('notification_app.urls')), #for notification
    path('admin/', admin.site.urls),
    path('create-user/',include('tokenizationBackend.urls')), #for signup
    path('customerBookings/',views.CustomerBookingsViewSet.as_view(),name='customerBookings'), #for customer booking details
    path('customerBookings/<int:pk>/',views.CustomerBookingsViewSet.as_view(),name='customerBookingsCURD'), #for customer booking details
    path(r'create-booking/',views.create_booking,name='create-booking'), #add booking detail in form of json,mainly used for frontend,dont remove
    #path(r'current-user-info/',views.current_user_info,name='current-user-info'), #for current user info
    path(r'profile/',views.profile_view,name='profile'), #for current user info
    path(r'tpvscount/',views.TravelPackageVsBookingCountReportViewData.as_view(),name='reports'),
    path(r'revenue/',views.RevenueReportViewData.as_view(),name='revenue'),
    # path(r'notification',views.notificationhome,name='notification'), #for notification
    # path(r'test/',views.testnotification,name='test'), #for testing notification
    #path(r'home/',views.notificationhome,name='home'), #for notification
    #path(r'celery/',views.celerytest,name='celery'), #for testing celery
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),   #for login option in default page
    path('users/',views.get_users_data,name='users'), #for user details
    path('users/<int:user_id>/', views.delete_user, name='delete_user'),
    path('agents/',views.get_agents_data,name='agents'), #for agent details
    path('agents/<int:user_id>/', views.delete_user, name='delete_agent'),
    #path('delete-booking/', views.delete_booking, name='delete_booking'),  #for deleting booking
    #path('login/',views.register,name='login'), #for login
]
