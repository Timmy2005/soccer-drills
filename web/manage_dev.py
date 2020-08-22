#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings.dev')
    os.environ['DATABASE_NAME'] = 'soccerdrills'
    os.environ['DATABASE_USER'] = 'timothy'
    os.environ['DATABASE_PASSWORD'] = 'password'
    os.environ['DATABASE_HOST'] = 'localhost'
    os.environ['DATABASE_PORT'] = '5432'

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
