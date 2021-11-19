from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from rest_framework import generics
from .models import User, OutputVideo, Request, Video
from django.http.response import  JsonResponse
from .serializers import OutputVideoSerializer, RequestSerializer, VideoSerializer
import json

# Create your views here.
class CheckLogin(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        queryset = User.objects.filter(email=email)  # user_id에 위에서 얻어온 id값이 들어가야 함
        if queryset:
            if queryset.values()[0].get('password') == password:
                return JsonResponse({'message' : '로그인 성공', 'data' : queryset.values()[0]}, status = 200)
        # id 존재하지 않음
        return JsonResponse({'message' : '아이디 혹은 비밀번호가 올바르지 않습니다'}, status= 200)
        
class CreateNewUser(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        user = User()
        user.email = data['email']
        if User.objects.filter(email = data['email']).exists():
            return JsonResponse({'message' : '이미 가입된 이메일입니다.'}, status = 200)
        user.password = data['password']
        user.name = data['name']
        user.phone = data['phone']
        user.child_name = data['child_name']
        user.save()
        return JsonResponse({'message': '회원가입 성공'}, status = 200)

class CreateRequest(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        req = Request()
        req.user_id = data['session_id']
        req.request_date = data['request_date']
        req.center_name = data['center_name']
        req.date = data['date']
        req.child_name = data['child_name']
        req.request_reason = data['request_reason']
        req.process_state = data['process_state']
        req.check = data['check']
        req.save()
        return JsonResponse({'message' : '게시글이 정상적으로 작성되었습니다.'}, status = 200)

#사용자의 전체 요청 기록 리스트
class showRequestList(generics.ListCreateAPIView): 
    def post(self, request):
        data = json.loads(request.body)
        queryset = Request.objects.filter(user_id=data['session_id'])
        return JsonResponse(list(queryset.values()), status = 200, safe = False)

#사용자 요청 기록
class showRequest(generics.CreateAPIView):
    def post(self, request, postID = False):
        data = json.loads(request.body)
        queryset = Request.objects.filter(user_id=data['session_id'])
        post_num = self.kwargs['postID']
        return JsonResponse(queryset.values()[post_num - 1], status = 200)


#전체 사용자의 요청 기록 리스트
class checkRequest(generics.ListCreateAPIView):
    def get(self, request):
        queryset = Request.objects.all()
        return JsonResponse(list(queryset.values()), status = 200, safe = False)

#사용자 요청 기록 승인 및 거부
class confirmRequest(generics.CreateAPIView):
    QuerySet = ''