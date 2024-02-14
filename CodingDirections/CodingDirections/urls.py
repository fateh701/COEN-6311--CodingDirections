from django.contrib import admin
from django.urls import path,include  # include() function to route to default page
from travelAgencyApi import views
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),   #for login option in default page
    path('books/', views.BookViewSet.as_view(), name='book-list'),        #for default page url


    path('books/create/', views.BookCreateViewSet.as_view(), name='book-create'),# will be use when we want to update the entries

]