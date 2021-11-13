from django.db import models

# Create your models here.
class OutputVideo(models.Model):
    output_id = models.IntegerField(primary_key=True)
    request_id = models.IntegerField()
    video_id = models.IntegerField()
    output_source = models.CharField(max_length=100)
    decoding_key = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'output_video'


class Request(models.Model):
    request_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    user_name = models.CharField(max_length=20)
    request_date = models.DateField()
    center_name = models.CharField(max_length=20)
    date = models.DateField()
    child_name = models.CharField(max_length=20)
    request_reason = models.CharField(max_length=200)
    process_state = models.IntegerField()
    check = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'request'


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    child_name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'user'


class Video(models.Model):
    video_id = models.IntegerField(primary_key=True)
    center_name = models.CharField(max_length=20)
    date = models.DateField()

    class Meta:
        managed = False
        db_table = 'video'