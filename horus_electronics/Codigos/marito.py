from machine import Pin
import time

pinEnabled = Pin(5, Pin.OUT,value=0)
pinStep = Pin(1, Pin.OUT)
pinDirection = Pin(2, Pin.OUT)

stepsPerRevolution = 200

while True:

    pinDirection.on()

    for i in range(0,stepsPerRevolution):
        pinStep.on()
        print("step")
        time.sleep_ms(1)
        pinStep.off()
        time.sleep_ms(1)

   