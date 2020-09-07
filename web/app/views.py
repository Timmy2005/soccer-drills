from json import loads, dumps

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from app.models import Session, Group, UserSettings, GroupProgress, SessionCompleted
from app.serializers import GroupSerializer, SessionSerializer, SessionCompletedSerializer, UserSettingsSerializer, UserSerializer


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


def get_sessions_by_selected_group(request):
    user = request.user

    group = UserSettings.objects.get(
        user=user
    ).selected_group

    groups = Group.objects.filter(
        user=user
    )

    group_serializer = GroupSerializer(groups, many=True)

    if group:
        sessions = Session.objects.filter(
            user=user,
            group=group

        ).order_by(
            'index'
        )

        session_serializer = SessionSerializer(sessions, many=True)
        return JsonResponse({
            'sessions': session_serializer.data,
            'groups': group_serializer.data,
            'selectedGroup': group.group_id,
            'groupProgress': get_group_progress(user, group)
        })
    else:
        return JsonResponse({
            'sessions': None,
            'groups': group_serializer.data
        })


def select_new_group(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    user_settings = UserSettings.objects.get(
        user=user
    )

    user_settings.selected_group = Group.objects.get(
        group_id=json['groupId']
    )
    user_settings.save()

    group = user_settings.selected_group

    sessions = Session.objects.filter(
        user=user,
        group=group

    ).order_by(
        'index'
    )

    session_serializer = SessionSerializer(sessions, many=True)
    return JsonResponse({
        'sessions': session_serializer.data,
        'groupProgress': get_group_progress(user, group)
    })


def get_groups(request):
    user = request.user

    groups = Group.objects.filter(
        user=user
    )

    serializer = GroupSerializer(groups, many=True)
    response = dumps(serializer.data)

    return HttpResponse(response, content_type='application/json')


def create_group(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    group = Group()
    group.user = user
    group.name = json['name']
    group.description = json['description']
    group.save()

    index = 0

    sessions = json['sessions']

    print(sessions)

    for session_details in sessions:
        session = Session()
        session.user = user
        session.group = group
        session.link = session_details['link']
        session.name = session_details['name']
        session.index = index
        session.save()

        index += 1

    serializer = GroupSerializer(group)
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


def get_group_progress(user, group):
    group_progress = GroupProgress.objects.filter(
        user=user,
        group=group
    ).last()

    if group_progress:
        sessions = SessionCompleted.objects.filter(
            user=user,
            group_progress=group_progress
        )

        serializer = SessionCompletedSerializer(sessions, many=True)

        return serializer.data

    else:
        new_group_progress = GroupProgress()
        new_group_progress.user = user
        new_group_progress.group = group
        new_group_progress.save()

        return []


def session_completed(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    group = get_current_group(user)

    group_progress = GroupProgress.objects.filter(
        user=user,
        group=group
    ).last()

    session = Session.objects.get(
        user=user,
        session_id=json['session_id']
    )

    exists = SessionCompleted.objects.filter(
        user=user,
        group_progress=group_progress,
        session=session
    ).first()

    if not exists:
        new_session_completed = SessionCompleted()
        new_session_completed.user = user
        new_session_completed.group_progress = group_progress
        new_session_completed.session = session
        new_session_completed.save()

    sessions_len = group.amount_of_sessions
    completed_sessions_len = len(
        SessionCompleted.objects.filter(
            user=user,
            group_progress=group_progress
        )
    )

    if sessions_len == completed_sessions_len:
        group_progress = GroupProgress()
        group_progress.user = user
        group_progress.group = group
        group_progress.save()

    completed_sessions = SessionCompleted.objects.filter(
        user=user,
        group_progress=group_progress,
    )

    response = SessionCompletedSerializer(completed_sessions, many=True).data

    return JsonResponse(response, safe=False)


def get_current_group(user):
    group = UserSettings.objects.get(
        user=user
    ).selected_group

    return group


def get_editable_group(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    group_id = json['id']

    group = Group.objects.filter(
        user=user,
        group_id=group_id
    ).first()

    if group:
        sessions = Session.objects.filter(
            user=user,
            group=group
        )
        sessions_serializer = SessionSerializer(sessions, many=True)

        return JsonResponse({
            'name': group.name,
            'description': group.description,
            'sessions': sessions_serializer.data
        })

    else:
        return JsonResponse({
            'found': False
        })


def save_group(request):
    user = request.user
    json = loads(request.body.decode('utf-8'))

    group = Group.objects.get(
        user=user,
        group_id=json['id']
    )
    group.name = json['name']
    group.description = json['description']
    group.save()

    sessions = json['sessions']

    Session.objects.filter(
        user=user,
        group=group
    ).delete()

    index = 0

    for session_details in sessions:
        link = session_details['link']
        name = session_details['name']

        session = Session(
            user=user,
            group=group,
            link=link,
            name=name,
            index=index
        )

        index += 1

        session.save()

    return JsonResponse({'status': 'ok'})


def get_user_settings(request):
    user = request.user

    user_settings = UserSettings.objects.get(user=user)

    user_settings_serializer = UserSettingsSerializer(user_settings)
    user_serializer = UserSerializer(user)

    return JsonResponse({
        'userSettings': user_settings_serializer.data,
        'user': user_serializer.data
    })
