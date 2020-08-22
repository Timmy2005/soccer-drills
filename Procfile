web: env PYTHONPATH=$PYTHONPATH:$PWD/web gunicorn web.wsgi
release: python web/manage_prod.py migrate
