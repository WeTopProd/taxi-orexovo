from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (OrderViewSet, TakeOrderView, AssignOrderView,
                    RefuseOrderView, CompleteOrderView)

router = DefaultRouter()
router.register('orders', OrderViewSet)

urlpatterns = [
    path(
        'take-order/<int:order_id>/',
        TakeOrderView.as_view(),
        name='take-order'
    ),
    path(
        'assign-order/<int:order_id>/<int:driver_id>/',
        AssignOrderView.as_view(),
        name='assign-order'
    ),
    path(
        'refuse-order/<int:order_id>/',
        RefuseOrderView.as_view(),
        name='refuse-order'
    ),
    path(
        'complete-order/<int:order_id>/',
        CompleteOrderView.as_view(),
        name='complete-order'
    ),
    path('', include(router.urls)),
]
