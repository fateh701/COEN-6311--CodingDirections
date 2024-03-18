"""
ASGI config for CodingDirections project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""
import os
from django.urls import re_path
# import sys
# if os.path.dirname(os.path.abspath(__file__)) not in sys.path:
#     sys.path.append(os.path.dirname(os.path.abspath(__file__)))
# sys.path.append('..')
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from . import temp

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
#from ..notification_app.routing import websocket_urlpatterns
#from CodingDirections.notification_app.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CodingDirections.settings')
django.setup()

websocket_urlpatterns = [
    re_path(r"ws/notification/(?P<room_name>\w+)/$", temp.NotificationConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
            # chat.routing.websocket_urlpatterns
        )
    ),
})
