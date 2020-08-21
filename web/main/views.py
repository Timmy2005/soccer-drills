from django.shortcuts import render
from json import loads, dumps

from django.http import HttpResponse


def main_page(request):
    response = dumps({
        'status': 'ok'
    })
    return render(request, 'index.html')
