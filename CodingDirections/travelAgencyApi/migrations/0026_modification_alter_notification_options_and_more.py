# Generated by Django 5.0.1 on 2024-02-27 18:58

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("travelAgencyApi", "0025_alter_flight_arrival_time_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Modification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Client", models.CharField(max_length=50)),
                ("request", models.TextField()),
                ("Request_creation_Date_Time", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name="notification",
            options={},
        ),
        migrations.RemoveField(
            model_name="notification",
            name="notification",
        ),
        migrations.AddField(
            model_name="notification",
            name="recepient",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="flight",
            name="arrival_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 27, 21, 58, 40, 419730, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="flight",
            name="departure_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 27, 18, 58, 40, 419730, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkinDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 27, 18, 58, 40, 420741, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkoutDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 28, 18, 58, 40, 420741, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="notification",
            name="message",
            field=models.TextField(default=""),
        ),
    ]
