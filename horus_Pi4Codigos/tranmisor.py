# for SX127x series
from LoRaRF import SX127x
import time 
LoRa = SX127x()

LoRa.begin()# Set frequency to 915 Mhz
LoRa.setFrequency(433000000)
# set spreading factor 8, bandwidth 125 kHz, coding rate 4/5, and low data rate optimization off
LoRa.setLoRaModulation(8, 125000, 5, False)


# Message to transmit
message = "HeLoRa World!\0"
messageList = list(message)
for i in range(len(messageList)) : messageList[i] = ord(messageList[i])
counter = 0

# Transmit message continuously
while True :

    # Transmit message and counter
    # write() method must be placed between beginPacket() and endPacket()
    LoRa.beginPacket()
    LoRa.write(messageList, len(messageList))
    LoRa.write([counter], 1)
    LoRa.endPacket()

    # Print message and counter
    print(f"{message}  {counter}")

    # Wait until modulation process for transmitting packet finish
    LoRa.wait()

    # Print transmit time and data rate
    print("Transmit time: {0:0.2f} ms | Data rate: {1:0.2f} byte/s".format(LoRa.transmitTime(), LoRa.dataRate()))

    # Don't load RF module with continous transmit
    time.sleep(5)
    counter = (counter + 1) % 256