from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaintingViewSet, TodoViewSet

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]