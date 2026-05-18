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

# Resend API végpont
RESEND_API_URL = "https://api.resend.com/emails"

def send_resend_email(subject, html_content, to_emails, reply_to_email):
    """Segédfüggvény a Resend API híváshoz HTTP-n keresztül (többes címzett és reply_to támogatással)"""
    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "from": f"Revfalvi Art <{settings.DEFAULT_FROM_EMAIL}>",
        "to": to_emails,                    # Lista az e-mail címekkel
        "reply_to": reply_to_email,         # A látogató e-mail címe, hogy egyből neki lehessen válaszolni
        "subject": subject,
        "html": html_content,
    }

    response = requests.post(RESEND_API_URL, json=data, headers=headers, timeout=5)
    response.raise_for_status()
    return response

@csrf_exempt
def send_contact_email(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    try:
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")  # Ez a látogató e-mail címe
        subject = data.get("subject")
        message = data.get("message")

        if not all([name, email, subject, message]):
            return JsonResponse({"status": "error", "message": "Minden mező kitöltése kötelező!"}, status=400)

        # HTML formátum a szép értesítő levélhez
        html_content = f"""
        <h3>Új üzenet érkezett a weboldalról!</h3>
        <p><strong>Feladó:</strong> {name} ({email})</p>
        <p><strong>Tárgy:</strong> {subject}</p>
        <p><strong>Üzenet:</strong></p>
        <p style="white-space: pre-wrap;">{message}</p>
        """

        # Címzettek beolvasása a local_settings.py-ból
        contact_emails_setting = getattr(settings, 'CONTACT_EMAILS', None)
        if contact_emails_setting:
            # Ha vesszővel elválasztott string, listává alakítjuk
            recipient_list = [e.strip() for e in contact_emails_setting.split(",")]
        else:
            # Régi egyedi e-mail beállítás fallback
            single_email = getattr(settings, 'CONTACT_EMAIL', settings.DEFAULT_FROM_EMAIL)
            recipient_list = [single_email]

        # Ha be van állítva Resend API kulcs, azzal küldjük (ez megy élesben a Dropleten)
        if getattr(settings, 'RESEND_API_KEY', None):
            for egy_email in recipient_list:
                send_resend_email(
                    subject=f"Weboldal üzenet: {subject}",
                    html_content=html_content,
                    to_emails=egy_email,  # Most már egyszerre csak 1 címet kap stringként
                    reply_to_email=email
                )
        else:
            # Helyi fejlesztői környezetben (otthon) a sima konzolos/SMTP fallback
            full_message = f"Feladó: {name} ({email})\n\nTárgy: {subject}\n\nÜzenet:\n{message}"
            send_mail(
                subject=f"Weboldal üzenet: {subject}",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                fail_silently=False,
            )

        return JsonResponse({"status": "success", "message": "Email sikeresen elküldve!"})

    except requests.exceptions.Timeout:
        logger.error("A Resend API időtúllépés miatt megszakadt.")
        return JsonResponse({"status": "error", "message": "A levélküldő szolgáltatás nem válaszol. Kérjük próbálja meg később!"}, status=504)
    except Exception as e:
        logger.error(f"Email küldési hiba: {str(e)}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

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
        # ÍGY A HELYES:
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context


def send_test_email(request):
    subject = "Teszt email a Revfalvi Art weboldalról"
    message = "Ez egy teszt email, hogy ellenőrizzük a beállításokat."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [settings.DEFAULT_TO_EMAIL]

    try:
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        return JsonResponse({"status": "success", "message": "Email elküldve"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_active=True)
    serializer_class = VideoSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['lang'] = self.request.query_params.get('lang', 'hu')
        return context
