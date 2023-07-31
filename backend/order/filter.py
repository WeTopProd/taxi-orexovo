from django_filters.rest_framework import FilterSet, filters

from .models import Order
from users.models import Driver


class OrderFilter(FilterSet):
    driver = filters.MultipleChoiceFilter(
        field_name='driver',
        choices=()
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        drivers_id = Driver.objects.values_list('pk', flat=True)
        self.filters['driver'].extra['choices'] = zip(
            drivers_id, drivers_id
        )
    name = filters.CharFilter(
        lookup_expr='icontains',
        field_name='name'
    )
    phone = filters.CharFilter(
        lookup_expr='icontains',
        field_name='phone'
    )
    address = filters.CharFilter(
        lookup_expr='icontains',
        field_name='address'
    )
    date_time = filters.DateTimeFilter(
        field_name='date_time',
        lookup_expr='range'
    )
    status = filters.MultipleChoiceFilter(
        field_name='status',
        choices=Order.STATUS_ORDER
    )

    class Meta:
        model = Order
        fields = (
            'status',
            'driver',
            'name',
            'phone',
            'address',
            'date_time'
        )
