from django.apps import AppConfig


class NotificationAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "notification_app"

    def ready(self):
        import notification_app.signals