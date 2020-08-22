#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings.prod')
    os.environ['DATABASE_NAME'] = 'd7oboenla6ts9s'
    os.environ['DATABASE_USER'] = 'fwgycbugypcfnn'
    os.environ['DATABASE_PASSWORD'] = '83843958ff9ed50d1f274eba25d98c5ffa717e2e311780e053c3edb3fba7cef3'
    os.environ['DATABASE_HOST'] = 'ec2-54-158-122-162.compute-1.amazonaws.com'
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
