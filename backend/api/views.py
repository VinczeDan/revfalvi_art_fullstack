from rest_framework import viewsets
from .models import Todo, Painting
from .serializers import TodoSerializer, PaintingSerializer 
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
import json

import logging
from django.conf import settings

logger = logging.getLogger(__name__)

@csrf_exempt
def send_contact_email(request):
    if request.method == 'POST':
        try:
            logger.info("Email kérés érkezett")
            data = json.loads(request.body)
            logger.debug(f"Feldolgozott adatok: {data}")

            # Validáció
            required_fields = ['name', 'email', 'subject', 'message']
            for field in required_fields:
                if not data.get(field):
                    logger.error(f"Hiányzó mező: {field}")
                    return JsonResponse(
                        {'error': f'Hiányzó kötelező mező: {field}'},
                        status=400
                    )

            email = EmailMessage(
                subject=f"Új üzenet: {data.get('subject')}",
                body=f"""
                Név: {data.get('name')}
                Email: {data.get('email')}
                
                Üzenet:
                {data.get('message')}
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.DEFAULT_FROM_EMAIL],
                reply_to=[data.get('email')],
            )
            
            logger.info("Email küldése megkezdve")
            email.send(fail_silently=False)
            logger.info("Email sikeresen elküldve")
            
            return JsonResponse({'status': 'success'})
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON hiba: {str(e)}")
            return JsonResponse({'error': 'Érvénytelen JSON formátum'}, status=400)
        except Exception as e:
            logger.error(f"Email küldési hiba: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)
    
    logger.warning("Nem POST kérés érkezett")
    return JsonResponse({'error': 'Csak POST kérés engedélyezett'}, status=405)


def index_view(request):
    return render(request, 'index.html')  



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer



# views.py

class PaintingViewSet(viewsets.ModelViewSet):
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        lang = self.request.query_params.get("lang", "hu")  # alapból magyar
        context["lang"] = lang
        return context