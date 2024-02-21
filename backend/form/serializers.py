from rest_framework import serializers, viewsets
from . import models

class FoodOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'