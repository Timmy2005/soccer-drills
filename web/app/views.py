from django.shortcuts import render, redirect
from json import loads, dumps
from django.http import HttpResponse
from app.serializers import GroupSerializer, SessionSerializer

from app.models import Session, Group, UserSettings


def render_app(request):
    user = request.user
    user_settings = UserSettings.objects.filter(user=user).first()
    if user_settings:
        dark_theme = user_settings.dark_theme
    else:
        new_user_settings = UserSettings()
        new_user_settings.user = user
        new_user_settings.save()

        dark_theme = new_user_settings.dark_theme
    return render(request, 'index.html', {
        'dark_theme': dark_theme
    })


def redirect_app(request):
    return redirect('/app')


def get_sessions_by_group(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    group = Group.objects.get(
        user=user,
        name=json['group']
    )

    sessions = Session.objects.filter(
        user=user,
        group=group

    ).order_by(
        'index'
    )

    serializer = SessionSerializer(sessions, many=True)
    response = dumps(serializer.data)

    return HttpResponse(response, content_type='application/json')


def get_groups(request):
    user = request.user

    groups = Group.objects.filter(
        user=user
    )

    serializer = GroupSerializer(groups, many=True)
    response = dumps(serializer.data)

    return HttpResponse(response, content_type='application/json')


def set_dark_theme(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    dark_theme = json['dark_theme']
    user_settings = UserSettings.objects.get(user=user)
    user_settings.dark_theme = dark_theme
    user_settings.save()

    response = dumps({
        'status': 'ok'
    })

    return HttpResponse(response, content_type='application/json')
