from django.db import models

# Create your models here.
class OutputVideo(models.Model):
    output_id = models.AutoField(primary_key=True)
    request_id = models.IntegerField()
    input_souce = models.CharField(max_length=50, blank=True, null=True)
    output_source = models.CharField(max_length=50, blank=True, null=True)
    count_child = models.IntegerField()
    selectnum = models.IntegerField(db_column='selectNum', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'output_video'


class Request(models.Model):
    request_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    user_name = models.CharField(max_length=20)
    request_date = models.DateField()
    center_name = models.CharField(max_length=20)
    date = models.DateField()
    child_name = models.CharField(max_length=20)
    request_reason = models.CharField(max_length=200)
    reject_reason = models.CharField(max_length=200, blank=True, null=True)
    check = models.IntegerField()
    selectnum = models.IntegerField(db_column='selectNum', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'request'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    child_name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'user'