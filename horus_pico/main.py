import machine
from machine import Pin, Timer
import time
import uos
import json

led = Pin(25, Pin.OUT)
timer = Timer()
def blink(timer):
    led.toggle()

timer.init(freq=2.5, mode=Timer.PERIODIC, callback=blink) 

uart = machine.UART(0,baudrate=115200)
uart.init(115200, bits=8, parity=None, stop=1, tx=Pin(0), rx=Pin(1))
data = {
        "robot_id": 1,
        "plague_type": "oruga",
        "pheromone_trap": True,
        "image_id": 1,
        "probability": 100,
        "date": "10/10/2024",
        "time": "10:53",
        "coordinates": [0,1]
} 
 

res = json.dumps(data)

while True:
    uart.write(res)
    print(res)
    time.sleep(5)