"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from app import views as app_views
from login import views as login_views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('', app_views.redirect_app),
    re_path(r'^app/', login_required(app_views.render_app)),

    path('login/', login_views.login_page),
    path('login-user/', login_views.login_user),
    path('register/', login_views.login_page),
    path('register-user/', login_views.register_user),

    path('get-sessions/', app_views.get_sessions_by_group),
    path('get-groups/', app_views.get_groups),

    path('set-dark-theme/', app_views.set_dark_theme)

]
