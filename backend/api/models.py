from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)


class Painting(models.Model):
    TECHNIQUE_CHOICES = [
        ('watercolor', 'Akvarell'),
        ('acrylic', 'Akril'),
        ('oil', 'Olajfestmény'),
        ('pencil', 'Ceruza munka'),
    ]

    title_hu = models.CharField(max_length=200, verbose_name="Cím (magyar)")
    title_en = models.CharField(max_length=200, verbose_name="Cím (angol)", blank=True, null=True)

    description_hu = models.TextField(verbose_name="Leírás (magyar)")
    description_en = models.TextField(verbose_name="Leírás (angol)", blank=True, null=True)

    technique = models.CharField(
        max_length=20,
        choices=TECHNIQUE_CHOICES,
        verbose_name="Technika"
    )
    image = models.ImageField(
        upload_to='paintings/',
        verbose_name="Képfájl"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        verbose_name="Ár",
        default=0
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title_hu

    class Meta:
        ordering = ['-created_at']


class News(models.Model):
    title_hu = models.CharField(max_length=200, verbose_name="Cím (magyar)")
    title_en = models.CharField(max_length=200, verbose_name="Cím (angol)", blank=True, null=True)
    
    content_hu = models.TextField(verbose_name="Tartalom (magyar)")
    content_en = models.TextField(verbose_name="Tartalom (angol)", blank=True, null=True)
    
    image = models.ImageField(
        upload_to='news_images/',
        verbose_name="Képfájl",
        blank=True,
        null=True
    )


    
    publication_date = models.DateField(auto_now_add=True, verbose_name="Dátum")

    def __str__(self):
        return self.title_hu

    class Meta:
        ordering = ['-publication_date']
        verbose_name_plural = "Hírek"


class NewsImage(models.Model):
    news = models.ForeignKey(
        News,
        related_name='images',
        on_delete=models.CASCADE,
        verbose_name="Hír"
    )
    image = models.ImageField(upload_to='news_images/', verbose_name="Kép")
    caption = models.CharField(max_length=255, blank=True, null=True, verbose_name="Képaláírás")
    order = models.PositiveIntegerField(default=0, verbose_name="Sorrend")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Kép a(z) {self.news.title_hu} hírhez"


class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Kezdő'),
        ('advanced', 'Haladó'),
        ('all', 'Minden szint'),
    ]

    title_hu = models.CharField(max_length=200, verbose_name="Cím (magyar)")
    title_en = models.CharField(max_length=200, verbose_name="Cím (angol)", blank=True, null=True)

    description_hu = models.TextField(verbose_name="Leírás (magyar)")
    description_en = models.TextField(verbose_name="Leírás (angol)", blank=True, null=True)

    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        default='all',
        verbose_name="Szint"
    )
    duration = models.CharField(max_length=100, verbose_name="Időtartam", help_text="Pl. 8 alkalom")
    price = models.CharField(max_length=100, verbose_name="Ár", help_text="Pl. 35 000 Ft")
    icon = models.CharField(verbose_name="Ikon (emoji)", default="🎨", blank=True)
    is_active = models.BooleanField(default=True, verbose_name="Aktív")
    order = models.PositiveIntegerField(default=0, verbose_name="Sorrend")

    class Meta:
        ordering = ['order']
        verbose_name = "Tanfolyam"
        verbose_name_plural = "Tanfolyamok"

    def __str__(self):
        return self.title_hu


class Video(models.Model):
    title_hu = models.CharField(max_length=200, verbose_name="Cím (magyar)")
    title_en = models.CharField(max_length=200, verbose_name="Cím (angol)", blank=True, null=True)
    
    description_hu = models.TextField(verbose_name="Leírás (magyar)", blank=True, null=True)
    description_en = models.TextField(verbose_name="Leírás (angol)", blank=True, null=True)
    
    video_file = models.FileField(
        upload_to='videos/', 
        verbose_name="Videófájl",
        help_text="MP4 formátum ajánlott"
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Feltöltve")
    is_active = models.BooleanField(default=True, verbose_name="Aktív")
    order = models.PositiveIntegerField(default=0, verbose_name="Sorrend")

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Videó"
        verbose_name_plural = "Videók"

    def __str__(self):
        return self.title_hu