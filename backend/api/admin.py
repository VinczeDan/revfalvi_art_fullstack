from django.contrib import admin
from .models import Painting


@admin.register(Painting)
class PaintingAdmin(admin.ModelAdmin):
    list_display = ('get_title', 'technique', 'created_at', 'is_featured')
    list_filter = ('technique', 'is_featured', 'created_at')
    search_fields = ('title_hu', 'title_en', 'description_hu', 'description_en')

    def get_title(self, obj):
        # Admin listában megjelenő cím
        return obj.title_hu or obj.title_en
    get_title.short_description = "Cím"
