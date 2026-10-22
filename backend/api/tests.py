import tempfile

from django.core.files.base import ContentFile
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import Course


class CourseCoverImageApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = Course.objects.create(
            title_hu="Rajztanfolyam",
            description_hu="Kreatív rajzóra",
            duration="8 alkalom",
            price="35 000 Ft",
        )

    def test_courses_include_null_cover_image_url_without_cover(self):
        response = self.client.get("/api/courses/")

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.data[0]["cover_image_url"])

    def test_courses_return_absolute_cover_image_url(self):
        with tempfile.TemporaryDirectory() as media_root:
            with override_settings(MEDIA_ROOT=media_root):
                self.course.cover_image.save(
                    "cover.jpg",
                    ContentFile(b"test image content"),
                    save=True,
                )

                response = self.client.get("/api/courses/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data[0]["cover_image_url"],
            "http://testserver/media/course_covers/cover.jpg",
        )
