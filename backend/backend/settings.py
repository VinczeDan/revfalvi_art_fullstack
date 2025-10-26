from pathlib import Path
import os
import sys
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Default values (felülírható a local_settings.py-ban)
DEBUG = True
ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = []
SECRET_KEY = 'django-insecure-a8yjq+-+(oh-tcnwrorii&l18j5iiakij%7!@6@h^m4v7!@*g!'
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'OPTIONS']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
    'ckeditor',
    'ckeditor_uploader',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

REACT_BUILD_DIR = os.path.join(BASE_DIR.parent, 'frontend', 'dist')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [REACT_BUILD_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    REACT_BUILD_DIR
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
CKEDITOR_UPLOAD_PATH = "uploads/"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


DEFAULT_FROM_EMAIL = "no-reply@example.com"
DEFAULT_TO_EMAIL = "info@example.com"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "localhost"
EMAIL_PORT = 25
EMAIL_USE_TLS = False
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""



# --- Local settings import ---
try:
    import local_settings

    DEBUG = getattr(local_settings, 'DEBUG', DEBUG)
    ALLOWED_HOSTS = getattr(local_settings, 'ALLOWED_HOSTS', ALLOWED_HOSTS)
    CORS_ALLOWED_ORIGINS = getattr(local_settings, 'CORS_ALLOWED_ORIGINS', CORS_ALLOWED_ORIGINS)

    HOL_VAGYOK = getattr(local_settings, 'HOL_VAGYOK', None)

    if HOL_VAGYOK == 'otthon':
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }
    elif HOL_VAGYOK == 'droplet':
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': local_settings.DB_NAME,
                'USER': local_settings.DB_USER,
                'PASSWORD': local_settings.DB_PASSWORD,
                'HOST': local_settings.DB_HOST,
                'PORT': '',
            }
        }
except ImportError:
    print("local_settings nem található!")
