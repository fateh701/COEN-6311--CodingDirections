from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BookingDetails, Notification, Modification

@receiver(post_save, sender=BookingDetails)
def send_notification(sender, instance, created, **kwargs):
    if not created:
        recpients = [instance.customer]
        message = f"Your booking with ID {instance.pk} has been updated."

        # create a notification for all the users
        for recepient in recpients:
            Notification.objects.create(recepient=recepient, message=message)