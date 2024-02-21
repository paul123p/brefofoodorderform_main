from django.urls import path, include
from . import views

urlpatterns = [
    path('orders/', views.ListOrders.as_view(), name="list-orders"),
]