import machine
from machine import Pin, Timer
import time
import uos

led = Pin(25, Pin.OUT)
timer = Timer()
def blink(timer):
    led.toggle()

timer.init(freq=2.5, mode=Timer.PERIODIC, callback=blink)

uart = machine.UART(0,baudrate=115200)
uart.init(115200, bits=8, parity=None, stop=1, tx=Pin(0), rx=Pin(1))

while True:
    print ('Hello from Pico\n')
    time.sleep(5)