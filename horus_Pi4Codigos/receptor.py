from LoRaRF import SX127x
import time

LoRa = SX127x()

LoRa.begin()

# Set frequency to 433 Mhz
LoRa.setFrequency(433000000)
# set spreading factor 8, bandwidth 125 kHz, coding rate 4/5, and low data rate optimization off
LoRa.setLoRaModulation(7, 125000, 5, False)

# set explicit header mode, preamble length 12, payload length 15, CRC on and no invert IQ operation
LoRa.setLoRaPacket(LoRa.HEADER_EXPLICIT, 12, 2, True, False)


# Receive message continuously
while True :

    # Request for receiving new LoRa packet
    LoRa.request()
    # Wait for incoming LoRa packet
    LoRa.wait()

    # Put received packet to message and counter variable
    # read() and available() method must be called after request() or listen() method
    message = ""
    # available() method return remaining received payload length and will decrement each read() or get() method called
    while LoRa.available() > 1 :
        message += chr(LoRa.read()) 
    counter = LoRa.read()

    # Print received message and counter in serial
    print(chr(counter))

    # Print packet/signal status including RSSI, SNR, and signalRSSI
    print("Packet status: RSSI = {0:0.2f} dBm | SNR = {1:0.2f} dB".format(LoRa.packetRssi(), LoRa.snr()))
    time.sleep(0.5)
    # Show received status in case CRC or header error occur
    status = LoRa.status()
    if status == LoRa.STATUS_CRC_ERR : print("CRC error")
    elif status == LoRa.STATUS_HEADER_ERR : print("Packet header error")