from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CodingDirections.settings')

app = Celery('CodingDirections')
app.config_from_object('django.conf:settings', namespace='CELERY')

#celery beat setting
app.conf.beat_schedule = {
}

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')