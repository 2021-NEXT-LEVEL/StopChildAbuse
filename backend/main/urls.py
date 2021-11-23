from django.urls import path

from . import views

urlpatterns = [
    path('user/request/', views.CreateRequest.as_view()),
    path('user/result/', views.showRequestList.as_view()),
    path('user/result/<int:postID>/', views.showRequest.as_view()),
    path('master/checkRequest/', views.requestList.as_view()),
    path('master/checkRequest/<int:postID>/', views.checkedRequest.as_view()),
    path('master/rejectRequest/<int:postID>/', views.rejectRequest.as_view()),
    path('master/allowRequest/', views.allowRequest.as_view()),
]