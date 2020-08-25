from rest_framework import serializers

from app.models import Session, Group


class GroupSerializer(serializers.ModelSerializer):
    groupId = serializers.IntegerField(source='group_id')
    name = serializers.CharField()
    dateCreated = serializers.DateTimeField(source='date_created')
    amountOfSessions = serializers.IntegerField(source='amount_of_sessions')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Group
        fields = (
            'groupId',
            'name',
            'dateCreated',
            'amountOfSessions',
            'username'
        )


class SessionSerializer(serializers.ModelSerializer):
    sessionId = serializers.IntegerField(source='session_id')
    link = serializers.CharField()
    index = serializers.IntegerField()

    class Meta:
        model = Session
        fields = (
            'sessionId',
            'link',
            'index'
        )
