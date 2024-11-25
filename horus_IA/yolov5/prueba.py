import os
import time
import json

os.system ("wget -P /home/horus/Desktop/New/yolov5/data/images http://192.168.221.56:8080/photo.jpg")
time.sleep(1)
os.system ("python detect.py --weights orugasmodelo.pt --img 640 --conf 0.25 --source data/images")
time.sleep(30) #se duerme por 30 segundos