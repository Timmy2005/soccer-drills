from django.shortcuts import render
from json import loads, dumps

from django.http import HttpResponse


def main_page(request):
    return render(request, 'index.html')
