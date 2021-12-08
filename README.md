# StopChildAbuse👶🏻

2021 NIA 인공지능 데이터 활용 경진대회 장려상 수상작

The 3rd prize of the 2021 NIA Artificial Intelligence Data Contest


  *'ChildKeeper' is an Automation system for automating mosaic and encryption processing to take out CCTV footage to prevent child abuse in daycare centers.*
 
 ## ⚡TEAM _ NEXT LEVEL⚡
  
  *ChildKeeper started with NEXT LEVEL's hope that child abuse would no longer occur using this automation system.*
  
 
    🙈 Hyewon Kang(Team Leader) : https://github.com/HyewonKkang
    
    🕵🏼‍♀️ Yujung Gil(Team Member) : https://github.com/fairyroad
    
    🎅🏻 Minjeong Kim(Team Member) : https://github.com/kimminje0ng
  
    👩🏻‍🚀 Su-A Jang(Team Member) : https://github.com/sua1223
    


## 🏊🏼‍♂️Tech Stack
### *Version Control*
    Git/Github

### *Frontend*
    Hybrid App : React

### *Backend*
    Framework : Django

### *DB*
    Image Data : MySQL
 
### *Development Environment*
    Visual studio code
    Google colab
    Mac OS Apple Silicon(M1)

    
### *Image Processing*
    Deep Sort
    Yolo v5
    PyTorch 1.7.0
    
### *Encryption*
    OpenCV-python 4.1.2
    Pycryptodome
    


## ❤System Architecture❤
 <p align="center">
   <img src="https://user-images.githubusercontent.com/74306759/143539881-0c9c0fd4-d70f-475a-a514-d70c8ac3a419.png" alt="[YOUR_ALT]"/>
</p>

   *The service development environment is as above. The frontend of the web page used React, the backend used Django, and the database used MySQL. Face detection and tracking were performed for the image processing part using Yolo version 5 and Deepsort, and Pyroptodome and OpenCV were used for encryption, decryption, and mosaic parts.*



## 📢How to test our face detection model?

- You can download a pt file here

    https://drive.google.com/drive/u/0/folders/1_MzpXoRL14ijcz9ESEaEfOveUHjxN0pP


- clone YOLOv5
```
$ git clone https://github.com/ultralytics/yolov5
$ cd yolov5
$ pip install -r requirements.txt
```
<br/>

- Download the dataset(facedataset -> save your local environment)
```
https://drive.google.com/file/d/1F70qUfhkLA4lAVOJvlGbdRM5QwlAUQT0/view?usp=sharing
```
<br/>

- Modify data.yaml
```
[Exist Version]
train: ../train/images
val: ../valid/images

[Modification Version]
train: {your saved path}/yolov5/train.txt
val: {your saved path}/yolov5/test.txt
--------------------
[for using GPU server]
train: D:/11_23_yolo/yolov5/train.txt
val: D:/11_23_yolo/yolov5/test.txt
```
<br/>

- Move maketxt.py into yolov5 folder and run it --> Being made train.txt, test.txt 
```
$ python maketxt.py
```
<br/>

- Run
```
$ python train.py --img 416 --batch 16 --epochs 100 --data data.yaml --weights yolov5s.pt --name result --cfg ./models/yolov5s.yaml
```
<br/>

*Google Colab*


<a href="https://colab.research.google.com/drive/1KG4F5vutIZYqgilqLcp-M2rBSc6_onFM?userstoinvite=minjjung9642%40gmail.com&actionButton=1#scrollTo=tCPF38tIZ47g"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"></a>


## 📢How to test the detect and tracking code?
    $ git clone https://github.com/2021-NEXT-LEVEL/StopChildAbuse
    $ cd detection_and_tracking
    $ pip install -qr requirements.txt
    
    #Enter the commands below using colab or jupyternotebook
    import torch
    from IPython.display import Image, clear_output  # to display images
    clear_output()
    print(f"Setup complete. Using torch {torch.__version__} ({torch.cuda.get_device_properties(0).name if torch.cuda.is_available() else 'CPU'})")
    
    #Enter the commands below
    $ python track.py --yolo_weights [folder location]/Yolov5_DeepSort_Pytorch/yolov5/weights/best.pt --source heart_Trim_7.mp4[your video name] --save-vid
    
    #You can check out put here
    txt file for bounding box : Yolov5_DeepSort_Pytorch/inference/output/[your video name].txt
    output mp4 file : Yolov5_DeepSort_Pytorch/inference/output/[your video name].mp4


 <p align="center">
   <img src="https://user-images.githubusercontent.com/68578916/143551418-d4024810-6cd2-4fe4-8c6e-4afba10f7dff.gif" />
</p>


## 📢How to run the website?
```
$ git clone https://github.com/4PT5/PersonalTraining-for-Visually-Impaired

// backend
$ cd backend
$ python3 -m venv django_venv
$ source django_venv/bin/activate
(django_venv) $ pip install -r requirements.txt
(django_venv) $ python manage.py migrate
(django_venv) $ python manage.py createsuperuser
(django_venv) $ python manage.py runserver
# Load the site at http://127.0.0.1:8000/

// frontend
$ cd frontend
$ npm install
$ npm start
```


## 📌Service Prototype
You can watch the video through the YouTube link below.  
[Demo](https://youtu.be/6wnz0OTOPbU)  

Thanks, NIA and mikel-brostrom.
