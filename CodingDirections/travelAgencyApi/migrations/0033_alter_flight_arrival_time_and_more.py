# Generated by Django 5.0.3 on 2024-03-17 02:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("travelAgencyApi", "0032_alter_flight_arrival_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="flight",
            name="arrival_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 17, 5, 15, 24, 560965, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="flight",
            name="departure_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 17, 2, 15, 24, 560965, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkinDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 17, 2, 15, 24, 562010, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkoutDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 18, 2, 15, 24, 562010, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
