from .base import *

DEBUG = True

ROOT_PATH = os.path.dirname(__file__)

ALLOWED_HOSTS = ['localhost', '0.0.0.0', '127.0.0.1']

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATICFILES_DIRS = [os.path.join(BASE_DIR, '../static')]

# print(STATICFILES_DIRS)
