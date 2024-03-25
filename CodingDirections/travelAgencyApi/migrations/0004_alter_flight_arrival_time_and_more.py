# Generated by Django 4.2.7 on 2024-03-22 17:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travelAgencyApi', '0003_alter_flight_arrival_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='arrival_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 22, 20, 13, 27, 348028, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='flight',
            name='departure_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 22, 17, 13, 27, 347584, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='checkinDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 22, 17, 13, 27, 348618, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='checkoutDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 23, 17, 13, 27, 348660, tzinfo=datetime.timezone.utc)),
        ),
    ]