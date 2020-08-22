from django.shortcuts import render, redirect
from json import loads, dumps

from django.http import HttpResponse


def render_app(request):
    return render(request, 'index.html')


def redirect_app(request):
    return redirect('/app')
