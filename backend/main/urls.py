from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.CheckLogin, name = 'login'),
    path('register/', views.CreateUser, name = 'register'),
]