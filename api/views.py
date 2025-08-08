from rest_framework import viewsets
from .models import Todo, Painting
from .serializers import TodoSerializer, PaintingSerializer 
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
import json

@csrf_exempt
def send_contact_email(request):
    if request.method == 'POST':
        try:
            # Debug log
            print("Request received:", request.body)
            
            data = json.loads(request.body)
            
            # Validáció
            required_fields = ['name', 'email', 'subject', 'message']
            for field in required_fields:
                if not data.get(field):
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
                from_email='daniel.vincze15@gmail.com', 
                to=['daniel.vincze15@gmail.com'],  # IDE ÉRKEZZEN
                reply_to=[data.get('email')],
                headers={'Content-Type': 'text/plain; charset=utf-8'},
            )
            
            email.send(fail_silently=False)
            return JsonResponse({'status': 'success'})
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Érvénytelen JSON formátum'}, status=400)
        except Exception as e:
            print("Error sending email:", str(e))
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Csak POST kérés engedélyezett'}, status=405)


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
        technique = self.request.query_params.get('technique', None)
        if technique:
            queryset = queryset.filter(technique=technique)
        return queryset