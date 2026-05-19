from rest_framework import serializers
from .models import Todo, Painting, News, NewsImage, Course, Video


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class PaintingSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    # ⚠️ Átírjuk SerializerMethodField-re, hogy mi vezérelhessük a nyelvet!
    technique_display = serializers.SerializerMethodField()
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
            'created_at',
            'price',
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

    # ⬅️ EZT AZ ÚJ FÜGGVÉNYT ADD HOZZÁ:
    def get_technique_display(self, obj):
        lang = self.context.get("lang", "hu")
        tech = obj.technique
        
        # Magyar fordítások
        if lang == "hu":
            if tech == "watercolor": return "Akvarell"
            if tech == "acrylic": return "Akril"
            if tech == "oil": return "Olajfestmény"
            if tech == "pencil": return "Ceruza munka"
            return obj.get_technique_display()
            
        # Angol fordítások
        else:
            if tech == "watercolor": return "Watercolor"
            if tech == "acrylic": return "Acrylic"
            if tech == "oil": return "Oil painting"
            if tech == "pencil": return "Pencil drawing"
            return tech.capitalize()

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


class CourseSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'description',
            'level',
            'level_display',
            'duration',
            'price',
            'icon',
            'is_active',
            'order',
        ]

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
    
class VideoSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video_url', 'order']

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

    def get_video_url(self, obj):
        if obj.video_file:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.video_file.url)
            return obj.video_file.url
        return None