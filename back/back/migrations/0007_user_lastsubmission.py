# Generated by Django 3.2.22 on 2023-11-08 07:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0006_auto_20231107_0921'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='lastsubmission',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 7, 7, 18, 28, 265341)),
            preserve_default=False,
        ),
    ]
