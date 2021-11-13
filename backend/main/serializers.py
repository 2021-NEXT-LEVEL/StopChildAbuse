from rest_framework import serializers
from .models import OutputVideo, Request, User, Video

class OutputVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputVideo
        fields = (
            'output_id',
            'request_id',
            'video_id',
            'output_source',
            'decoding_key',
        )

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = (
            'request_id',
            'user_id',
            'user_name',
            'request_date',
            'center_name',
            'date',
            'child_name',
            'request_reason',
            'process_state',
            'check',
        )    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id',
            'email',
            'password',
            'name',
            'phone',
            'child_name',
        )   

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = (
            'video_id',
            'center_name',
            'date',
        )   