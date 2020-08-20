from .base import *

DEBUG = True

# ALLOWED_HOSTS = ['http://127.0.0.1:8000/']

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../static'),
)
