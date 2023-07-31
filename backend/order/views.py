from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Driver

from .filter import OrderFilter
from .models import Order, RefuseOrder
from .pagination import CustomPagination
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    pagination_class = CustomPagination
    serializer_class = OrderSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter


class TakeOrderView(APIView):
    def post(self, request, order_id):
        driver = request.user
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Заказ не найден'},
                            status=status.HTTP_404_NOT_FOUND)
        order.status = 'confirmed'
        order.save()
        driver.status = 'busy'
        driver.save()
        return Response({
            'message': 'Заказ успешно принят и подтвержден',
            'order_id': order.id}, status=status.HTTP_202_ACCEPTED)


class AssignOrderView(APIView):
    def post(self, request, order_id, driver_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoedNotExist:
            return Response({'error': 'Заказ не найден'},
                            status=status.HTTP_404_NOT_FOUND)
        if order.status != 'new':
            return Response({'error': 'Заказ уже занят или подтвержден'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            driver = Driver.objects.get(id=driver_id)
        except Driver.DoesNotExist:
            return Response({'error': 'Водитель не найден'},
                            status=status.HTTP_404_NOT_FOUND)
        order.status = 'assigned'
        order.driver = driver
        order.save()
        return Response(
            {'message': 'Заказ успешно назначен',
             'order_id': order.id, 'driver_id': driver_id},
            status=status.HTTP_201_CREATED
        )


class RefuseOrderView(APIView):
    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoedNotExist:
            return Response({'error': 'Заказ не найден'},
                            status=status.HTTP_404_NOT_FOUND)
        order.driver = None
        order.status = 'new'
        order.save()
        refuse_order = RefuseOrder()
        refuse_order.driver = request.user
        comment = request.data.get('comment', '')
        refuse_order.comment = comment
        refuse_order.save()
        return Response(
            {'message': f'Заказ {order_id} отменен'},
            status=status.HTTP_204_NO_CONTENT
        )


class CompleteOrderView(APIView):
    def post(self, request, order_id):
        driver = request.user
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoedNotExist:
            return Response({'error': 'Заказ не найден'},
                            status=status.HTTP_404_NOT_FOUND)
        if order.driver != driver:
            return Response({'error': 'Вы не можете завершить не свой заказ!'},
                            status=status.HTTP_400_BAD_REQUEST)
        order.status = 'complete'
        order.save()
        driver.status = 'free'
        driver.save()
        return Response(
            {'message': f'Заказ {order_id} завершен'},
            status=status.HTTP_200_OK
        )
