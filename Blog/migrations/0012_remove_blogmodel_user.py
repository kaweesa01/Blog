# Generated by Django 3.1 on 2020-09-04 19:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0011_auto_20200904_2251'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogmodel',
            name='user',
        ),
    ]
