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
from django.utils.html import escape
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
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', 'Névtelen')
            user_email = data.get('email')
            subject = data.get('subject', 'Weboldal üzenet')
            message = data.get('message', '')

            api_key = getattr(settings, 'BREVO_API_KEY', None)
            if not api_key:
                logger.error("BREVO_API_KEY nincs beállítva (local_settings).")
                return JsonResponse(
                    {'error': 'Az üzenetküldés nincs konfigurálva a szerveren.'},
                    status=503,
                )

            headers = {
                "api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            safe_name = escape(str(name))
            safe_subject = escape(str(subject))
            safe_message = escape(str(message))
            safe_user_email = escape(str(user_email)) if user_email else ""

            # 1. EMAIL NEKED (Admin értesítés)
            admin_resp = requests.post(
                "https://api.brevo.com/v3/smtp/email",
                headers=headers,
                json={
                    "sender": {"name": "Revfalvi Art Rendszer", "email": SENDER_EMAIL},
                    "to": [{"email": SENDER_EMAIL}],
                    "subject": f"ÚJ ÜZENET: {subject}",
                    "htmlContent": (
                        "<h3>Új kapcsolatfelvétel</h3>"
                        f"<p><b>Név:</b> {safe_name}</p>"
                        f"<p><b>Email:</b> {safe_user_email}</p>"
                        f"<p><b>Üzenet:</b> {safe_message}</p>"
                    ),
                },
                timeout=10,
            )
            admin_resp.raise_for_status()

            # 2. EMAIL AZ ÜGYFÉLNEK (Visszaigazolás)
            if user_email:
                client_resp = requests.post(
                    "https://api.brevo.com/v3/smtp/email",
                    headers=headers,
                    json={
                        "sender": {"name": "Révfalvi Péter", "email": SENDER_EMAIL},
                        "to": [{"email": user_email}],
                        "subject": "Köszönöm a megkeresést – Revfalvi Art",
                        "htmlContent": f"""
                            <p>Kedves {safe_name}!</p>
                            <p>Köszönöm, hogy írtál! Megkaptam az üzenetedet a következő témában: <b>{safe_subject}</b>.</p>
                            <p>Hamarosan jelentkezem a válaszommal!</p>
                            <br>
                            <p>Üdvözlettel,<br>Révfalvi Péter<br><a href="https://revfalvi-art.hu">revfalvi-art.hu</a></p>
                        """,
                    },
                    timeout=10,
                )
                client_resp.raise_for_status()

            return JsonResponse({'status': 'success'})

        except requests.HTTPError as e:
            detail = ""
            if e.response is not None:
                try:
                    detail = e.response.json()
                except ValueError:
                    detail = e.response.text[:500]
            logger.error("Brevo API hiba: %s %s", e, detail)
            return JsonResponse(
                {'error': 'Az e-mail küldése sikertelen. Próbáld újra később.'},
                status=502,
            )
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Érvénytelen kérés.'}, status=400)
        except Exception as e:
            logger.error(f"Szerver hiba: {str(e)}")
            return JsonResponse({'error': 'Belső szerverhiba történt.'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

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