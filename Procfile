web: env PYTHONPATH=$PYTHONPATH:$PWD/web gunicorn web.wsgi
release: python manage_prod.py migrate
