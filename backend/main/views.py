from django.db.models import query
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from rest_framework import generics
from .models import User, OutputVideo, Request
from django.http.response import  JsonResponse
from .crypto import AESCipher
import json

# Create your views here.
# 로그인
class CheckLogin(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        queryset = User.objects.filter(email=email)  # user_id에 위에서 얻어온 id값이 들어가야 함
        if queryset:
            if queryset.values()[0].get('password') == password:
                return JsonResponse({'message' : 'success', 'data' : queryset.values()[0]}, status = 200)
        # id 존재하지 않음
        return JsonResponse({'message' : 'incorrect'}, status= 200)

# 회원가입
class CreateNewUser(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        user = User()
        user.email = data['email']
        if User.objects.filter(email = data['email']).exists():
            return JsonResponse({'message' : 'duplication'}, status = 200)
        user.password = data['password']
        user.name = data['name']
        user.phone = data['phone']
        user.child_name = data['child_name']
        user.save()
        return JsonResponse({'message': 'success'}, status = 200)

# 사용자의 요청글 작성
class CreateRequest(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        req = Request()
        req.user_id = data['session_id']
        req.user_name = data['user_name']
        req.request_date = data['request_date']
        req.center_name = data['center_name']
        req.date = data['date']
        req.child_name = data['child_name']
        req.request_reason = data['request_reason']
        req.process_state = data['process_state']
        req.check = data['check']
        req.save()
        return JsonResponse({'message' : 'success'}, status = 200)

#사용자의 전체 요청 기록 리스트
class showRequestList(generics.ListCreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        queryset = Request.objects.filter(user_id=data['session_id'])
        return JsonResponse(list(queryset.values()), status = 200, safe = False)

#사용자 요청 기록 조회
class showRequest(generics.CreateAPIView):
    def post(self, request, postID = False):
        data = json.loads(request.body)
        queryset = Request.objects.filter(user_id=data['session_id'])
        # 복호화키 찾아서 front 넘겨주기. output_video 테이블에서 request_id 로 찾아서 넘겨주면 될듯
        post_num = self.kwargs['postID']
        if queryset.values()[post_num - 1]['check'] == 1: # 승인
            key = '123456789012345'
            message = str(queryset.values()[post_num - 1]['selectnum'])
            aes = AESCipher(key)
            encrypt = aes.encrypt(message) # encrypt = 8172awefvawef==
            return JsonResponse({'req' : queryset.values()[post_num - 1], 'encrypt' : encrypt}, status = 200) # 추가로 암호화 키 넘겨주기
        else: # 거부 혹은 승인 요청
            return JsonResponse({'req' : queryset.values()[post_num - 1]}, status = 200)

# 사용자 암호 입력
class userDecode(generics.CreateAPIView):
    def post(self, request):
            data = json.loads(request.body)
            input = str(data['input'])
            request_id = data['request_id']

            key = '123456789012345'
            aes = AESCipher(key)
            decrypt = aes.decrypt(input) # decrypt = selectNum

            queryset_video = OutputVideo.objects.filter(request_id=request_id, selectnum=int(decrypt))
            if queryset_video:
                return JsonResponse({'message': 'correct', 'video': queryset_video.values()[0]}, status = 200)
            else:
                return JsonResponse({'message': 'incorrect'}, status = 200)


#전체 사용자의 요청 기록 리스트
class requestList(generics.ListCreateAPIView):
    def get(self, request):
        queryset = Request.objects.all()
        # print(queryset.values())
        return JsonResponse(list(queryset.values()), status = 200, safe = False)

#사용자 요청 기록 승인 및 거부
class checkedRequest(generics.CreateAPIView):
    def post(self, request, postID = False):
        queryset_req = Request.objects.all()
        post_num = self.kwargs['postID']
        queryset_video = OutputVideo.objects.filter(request_id=post_num)
        if queryset_video:
            return JsonResponse({'req': queryset_req.values()[post_num - 1], 'video': queryset_video.values()[0]}, status = 200)
        else:
            return JsonResponse({'req': queryset_req.values()[post_num - 1]}, status = 200)

class rejectRequest(generics.CreateAPIView):
    def post(self, request, postID = False):
        data = json.loads(request.body)
        post_num = self.kwargs['postID']
        print(post_num)
        req = Request.objects.get(request_id=post_num)
        req.check = data['check']
        req.reject_reason = data['reject_reason']
        req.save()
        return JsonResponse({}, status = 200)

class allowRequest(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        selectNum = data['selectedNum']
        req = Request.objects.get(request_id=data['request_id'])
        req.selectnum = selectNum
        req.check = data['check']
        req.save()
        return JsonResponse({'message' : 'success'}, status = 200)

class showUserList(generics.ListCreateAPIView):
    def get(self, request):
        queryset = User.objects.all()
        return JsonResponse(list(queryset.values()), status = 200, safe = False)
