# StopChildAbuse
2021 NIA 인공지능 데이터 활용 경진대회
<br/><br/>

## Model Training (Local)
- clone YOLOv5
```
$ git clone https://github.com/ultralytics/yolov5
$ cd yolov5
$ pip install -r requirements.txt
```
<br/>

- dataset 다운로드
```
1) widerface : http://shuoyang1213.me/WIDERFACE/
2) K-Face(한국인 안면 이미지 데이터셋) : https://aihub.or.kr/aidata/73

widerface의 경우 아래 드라이브에 학습에 사용하는 형태로 저장되어 있음.
K-Face의 경우 개인정보의 이유로 직접 데이터 다운로드 후, 라벨링 형식을 맞춰주어야 함.
https://drive.google.com/file/d/1F70qUfhkLA4lAVOJvlGbdRM5QwlAUQT0/view?usp=sharing
```
<br/>

- K-Face labeling 형식 수정
```
$ python image_labeling_preprocessing.py
```
<br/>

- data.yaml 수정
```
[기존]
train: ../train/images
val: ../valid/images

[수정]
train: {저장 경로}/yolov5/train.txt
val: {저장 경로}/yolov5/test.txt
--------------------
[GPU 서버용]
train: D:/11_23_yolo/yolov5/train.txt
val: D:/11_23_yolo/yolov5/test.txt
```
<br/>

- maketxt.py를 yolov5 폴더 안으로 옮긴 후 실행 --> train.txt, test.txt 생성
```
$ python maketxt.py
```
<br/>

- 실행
```
$ python train.py --img 416 --batch 16 --epochs 100 --data data.yaml --weights yolov5s.pt --name result --cfg ./models/yolov5s.yaml
```
<br/>

## Model Training (Google Colab)
- image labeling pre-processing   
<a href="https://colab.research.google.com/drive/1krIA_bohDSipunSrbldWFR1d9qw_U66o?authuser=2#scrollTo=t7VWjxYtFwIv"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"></a>

- YOLOv5 model training    
<a href="https://colab.research.google.com/drive/1KG4F5vutIZYqgilqLcp-M2rBSc6_onFM?userstoinvite=minjjung9642%40gmail.com&actionButton=1#scrollTo=tCPF38tIZ47g"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"></a>
