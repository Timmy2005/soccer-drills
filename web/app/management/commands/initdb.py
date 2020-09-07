from django.core.management.base import BaseCommand, CommandError

import django
from django.contrib.auth import get_user_model

django.setup()

from app.models import Session, Group, UserSettings


class Command(BaseCommand):
    help = 'Creates user timmyc181 with a base group and sessions'

    def handle(self, *args, **options):
        links = ['https://www.facebook.com/318748909507/videos/649968942464224',
                 'https://www.facebook.com/318748909507/videos/2612971758972997/',
                 'https://www.facebook.com/318748909507/videos/498942800766464/',
                 'https://www.facebook.com/318748909507/videos/527572888153782/',
                 'https://www.facebook.com/318748909507/videos/926772904410122/',
                 'https://www.facebook.com/318748909507/videos/2574431759464489/',
                 'https://www.facebook.com/318748909507/videos/247198643102613/',
                 'https://www.facebook.com/318748909507/videos/1588663631296750/',
                 'https://www.facebook.com/318748909507/videos/2665635223721596/',
                 'https://www.facebook.com/318748909507/videos/2669484819990940/',
                 'https://www.facebook.com/318748909507/videos/535514280498748/',
                 'https://www.facebook.com/318748909507/videos/3697736870267369/',
                 'https://www.facebook.com/318748909507/videos/705004410305115/',
                 'https://www.facebook.com/318748909507/videos/3025730300817570/',
                 'https://www.facebook.com/318748909507/videos/222023952224132/',
                 'https://www.facebook.com/318748909507/videos/659991487900808/',
                 'https://www.facebook.com/318748909507/videos/629913900921785/',
                 'https://www.facebook.com/318748909507/videos/2911103542318651/',
                 'https://www.facebook.com/318748909507/videos/836336946858397/',
                 'https://www.facebook.com/318748909507/videos/245310483493661/',
                 'https://www.facebook.com/318748909507/videos/251541702868527/',
                 'https://www.facebook.com/318748909507/videos/2614751715434132/',
                 'https://www.facebook.com/318748909507/videos/165132848228069/',
                 'https://www.facebook.com/318748909507/videos/184435959355973/',
                 'https://www.facebook.com/318748909507/videos/244576203543813/',
                 'https://www.facebook.com/318748909507/videos/276445793512600/',
                 'https://www.facebook.com/318748909507/videos/710323713052933/',
                 'https://www.facebook.com/318748909507/videos/246632956586240/',
                 'https://www.facebook.com/318748909507/videos/556846081927489/',
                 'https://www.facebook.com/318748909507/videos/171019884353180/'
                 ]

        user_model = get_user_model()

        username = 'timmyc181'

        user = user_model.objects.filter(
            username=username
        ).first()

        if not user:
            user = user_model.objects.create_superuser(
                username=username,
                password='Memory6681'
            )

        user_settings = UserSettings()
        user_settings.user = user
        user_settings.dark_theme = True
        user_settings.save()

        group = Group()
        group.name = 'Test 1'
        group.user = user
        group.save()

        session = Session()
        session.user = user
        session.group = group
        session.link = 'http://www.google.com'
        session.index = 0
        session.save()

        session = Session()
        session.user = user
        session.group = group
        session.link = 'http://www.google.com'
        session.index = 1
        session.save()

        session = Session()
        session.user = user
        session.group = group
        session.link = 'http://www.google.com'
        session.index = 2
        session.save()

        session = Session()
        session.user = user
        session.group = group
        session.link = 'http://www.google.com'
        session.index = 3
        session.save()

        group = Group()
        group.name = 'Test 2'
        group.user = user
        group.save()

        group = Group()
        group.name = 'Test 3'
        group.user = user
        group.save()

        group = Group()
        group.name = 'Soccer Drills'
        group.user = user
        group.save()

        index = 0

        for link in links:
            session = Session()
            session.user = user
            session.group = group
            session.link = link
            session.index = index
            session.save()

            index += 1
