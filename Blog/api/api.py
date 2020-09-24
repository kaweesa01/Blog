from Blog.models import ImagesModel,BlogModel
from rest_framework import permissions, viewsets
from rest_framework.pagination import PageNumberPagination
from .serializers import BlogSerializer,ImageSerializer
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser

# logo view set
class ImageViewSet(viewsets.ModelViewSet):
    queryset = ImagesModel.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)

# Blog view set

class BlogPaginationSet(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 2000

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogModel.objects.all().order_by('-date')
    permission_classes = [
        permissions.AllowAny
    ]
    pagination_class = BlogPaginationSet
    serializer_class = BlogSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    
    def delete(self, request, format=None):
      BlogModel.image.delete(save=True)
      return Response(status=status.HTTP_204_NO_CONTENT)
  
class AdminBlogViewSet(viewsets.ModelViewSet):
    queryset = BlogModel.objects.all().order_by('-date')
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BlogSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    
    def delete(self, request, format=None):
      BlogModel.image.delete(save=True)
      return Response(status=status.HTTP_204_NO_CONTENT)
  
class UserBlogViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BlogSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    
    def delete(self, request, format=None):
      BlogModel.image.delete(save=True)
      return Response(status=status.HTTP_204_NO_CONTENT)
  
    def get_queryset(self):
        return self.request.user.blog.all().order_by('-date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)