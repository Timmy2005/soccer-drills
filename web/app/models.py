from django.db import models


class Links(models.Model):
    link_id = models.AutoField(primary_key=True)
    link = models.TextField()
