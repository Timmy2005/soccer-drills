# Generated by Django 3.1 on 2020-08-28 15:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20200828_1431'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='session',
            options={'ordering': ['index']},
        ),
        migrations.AlterModelOptions(
            name='sessioncompleted',
            options={'ordering': ['session__index']},
        ),
        migrations.RenameField(
            model_name='groupprogress',
            old_name='date_completed',
            new_name='last_modified',
        ),
    ]