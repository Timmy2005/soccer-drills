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
    # Locations
    path('', app_views.redirect_app),
    re_path(r'^app/', login_required(app_views.render_app)),
    path('login/', login_views.login_page),
    path('register/', login_views.login_page),

    # Auth
    path('login-user/', login_views.login_user),
    path('register-user/', login_views.register_user),
    path('logout-user/', login_views.logout_user),

    # Home
    path('get-sessions/', login_required(app_views.get_sessions_by_selected_group)),
    path('select-new-group/', login_required(app_views.select_new_group)),
    path('session-completed/', login_required(app_views.session_completed)),

    # Groups
    path('get-groups/', login_required(app_views.get_groups)),
    path('create-group/', login_required(app_views.create_group)),
    path('get-editable-group/', login_required(app_views.get_editable_group)),
    path('save-group/', login_required(app_views.save_group)),

    # Config
    path('set-dark-theme/', login_required(app_views.set_dark_theme)),
    path('get-user-settings/', login_required(app_views.get_user_settings))
]
