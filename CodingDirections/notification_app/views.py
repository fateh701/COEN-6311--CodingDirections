from datetime import timezone, timedelta

from django.shortcuts import render
from .tasks import test_func
from django.http import HttpResponse


# Create your views here.
def celery(request):
    test_func.delay()
    return HttpResponse("Celery is working")