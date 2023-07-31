from rest_framework import serializers

from .models import Order, RefuseOrder


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            'id',
            'name',
            'phone',
            'address',
            'date_time',
            'price',
            'status',
            'driver'
        )


class RefuseSerializer(serializers.ModelSerializer):

    class Meta:
        model = RefuseOrder
        fields = (
            'id',
            'driver',
            'comment'
        )
