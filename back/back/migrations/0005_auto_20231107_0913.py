# Generated by Django 3.2.22 on 2023-11-07 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0004_alter_user_datetime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='id',
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.CharField(max_length=30, primary_key=True, serialize=False),
        ),
    ]
