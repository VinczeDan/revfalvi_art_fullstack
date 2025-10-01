from rest_framework.routers import DefaultRouter
from .views import PaintingViewSet, TodoViewSet, send_contact_email, NewsViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

