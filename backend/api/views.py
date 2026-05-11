from rest_framework import viewsets
from .models import Todo, Painting, News, Course, Video
from .serializers import TodoSerializer, PaintingSerializer, NewsSerializer, CourseSerializer, VideoSerializer
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
import logging
from django.conf import settings
import requests



logger = logging.getLogger(__name__)
BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
SENDER_EMAIL = "daniel.vincze15@gmail.com"


def send_brevo_email(subject, html_content, to_email):
    """Segédfüggvény a Brevo API híváshoz"""
    headers = {
        "api-key": settings.BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    data = {
        "sender": {
            "name": "Revfalvi Art",
            "email": settings.DEFAULT_FROM_EMAIL,
        },
        "to": [
            {"email": to_email}
        ],
        "subject": subject,
        "htmlContent": html_content,
    }

    response = requests.post(BREVO_API_URL, json=data, headers=headers, timeout=10)
    response.raise_for_status()
    return response

@csrf_exempt
def send_contact_email(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            subject = data.get("subject")
            message = data.get("message")

            full_message = f"Feladó: {name} ({email})\n\nTárgy: {subject}\n\nÜzenet:\n{message}"

            send_mail(
                subject=f"Weboldal üzenet: {subject}",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            return JsonResponse({"status": "success", "message": "Email sikeresen elküldve!"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse({"error": "Invalid method"}, status=405)

def index_view(request):
    return render(request, 'index.html')


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class PaintingViewSet(viewsets.ModelViewSet):
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        technique = self.request.query_params.get("technique")
        if technique:
            queryset = queryset.filter(technique=technique)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(is_active=True) # Csak az aktívakat mutatjuk
    serializer_class = CourseSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        # Átadjuk a nyelvet a frontendtől (ha küldi), alapértelmezett a 'hu'
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context



def send_test_email(request):
    subject = "Teszt email a Revfalvi Art weboldalról"
    message = "Ez egy teszt email, hogy ellenőrizzük a SendGrid SMTP beállításokat."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [settings.DEFAULT_TO_EMAIL]

    try:
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        return JsonResponse({"status": "success", "message": "Email elküldve"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})
# views.py-hoz add hozzá (ne felejtsd el importálni a Videót és a VideoSerializert az elején!)



class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_active=True)
    serializer_class = VideoSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context
