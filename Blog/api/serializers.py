from rest_framework import serializers
from Blog.models import BlogModel,ImagesModel

# Diary serializer

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogModel
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesModel
        fields = '__all__'
