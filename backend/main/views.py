from django.shortcuts import render, redirect
from rest_framework import generics
from .models import User, OutputVideo, Request, Video
from django.http.response import HttpResponse
import json

# Create your views here.
def CheckLogin(request):
    data = json.loads(request.body)
    if request.method == 'POST':
        email = data['email']
        password = data['password']
        print("email" + email)
        print("password" + password)
        return HttpResponse('login')

def CreateUser(request):
    data = json.loads(request.body)
    if request.method == 'POST':
        user = User()
        user.email = data['email']
        user.password = data['password']
        user.name = data['name']
        user.phone = data['phone']
        user.child_name = data['child_name']
        user.save()
        return redirect('register')
        