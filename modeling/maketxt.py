from glob import glob #이미지를 한번에 긁어모으기 위한 glob 모듈

img_list = glob('./train/images/*.jpg') # 트레인 이미지 경로
val_img_list = glob('./test/images/*.jpg') # 테스트 이미지 경로

with open('./train.txt', 'w') as f:
    f.write('\n'.join(img_list) + '\n')

with open('./test.txt', 'w') as f:
    f.write('\n'.join(val_img_list) + '\n')
