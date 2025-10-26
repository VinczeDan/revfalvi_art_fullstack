from rest_framework import serializers
from .models import Todo, Painting, News, NewsImage


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class PaintingSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    technique_display = serializers.CharField(source='get_technique_display', read_only=True)
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Painting
        fields = [
            'id',
            'title',
            'description',
            'technique',
            'technique_display',
            'image_url',
            'created_at'
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_title(self, obj):
        lang = self.context.get("lang", "hu")
        if lang == "en" and obj.title_en:
            return obj.title_en
        return obj.title_hu

    def get_description(self, obj):
        lang = self.context.get("lang", "hu")
        if lang == "en" and obj.description_en:
            return obj.description_en
        return obj.description_hu


# ÚJ: Képek serializer a News-hoz
class NewsImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsImage
        fields = ["id", "image_url", "caption"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class NewsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    images = NewsImageSerializer(many=True, read_only=True)  # ⬅️ több kép hozzáadva

    class Meta:
        model = News
        fields = [
            'id',
            'title',
            'content',
            'image_url',
            'images',
            'publication_date',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_title(self, obj):
        lang = self.context.get("lang", "hu")
        if lang == "en" and obj.title_en:
            return obj.title_en
        return obj.title_hu

    def get_content(self, obj):
        lang = self.context.get("lang", "hu")
        if lang == "en" and obj.content_en:
            return obj.content_en
        return obj.content_hu
