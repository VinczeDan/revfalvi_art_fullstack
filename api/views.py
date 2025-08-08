from rest_framework import viewsets
from .models import Todo, Painting
from .serializers import TodoSerializer, PaintingSerializer 
from django.shortcuts import render



def index_view(request):
    return render(request, 'index.html')  



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer



class PaintingViewSet(viewsets.ModelViewSet):
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        technique = self.request.query_params.get('technique', None)
        if technique:
            queryset = queryset.filter(technique=technique)
        return queryset