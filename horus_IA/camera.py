import cv2
import time

#camera_index is the video device number of the camera 
i = 0
extr = 0
cap = cv2.VideoCapture(0)
# Declara una variable y le asigna la camara numero 0 (Si hay mas camaras, se usa 1,2,3 respectivamente)
while i < 5:
    ret, capturador = cap.read()
    # El ret regresa un booleano de si funciona la camara, y el frame actual
    cv2.imshow('nombre', capturador)
    key  = cv2.waitKey(1) & 0xFF

    print ("tomando captura")
    
    nombre = "fotosoja" + str(extr) #toma el momento de la captura en tiempo
        
    cv2.imwrite("/home/horus/Desktop/ " + nombre +  ".jpg" , capturador)
        # guarda la captura en la carpeta asignada, la carpeta se cambia segun la computadora y donde quieras ubicar el archivo
        # NOTA: a futuro usar tkinter para abrir una pantalla que le pida al usuario donde quiere poner las imagenes
        # A la direccion se le agrega una \ y un espacio, sino no funciona.
    
    extr = extr + 1
    print (nombre)

    time.sleep(.5)

    i = i + 1
    

cap.release()
# release porque deja que otro programa pueda usar la camara mientras no se corra el while true
cv2.destroyAllWindows()

# Se cierra la camara con la letra Q

