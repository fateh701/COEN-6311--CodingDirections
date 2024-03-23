from django.db import models


class Notification(models.Model):
    message = models.CharField(max_length=300)
    send_to_agents = models.BooleanField(default=True)
    send_to_users = models.BooleanField(default=True)

    def __str__(self):
        return self.message