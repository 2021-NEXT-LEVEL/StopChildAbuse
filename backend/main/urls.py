from django.urls import path

from . import views

urlpatterns = [
    path('user/request/', views.CreateRequest.as_view()),
    path('user/result/', views.showRequestList.as_view()),
    path('user/result/<int:postID>/', views.showRequest.as_view()),
    path('master/checkRequest/', views.checkRequest.as_view()),
    path('master/checkRequest/<int:postID>/', views.confirmRequest.as_view()),
]