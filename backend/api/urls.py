# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
]