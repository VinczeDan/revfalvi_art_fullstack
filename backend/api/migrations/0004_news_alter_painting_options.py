# Restored migration (was missing from repo; 0005_newsimage depends on this)

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_news"),
    ]

    operations = [
        migrations.RenameField(
            model_name="painting",
            old_name="title",
            new_name="title_hu",
        ),
        migrations.RenameField(
            model_name="painting",
            old_name="description",
            new_name="description_hu",
        ),
        migrations.AlterField(
            model_name="painting",
            name="title_hu",
            field=models.CharField(max_length=200, verbose_name="Cím (magyar)"),
        ),
        migrations.AlterField(
            model_name="painting",
            name="description_hu",
            field=models.TextField(verbose_name="Leírás (magyar)"),
        ),
        migrations.AddField(
            model_name="painting",
            name="title_en",
            field=models.CharField(
                blank=True,
                max_length=200,
                null=True,
                verbose_name="Cím (angol)",
            ),
        ),
        migrations.AddField(
            model_name="painting",
            name="description_en",
            field=models.TextField(
                blank=True, null=True, verbose_name="Leírás (angol)"
            ),
        ),
        migrations.AlterModelOptions(
            name="painting",
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.AlterModelOptions(
            name="news",
            options={
                "ordering": ["-publication_date"],
                "verbose_name_plural": "Hírek",
            },
        ),
    ]
