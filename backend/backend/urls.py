from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from api.views import PaintingViewSet, TodoViewSet, send_contact_email  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('send-contact-email/', send_contact_email, name='send-contact-email'),  # <- Új sor
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)