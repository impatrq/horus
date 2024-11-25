from LoRaRF import SX127x
import RPi.GPIO as GPIO
import time
import os

## Seteo configuracion del Lora ##
LoRa = SX127x()
LoRa.begin()

# Set frequency to 433 Mhz
LoRa.setFrequency(433000000)
# set spreading factor 8, bandwidth 125 kHz, coding rate 4/5, and low data rate optimization off
LoRa.setLoRaModulation(7, 125000, 5, False)
# set explicit header mode, preamble length 12, payload length 15, CRC on and no invert IQ operation
LoRa.setLoRaPacket(LoRa.HEADER_EXPLICIT, 12, 2, True, False)

## Configuracion del robot (interna) ##

pin_seguridad = "R1"
id_robot = "1"

mensaje = ""

class Robot():
    def __init__(self, ID, Pin):
        self.id = ID
        self.pin = Pin
        
    def run(self):
        
        verificacion = False
        
        #programa principal aca
        while verificacion != True:
            mensaje = receptor()
            if mensaje == "%":
                mensaje = receptor()
                if mensaje == "R":
                    mensaje = receptor()
                    if mensaje == "R":
                        mensaje = receptor()
                        if mensaje == "1":
                            verificacion = True
        
        print ("verificado")
        
        coords = coordenadas()
        bate = bateria()
        
        mensaje = "{type: confirm, type: robot_id:1, battery: ", bate, "time_left: 20hr, coordenadas: [0,0]}"
        transmisor(mensaje)
        
        ruta = receptor() # area: [(x,y),(x,y),(x,y),(x,y)]
        
        ## Programa de prueba wink wink ##
        
        ruta = [0,0, 0,10, 10,10, 10,0]
        
        ## Falta trampa de feromona ##
        
        # 1 grado de latitud o longitud equivale a 111.319m
        
        metros = (ruta[3] - ruta[0]) * 111.319

        print (metros)
        
        recorrido = 0
        
        while recorrido < metros:
            
            # pongo en marcha motores durante 1 metro
            time.sleep(1)
            
            #paro los motores
            
            # estiro el brazo 20 cm
            
            os.system ("wget -P /home/horus/Desktop/New/yolov5/data/images http://192.168.221.56:8080/photo.jpg")
            time.sleep(1)
            os.system ("python detect.py --weights orugasmodelo.pt --img 640 --conf 0.25 --source data/images")
            time.sleep(30) #se duerme por 30 segundos
            
            with open ("orugas.txt") as f:
                num_det = json.load(f)
            
            mensaje = "Deteccion: "
            transmisor(mensaje)
            mensaje = str(num_det)
            transmisor(mensaje)
            recorrido = recorrido + 1


        
            
    
    def receptor(self):
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
        
        return counter
    
    def transmisor (self, mensaje):
        message = "HeLoRa World!\0"
        messageList = list(message)
        for i in range(len(messageList)) : messageList[i] = ord(messageList[i])
        counter = 0
        
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
    
    def codificador(self):
        pass
    
    def decodificador(self):
        pass
        
    def coordenadas(self):
        pass
    
    def bateria(self, bateria):
        self.bateria = bateria
        self.bateria = "100%"
        
        return self.bateria
        
    def ultrasonido(self):
        pass
    