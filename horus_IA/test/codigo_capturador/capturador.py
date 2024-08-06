import numpy
import cv2
import time
import os
import json

# Objetivo: accede a la camara y captura imagenes guardandolas en un archivo, para el data set de la IA 
# Con "s" saca captura y con "q" cierra la camara

with open("Numerodefto.json", "r") as f:
    data = json.load(f)
# Abre el archivo json en modo lectura y guarda la informacion en la variable data

extr = (data["contador"])
print (extr)

# Guardo en extr el valor de contador, que seria el contador guardado en json

cap = cv2.VideoCapture(0)
# Declara una variable y le asigna la camara numero 0 (Si hay mas camaras, se usa 1,2,3 respectivamente)
while True:
    ret, capturador = cap.read()
    # El ret regresa un booleano de si funciona la camara, y el frame actual
    cv2.imshow('nombre', capturador)
    key  = cv2.waitKey(1) & 0xFF
    if key == ord('s'):
        print ("tomando captura")
        nombre = "fotosoja" + str(extr) #toma el momento de la captura en tiempo
        
        cv2.imwrite(r"C:\Users\diazs\Desktop\Horus\Codigo_Base\Imagenes_prueba\ " + nombre +  ".jpg" , capturador)
        # guarda la captura en la carpeta asignada, la carpeta se cambia segun la computadora y donde quieras ubicar el archivo
        # NOTA: a futuro usar tkinter para abrir una pantalla que le pida al usuario donde quiere poner las imagenes
        # A la direccion se le agrega una \ y un espacio, sino no funciona.
    
        extr = extr + 1
        data["contador"] = extr
        with open("Numerodefto.json", "w") as f: 
            json.dump(data,f)
            # Abre el mismo archivo json en modo escritura y sobreescribe el valor del contador
            # Esto evita que los archivos de imagen se sobreescriban
        print (nombre)
    elif key == ord('q'):
       break

cap.release()
# release porque deja que otro programa pueda usar la camara mientras no se corra el while true
cv2.destroyAllWindows()

# Se cierra la camara con la letra Q

