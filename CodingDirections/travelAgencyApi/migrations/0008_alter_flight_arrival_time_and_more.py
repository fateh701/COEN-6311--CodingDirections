# Generated by Django 5.0.3 on 2024-03-14 18:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("travelAgencyApi", "0007_alter_flight_arrival_time_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="flight",
            name="arrival_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 14, 21, 59, 18, 281875, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="flight",
            name="departure_time",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 14, 18, 59, 18, 281875, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkinDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 14, 18, 59, 18, 282871, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="hotel",
            name="checkoutDate",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 15, 18, 59, 18, 282871, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
