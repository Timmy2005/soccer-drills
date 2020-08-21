import django_heroku

from .base import *

DEBUG = True

ROOT_PATH = os.path.dirname(__file__)

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

ALLOWED_HOSTS = ['localhost', '0.0.0.0', '127.0.0.1']

django_heroku.settings(locals())

print(PROJECT_ROOT)

STATIC_ROOT = os.path.join(PROJECT_ROOT, '../staticfiles')
# STATICFILES_DIRS = [os.path.join(BASE_DIR, '../static')]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, '../../static'),
)

# print(STATICFILES_DIRS)
