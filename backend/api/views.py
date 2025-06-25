# backend/api/views.py
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(stock__gt=0)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
def api_root(request):
    return Response({
        'message': 'Welcome to Zit al Baraka API',
        'endpoints': {
            'products': '/api/products/',
        }
    })