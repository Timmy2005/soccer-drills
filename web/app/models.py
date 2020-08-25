from django.db import models
from django.contrib.auth.models import User


class Session(models.Model):
    session_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.TextField()
    index = models.IntegerField()
    group = models.ForeignKey('Group', on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'group'])
        ]


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


class UserSettings(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    dark_theme = models.BooleanField(default=False)

