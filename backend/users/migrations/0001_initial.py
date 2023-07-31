# Generated by Django 3.2 on 2023-06-07 15:12

import django.core.validators
from django.db import migrations, models
import phonenumber_field.modelfields
import users.managers
import users.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('car_number', models.CharField(blank=True, max_length=15, null=True, validators=[django.core.validators.RegexValidator(code='invalid_license_plate', message='Введите правильный гос. номер машины', regex='^[АВЕКМНОРСТУХABEKMHOPCTYX]{1}\\d{3}[АВЕКМНОРСТУХABEKMHOPCTYX]{2}\\d{2,3}$')], verbose_name='Гос. номер машины')),
                ('first_name', models.CharField(max_length=150, verbose_name='Имя водителя')),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True, validators=[users.validators.validate_phone_number], verbose_name='Телефон')),
                ('status', models.CharField(blank=True, choices=[('free', 'Свободен'), ('busy', 'Занят')], default='busy', max_length=30, null=True, verbose_name='Статус водителя')),
                ('user_type', models.CharField(choices=[('barman', 'Бармен'), ('dispatcher', 'Диспетчер'), ('driver', 'Водитель')], max_length=20, verbose_name='Тип пользователя')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
                'ordering': ('status',),
            },
            managers=[
                ('objects', users.managers.UserManager()),
            ],
        ),
    ]