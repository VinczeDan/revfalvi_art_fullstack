from django.contrib import admin
from .models import Painting, News, NewsImage


@admin.register(Painting)
class PaintingAdmin(admin.ModelAdmin):
    list_display = ('get_title', 'technique', 'created_at', 'is_featured')
    list_filter = ('technique', 'is_featured', 'created_at')
    search_fields = ('title_hu', 'title_en', 'description_hu', 'description_en')

    fieldsets = (
        ("Címek", {
            'fields': ('title_hu', 'title_en')
        }),
        ("Leírások", {
            'fields': ('description_hu', 'description_en')
        }),
        ("Egyéb adatok", {
            'fields': ('technique', 'image', 'is_featured')
        }),
    )

    def get_title(self, obj):
        return obj.title_hu or obj.title_en
    get_title.short_description = "Cím"


class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1  # hány üres sort mutasson
    fields = ('image', 'caption', 'order')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('get_title', 'publication_date')
    list_filter = ('publication_date',)
    search_fields = ('title_hu', 'title_en', 'content_hu', 'content_en')
    inlines = [NewsImageInline]  # ⬅️ itt hozzáadva

    fieldsets = (
        ("Címek", {
            'fields': ('title_hu', 'title_en')
        }),
        ("Tartalom", {
            'fields': ('content_hu', 'content_en')
        }),
        ("Borítókép", {
            'fields': ('image',)
        }),
    )

    def get_title(self, obj):
        return obj.title_hu or obj.title_en
    get_title.short_description = "Cím"
