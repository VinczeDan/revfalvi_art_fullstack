# Restored migration (was missing from repo; required by 0004 → 0005 chain)

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_painting"),
    ]

    operations = [
        migrations.CreateModel(
            name="News",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title_hu",
                    models.CharField(max_length=200, verbose_name="Cím (magyar)"),
                ),
                (
                    "title_en",
                    models.CharField(
                        blank=True,
                        max_length=200,
                        null=True,
                        verbose_name="Cím (angol)",
                    ),
                ),
                ("content_hu", models.TextField(verbose_name="Tartalom (magyar)")),
                (
                    "content_en",
                    models.TextField(
                        blank=True, null=True, verbose_name="Tartalom (angol)"
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="news_images/",
                        verbose_name="Képfájl",
                    ),
                ),
                (
                    "publication_date",
                    models.DateField(auto_now_add=True, verbose_name="Dátum"),
                ),
            ],
            options={
                "ordering": ["-publication_date"],
                "verbose_name_plural": "Hírek",
            },
        ),
        migrations.CreateModel(
            name="Course",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title_hu",
                    models.CharField(max_length=200, verbose_name="Cím (magyar)"),
                ),
                (
                    "title_en",
                    models.CharField(
                        blank=True,
                        max_length=200,
                        null=True,
                        verbose_name="Cím (angol)",
                    ),
                ),
                (
                    "description_hu",
                    models.TextField(verbose_name="Leírás (magyar)"),
                ),
                (
                    "description_en",
                    models.TextField(
                        blank=True, null=True, verbose_name="Leírás (angol)"
                    ),
                ),
                (
                    "level",
                    models.CharField(
                        choices=[
                            ("beginner", "Kezdő"),
                            ("advanced", "Haladó"),
                            ("all", "Minden szint"),
                        ],
                        default="all",
                        max_length=20,
                        verbose_name="Szint",
                    ),
                ),
                (
                    "duration",
                    models.CharField(
                        max_length=100,
                        help_text="Pl. 8 alkalom",
                        verbose_name="Időtartam",
                    ),
                ),
                (
                    "price",
                    models.CharField(
                        max_length=100,
                        help_text="Pl. 35 000 Ft",
                        verbose_name="Ár",
                    ),
                ),
                (
                    "icon",
                    models.CharField(
                        blank=True,
                        default="🎨",
                        max_length=32,
                        verbose_name="Ikon (emoji)",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(default=True, verbose_name="Aktív"),
                ),
                (
                    "order",
                    models.PositiveIntegerField(default=0, verbose_name="Sorrend"),
                ),
            ],
            options={
                "ordering": ["order"],
                "verbose_name": "Tanfolyam",
                "verbose_name_plural": "Tanfolyamok",
            },
        ),
        migrations.CreateModel(
            name="Video",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title_hu",
                    models.CharField(max_length=200, verbose_name="Cím (magyar)"),
                ),
                (
                    "title_en",
                    models.CharField(
                        blank=True,
                        max_length=200,
                        null=True,
                        verbose_name="Cím (angol)",
                    ),
                ),
                (
                    "description_hu",
                    models.TextField(
                        blank=True, null=True, verbose_name="Leírás (magyar)"
                    ),
                ),
                (
                    "description_en",
                    models.TextField(
                        blank=True, null=True, verbose_name="Leírás (angol)"
                    ),
                ),
                (
                    "video_file",
                    models.FileField(
                        help_text="MP4 formátum ajánlott",
                        upload_to="videos/",
                        verbose_name="Videófájl",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Feltöltve"
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(default=True, verbose_name="Aktív"),
                ),
                (
                    "order",
                    models.PositiveIntegerField(default=0, verbose_name="Sorrend"),
                ),
            ],
            options={
                "ordering": ["order", "-created_at"],
                "verbose_name": "Videó",
                "verbose_name_plural": "Videók",
            },
        ),
    ]
