from rest_framework import serializers

from app.models import Session, Group, UserSettings
from django.contrib.auth.models import User


class GroupSerializer(serializers.ModelSerializer):
    groupId = serializers.IntegerField(source='group_id')
    name = serializers.CharField()
    dateCreated = serializers.DateTimeField(source='date_created')
    amountOfSessions = serializers.IntegerField(source='amount_of_sessions')
    username = serializers.CharField(source='user.username')
    description = serializers.CharField()

    class Meta:
        model = Group
        fields = (
            'groupId',
            'name',
            'dateCreated',
            'amountOfSessions',
            'username',
            'description'
        )


class SessionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='session_id')
    link = serializers.CharField()
    index = serializers.IntegerField()
    name = serializers.CharField()

    class Meta:
        model = Session
        fields = (
            'id',
            'link',
            'index',
            'name'
        )


class SessionCompletedSerializer(serializers.ModelSerializer):
    completedSessionId = serializers.IntegerField(source='completed_session_id')
    index = serializers.IntegerField(source='session.index')
    id = serializers.IntegerField(source='session.session_id')

    class Meta:
        model = Session
        fields = (
            'completedSessionId',
            'index',
            'id'
        )


class UserSettingsSerializer(serializers.ModelSerializer):
    iconColor = serializers.CharField(source='icon_color')
    iconText = serializers.CharField(source='icon_text')

    class Meta:
        model = UserSettings
        fields = (
            'iconColor',
            'iconText'
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')
