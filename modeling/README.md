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

- dataset 다운로드(facedataset -> 로컬에 저장됨)
```
$ 
```
<br/>

- data.yaml 수정
```
[기존]
train: ../train/images
val: ../valid/images

[수정]
train: /content/yolov5/train.txt
val: /content/yolov5/test.txt
```

- dataset 정리 ->.py로 빼기
```
from glob import glob

img_list = glob('./train/images/*.jpg')
val_img_list = glob('./test/images/*.jpg')

with open('./train.txt', 'w') as f:
    f.write('\n'.join(img_list) + '\n')

with open('./test.txt', 'w') as f:
    f.write('\n'.join(val_img_list) + '\n')
```
<br/>

- 실행
```
$ python train.py --img 416 --batch 16 --epochs 100 --data /content/yolov5/data.yaml --weights yolov5s.pt --name result --cfg ./models/yolov5s.yaml
```
<br/>

colab : https://colab.research.google.com/drive/1KG4F5vutIZYqgilqLcp-M2rBSc6_onFM#scrollTo=tCPF38tIZ47g