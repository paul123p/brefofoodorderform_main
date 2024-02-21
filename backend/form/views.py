from django.shortcuts import render
from rest_framework import generics

from . import models
from . import serializers

# Create your views here.


class ListOrders(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.FoodOrderingSerializer
      
