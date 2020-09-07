import random

from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth import get_user_model

class Session(models.Model):
    session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.TextField()
    index = models.IntegerField()
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    name = models.TextField(default=None, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'group'])
        ]
        ordering = ['index']


class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    last_completed_index = models.IntegerField(default=0)
    description = models.TextField(default=None, null=True)

    def get_amount_of_sessions(self):
        return Session.objects.filter(
            group=self.group_id
        ).count()

    amount_of_sessions = property(get_amount_of_sessions)

    class Meta:
        indexes = [
            models.Index(fields=['user'])
        ]


def generate_color():
    colors = [
        '#e91e63',
        '#880e4f',
        '#9c27b0',
        '#0d47a1',
        '#29b6f6',
        '#00c853',
        '#ff9800',
        '#f4511e',
        '#f44336',
        '#7b1fa2',
    ]
    return colors[random.randrange(0, len(colors) - 1)]


class UserSettings(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    dark_theme = models.BooleanField(default=False)
    selected_group = models.ForeignKey(Group, default=None, null=True, on_delete=models.SET_NULL)
    icon_color = models.TextField(default=None, null=True)

    def get_icon_text(self):
        user = get_user_model().objects.get(
            username=self.user.username
        )
        return user.first_name[0] if user.first_name else user.username[0]

    icon_text = property(get_icon_text)

    def save(self, *args, **kwargs):
        if not self.icon_color:
            self.icon_color = generate_color()
        return super().save(*args, **kwargs)


class GroupProgress(models.Model):
    completed_group_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    last_modified = models.DateTimeField(auto_now=True),
    started = models.DateTimeField(auto_now_add=True),
    group_index = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['user'])
        ]

    def save(self, *args, **kwargs):
        if not self.group_index:
            self.group_index = self.get_group_index()
        return super().save(*args, **kwargs)

    def get_group_index(self):
        last_group_completed = GroupProgress.objects.filter(
            user=self.user,
            group=self.group
        ).last()
        if last_group_completed:
            last_group_index = last_group_completed.group_index
        else:
            last_group_index = 0
        return last_group_index + 1


class SessionCompleted(models.Model):
    completed_session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    group_progress = models.ForeignKey(GroupProgress, on_delete=models.CASCADE)
    date_completed = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'group_progress'])
        ]
        ordering = ['session__index']
