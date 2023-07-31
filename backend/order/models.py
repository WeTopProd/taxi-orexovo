from django.db import models

from users.models import Driver


class Order(models.Model):
    STATUS_ORDER = (
        ('new', 'Новый'),
        ('assigned', 'Назначен'),
        ('confirmed', 'Подтвержден'),
        ('complete', 'Завершен'),
        ('canceled', 'Отменен'),
    )
    name = models.CharField(
        max_length=255,
        verbose_name='Имя заказчика'
    )
    phone = models.CharField(
        max_length=255,
        verbose_name='Номер заказчика'
    )
    address = models.CharField(
        max_length=500,
        verbose_name='Адрес'
    )
    date_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата и время'
    )
    price = models.IntegerField(verbose_name='Цена поездки')
    status = models.CharField(
        max_length=30,
        choices=STATUS_ORDER,
        default='new',
        verbose_name='Статус заказа'
    )
    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Водитель'
    )

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-date_time']

    def __str__(self):
        return f'Заказ по адресу {self.address}'


class RefuseOrder(models.Model):
    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Водитель'
    )
    comment = models.CharField(
        verbose_name='Комментарий по отмене',
        max_length=1000
    )

    class Meta:
        verbose_name = 'Отмененный заказ'
        verbose_name_plural = 'Отмененные заказы'
        ordering = ['-driver']

    def __str__(self):
        return f'Заказ водителя {self.driver} отменен'
