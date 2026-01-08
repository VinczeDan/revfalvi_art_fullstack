from django.urls import path
from rest_framework.routers import DefaultRouter
# Importáljuk a views-t a jelenlegi könyvtárból
from . import views 

router = DefaultRouter()
router.register(r'paintings', views.PaintingViewSet)
router.register(r'todos', views.TodoViewSet)
router.register(r'news', views.NewsViewSet)

urlpatterns = router.urls + [
    # Most már a views.függvénynév formátum működni fog
    path("send-contact-email/", views.send_contact_email, name="send_contact_email"),
    path("send-test-email/", views.send_test_email, name="send_test_email"),
]