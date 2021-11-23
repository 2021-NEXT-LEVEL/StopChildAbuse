from rest_framework import serializers
from .models import OutputVideo, Request, User

class OutputVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputVideo
        fields = (
            'output_id',
            'request_id',
            'input_souce',
            'output_source',
            'count_child',
            'selectnum',
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
            'reject_reason',
            'check',
            'selectnum',
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
