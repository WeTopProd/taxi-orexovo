from django.contrib import admin

from .models import Driver


class DriverAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'phone',
        'first_name',
        'car_number'
    )
    ordering = ('first_name', )
    search_fields = ('phone', 'car_number', 'first_name')
    list_filter = ('phone', 'car_number')


admin.site.register(Driver, DriverAdmin)
