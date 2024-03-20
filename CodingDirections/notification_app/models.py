from django.db import models


class Notification(models.Model):
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.message