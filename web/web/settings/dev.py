from .base import *

DEBUG = True

STATIC_URL = 'http://localhost:8080/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../static'),
)
