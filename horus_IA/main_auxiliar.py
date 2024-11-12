#from LoRaRF import SX127x
#import RPi.GPIO as GPIO
import time
import os
import json
import cv2

## Seteo configuracion del Lora ##
#LoRa = SX127x()
#LoRa.begin()

# Set frequency to 433 Mhz
#LoRa.setFrequency(433000000)
# set spreading factor 8, bandwidth 125 kHz, coding rate 4/5, and low data rate optimization off
#LoRa.setLoRaModulation(7, 125000, 5, False)
# set explicit header mode, preamble length 12, payload length 15, CRC on and no invert IQ operation
#LoRa.setLoRaPacket(LoRa.HEADER_EXPLICIT, 12, 2, True, False)

## Configuracion del robot (interna) ##


#camera_index is the video device number of the camera 

# Declara una variable y le asigna la camara numero 0 (Si hay mas camaras, se usa 1,2,3 respectivamente)


pin_seguridad = "R1"
id_robot = "1"

mensaje = ""

class Robot():
    def __init__(self, ID, Pin):
        self.id = ID
        self.pin = Pin
        
    def run(self):

        verificacion = False

        logs = []

        ubicacion = [51.496756, -0.138503] #ACA USAR FUNCION DEL GPS
        
        # Verificacion de datos mediante pendrive 
        dictionary =  {
        "robot_id": self.id,
        "location": ubicacion,
        "battery": 75,
        "time_left": "03:30:29", 
        "last_log": "31-01-2024"
        }

        logs.append(dictionary)
 
        # Writing to sample.json
        with open("txsample.json", "w") as outfile:
            json.dump(logs, outfile)
            #outfile.write(logs)
        
        # lee el archivo pendrive para saber la ruta
        
        with open('rxsample.json', 'r') as openfile:
 
            # Reading from json file
            lecturarx = json.load(openfile)
 
        print(lecturarx['polygon_coordinates']) 

        ruta = lecturarx["polygon_coordinates"]
        punto_de_inicio = lecturarx["starting_point"]
        
        if punto_de_inicio == ubicacion :
            verificacion = True
            print ("verificado, iniciando ruta ...")
        
        ## Falta trampa de feromona ##
        
        # 1 grado de latitud o longitud equivale a 111.319m
        
        etapa_1 = ruta[1]

        metros = ((ubicacion[0] - etapa_1[0])* 10000)

        print (metros)
        
        recorrido = 0
        extr = 0
        

        while verificacion:
            
            cap = cv2.VideoCapture(0)
            i = 0
            
            # pongo en marcha motores durante 1 metro
            
            #paro los motores
            
            # estiro el brazo 20 cm
            
            while i < 5:
                ret, capturador = cap.read()
                # El ret regresa un booleano de si funciona la camara, y el frame actual
                cv2.imshow('nombre', capturador)
                key  = cv2.waitKey(1) & 0xFF

                print ("tomando captura")
    
                nombre = "fotosoja" + str(extr) #toma el momento de la captura en tiempo
        
                cv2.imwrite("/home/horus/Desktop/yolov5/data/images/ "  + nombre +  ".jpg" , capturador)
                # guarda la captura en la carpeta asignada, la carpeta se cambia segun la computadora y donde quieras ubicar el archivo
                # NOTA: a futuro usar tkinter para abrir una pantalla que le pida al usuario donde quiere poner las imagenes
                # A la direccion se le agrega una \ y un espacio, sino no funciona.
    
                extr = extr + 1
                print (nombre)
                time.sleep(2)
                
                

                i = i + 1
    

            cap.release()
            # release porque deja que otro programa pueda usar la camara mientras no se corra el while true
            cv2.destroyAllWindows()

            # Se cierra la camara con la letra Q

            #os.system ("wget -P /home/horus/Desktop/New/yolov5/data/images http://192.168.221.56:8080/photo.jpg")
            os.system ("python detect.py --weights orugasmodelo.pt --img 640 --conf 0.25 --source data/images")

           
            with open('orugas.json', 'r') as openfile:
                orugasdict = json.load(openfile)
            
            num_det = orugasdict['num_det']

            deteccion =  {
                "robot_id": 1,
                "plague_type": "oruga",
                "plague_detection": num_det,
                "pheromone_trap": False,
                "image_id": 12311,
                "probability": 100,
                "date": "31-01-2024",
                "time": "16:42",
                "coordinates": [51.505, -0.09]
                }
            
            logs.append(deteccion)
 
            # Writing to sample.json
            with open("txsample.json", "w") as outfile:
                json.dump(logs, outfile)
                #outfile.write(logs)
            
        
            recorrido = recorrido + 1

            print (recorrido)


            if recorrido >= metros:
                verificacion = False
                print ("recorrido terminado")
    
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
    

robot = Robot(id_robot, pin_seguridad)

robot.run()