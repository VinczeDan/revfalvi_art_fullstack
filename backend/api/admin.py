from django.contrib import admin
from .models import Painting

@admin.register(Painting)
class PaintingAdmin(admin.ModelAdmin):
    list_display = ('title', 'technique', 'created_at')
    list_filter = ('technique',)
    search_fields = ('title', 'description')