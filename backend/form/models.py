from django.db import models
import uuid

class Order(models.Model):
    customerName = models.CharField(max_length=100)
    customerPhone = models.CharField(max_length=100)
    foodType = models.CharField(max_length=100)
    foodName = models.CharField(max_length=100)
    foodPrice = models.CharField(max_length=100)
    
    def __str__(self):
        return self.customerName