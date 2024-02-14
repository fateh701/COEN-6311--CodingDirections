from .models import Book
from .serializers import BookSerializer
from rest_framework import generics, permissions,filters
# Create your views here.

# For list/viewing only purpose
class BookViewSet(generics.ListAPIView):
    search_fields = ['title','author', 'genre'] #it will search among the given fields in the list
    filter_backends = (filters.SearchFilter,)  #enabling search filter in all pages
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

class BookCreateViewSet(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [
        permissions.IsAdminUser
    ]  #only admin can add new entry