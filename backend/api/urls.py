from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import PaintingViewSet, TodoViewSet, send_contact_email, NewsViewSet
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = router.urls + [
    path("send-contact-email/", send_contact_email, name="send_contact_email"),
]
