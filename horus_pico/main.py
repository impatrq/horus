import machine
from machine import Pin, Timer
import time
import json
from time import sleep
from ulora import LoRa, ModemConfig, SPIConfig

message = ''

RFM95_RST = 27
RFM95_SPIBUS = SPIConfig.rp2_0
RFM95_CS = 5
RFM95_INT = 28
RF95_FREQ = 433.0
RF95_POW = 20
CLIENT_ADDRESS = 1
SERVER_ADDRESS = 2

lora = LoRa(RFM95_SPIBUS, RFM95_INT, CLIENT_ADDRESS, RFM95_CS, reset_pin=RFM95_RST, freq=RF95_FREQ, tx_power=RF95_POW, acks=True)

def on_recv(payload):
    print("Received:", payload.message)
    message_send = json.dumps(payload.message)
    uart.write(message_send)
    
lora.on_recv = on_recv

led = Pin(25, Pin.OUT)
timer = Timer()
def blink(timer):
    led.toggle()

timer.init(freq=2.5, mode=Timer.PERIODIC, callback=blink) 
 
uart = machine.UART(0,baudrate=115200)
uart.init(115200, bits=8, parity=None, stop=1, tx=Pin(0), rx=Pin(1))

def changeMode():
    lora.set_mode_rx()

def fromServer():
    if uart.any:
        message = uart.read()
        lora.set_mode_tx()
        # In case it's null
        if message:
            message = json.dumps(message.decode('utf-8'))
            lora.send_to_wait(message, SERVER_ADDRESS)
    
while True:
    fromServer()
    changeMode()
    time.sleep(0.2)