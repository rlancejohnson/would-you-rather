# Generated by Django 4.0.2 on 2022-02-04 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0005_rename_create_date_question_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='option',
            name='label',
            field=models.TextField(max_length=500, unique=True),
        ),
    ]
