from django.shortcuts import render
from json import loads, dumps
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth import logout
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User


@ensure_csrf_cookie
def login_page(request):
    return render(request, 'login.html')


def login_user(request):
    json = loads(request.body.decode('utf-8'))

    username = json['username']
    password = json['password']

    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            login(request, user)
            print('authenticated')
            response = dumps({
                'login': 'valid',
                'url': '/app'
            })
            return HttpResponse(response)

    response = dumps({
        'login': 'invalid'
    })

    return HttpResponse(response)


def register_user(request):
    json = loads(request.body.decode('utf-8'))

    username = json['username']
    password = json['password']

    username_taken = get_user_model().objects.filter(username=username)

    if not username_taken:
        new_user = User.objects.create_user(username, None, password)
        new_user.save()
        login(request, new_user)

        response = dumps({
            'registration': 'valid',
            'url': '/app'
        })
        return HttpResponse(response)

    response = dumps({
        'registration': 'invalid'
    })

    return HttpResponse(response)