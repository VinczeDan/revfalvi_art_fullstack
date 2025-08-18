from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaintingViewSet, TodoViewSet, send_contact_email  # <- send_contact_email importálása

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('send-contact-email/', send_contact_email, name='send-contact-email'),  # <- Új sor
]