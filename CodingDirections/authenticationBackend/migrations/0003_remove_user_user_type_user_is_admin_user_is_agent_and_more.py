# Generated by Django 5.0.3 on 2024-04-02 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticationBackend', '0002_user_user_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_type',
        ),
        migrations.AddField(
            model_name='user',
            name='is_admin',
            field=models.BooleanField(default=False, verbose_name='Is admin'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_agent',
            field=models.BooleanField(default=False, verbose_name='Is agent'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_user',
            field=models.BooleanField(default=False, verbose_name='Is user'),
        ),
    ]
