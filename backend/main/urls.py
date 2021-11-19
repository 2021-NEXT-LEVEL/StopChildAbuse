from django.urls import path

from . import views

urlpatterns = [
    path('user/request', views.CreateRequest.as_view()),
    path('user/result', views.showRequestList.as_view()),
    path('user/result/<str:postID>', views.showRequest.as_view()),
    path('admin/checkRequest', views.checkRequest.as_view()),
    path('admin/checkRequest/<str:postID>', views.confirmRequest.as_view()),
]