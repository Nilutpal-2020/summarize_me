from django.db import models

# Create your models here.

class Item(models.Model):
    summary = models.TextField()
    ratio = models.FloatField(default=0.2)
    created = models.DateTimeField(auto_now_add=True)
