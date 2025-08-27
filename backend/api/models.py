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
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title_hu

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Festmény"
        verbose_name_plural = "Festmények"

    # Ez egy kis segédfüggvény a nyelv alapú megjelenítéshez
    def get_title(self, lang="hu"):
        return self.title_en if lang == "en" and self.title_en else self.title_hu

    def get_description(self, lang="hu"):
        return self.description_en if lang == "en" and self.description_en else self.description_hu
