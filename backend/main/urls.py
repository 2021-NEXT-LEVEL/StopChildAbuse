from django.urls import path

from . import views

urlpatterns = [
    path('user/request/', views.CreateNewUser.as_view()),
    path('user/result/'),
    path('admin/checkRequest/'),
    path('admin/result/')
]