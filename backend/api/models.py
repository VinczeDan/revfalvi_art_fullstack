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

    title = models.CharField(max_length=200, verbose_name="Cím")
    description = models.TextField(verbose_name="Leírás")
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
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Festmény"
        verbose_name_plural = "Festmények"