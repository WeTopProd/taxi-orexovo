from django.contrib import admin

from .models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'name',
        'phone',
        'address',
        'date_time',
        'status'
    )
    ordering = ('name', )
    search_fields = ('phone', 'address', 'first_name')
    list_filter = ('phone', 'date_time', 'status')


admin.site.register(Order, OrderAdmin)
