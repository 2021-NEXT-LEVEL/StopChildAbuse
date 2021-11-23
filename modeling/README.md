# StopChildAbuse
2021 NIA 인공지능 데이터 활용 경진대회

## Model
- clone YOLOv5
```
$ git clone https://github.com/ultralytics/yolov5
$ cd yolov5
$ pip install -r requirements.txt
```
<br/>

- dataset 다운로드(facedataset -> 로컬에 저장)
```
https://drive.google.com/file/d/1F70qUfhkLA4lAVOJvlGbdRM5QwlAUQT0/view?usp=sharing
```
<br/>

- data.yaml 수정
```
[기존]
train: ../train/images
val: ../valid/images

[수정]
train: {저장 경로}/yolov5/train.txt
val: {저장 경로}/content/yolov5/test.txt

[GPU 서버용]
train: D:/11_23_yolo/yolov5/train.txt
val: D:/11_23_yolo/yolov5/test.txt
```
<br/>

- maketxt.py를 yolov5 폴더 안으로 옮긴 후 실행
```
$ python maketxt.py
```
<br/>

- 실행
```
$ python train.py --img 416 --batch 16 --epochs 100 --data data.yaml --weights yolov5s.pt --name result --cfg ./models/yolov5s.yaml
```
<br/>

colab용 코드 : https://colab.research.google.com/drive/1KG4F5vutIZYqgilqLcp-M2rBSc6_onFM#scrollTo=tCPF38tIZ47g
