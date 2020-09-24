from django.db import models
import os
from django.contrib.auth.models import User
# Create your models here.

class BlogModel(models.Model):
    image = models.ImageField(upload_to='pictures/%Y/%m/%d/', max_length=255, null=True, blank=True)
    blog = models.TextField()
    date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, related_name='blog',on_delete=models.CASCADE, null=True)
    
    creator = models.CharField(max_length=100, default=" ")
    
    def delete(self,*args,**kwargs):
        if os.path.isfile(self.image.path):
            os.remove(self.image.path)

        super(BlogModel, self).delete(*args,**kwargs)
        
    def __str__(self):
        return self.owner.username
    
class ImagesModel(models.Model):
    image = models.ImageField(upload_to='logo/', max_length=255, null=True, blank=True)