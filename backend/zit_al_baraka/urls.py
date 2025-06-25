# backend/zit_al_baraka/urls.py

from django.contrib import admin
from django.urls import path, include  # Make sure 'include' is imported
from django.conf import settings         # Import settings
from django.conf.urls.static import static # Import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 1. THIS LINE IS ESSENTIAL:
    # It tells Django that any request starting with 'api/' should be
    # handled by the urls in your 'api/urls.py' file.
    path('api/', include('api.urls')),
]

# 2. THIS BLOCK IS ESSENTIAL FOR IMAGES TO WORK:
# It tells Django to serve the files from your '/media/' folder
# when you are in development mode (DEBUG=True).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)