# Generated by Django 4.0.7 on 2022-11-23 03:58

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_todos_img_todos_url_alter_todos_created_timestamp_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='todos',
            name='is_image',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='photoalbum',
            name='created_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 3, 58, 5, 567268, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='todos',
            name='created_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 3, 58, 5, 567268, tzinfo=utc)),
        ),
    ]
