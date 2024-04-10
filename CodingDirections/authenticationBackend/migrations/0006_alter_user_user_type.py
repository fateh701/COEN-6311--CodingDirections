# Generated by Django 5.0.3 on 2024-04-09 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticationBackend', '0005_user_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Agent', 'Agent'), ('User', 'User')], max_length=5),
        ),
    ]