# Generated by Django 3.1 on 2020-09-04 19:52

import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0012_remove_blogmodel_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogmodel',
            name='user',
            field=models.CharField(default=django.contrib.auth.models.User, max_length=120),
        ),
    ]
