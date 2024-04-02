from django.urls import path
from . import views

urlpatterns = [
    path(r'notify/', views.index, name='index')
]