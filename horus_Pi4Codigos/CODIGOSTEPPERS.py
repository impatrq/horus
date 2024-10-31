import RPi.GPIO as GPIO
import time

# Configura los pines
pinStep = 15
pinDirection = 14
pinStep2 = 5
pinDirection2 = 6

# Configura el modo de numeración de los pines
GPIO.setmode(GPIO.BCM)

# Configura los pines como salida
GPIO.setup(pinStep, GPIO.OUT)
GPIO.setup(pinDirection, GPIO.OUT)
GPIO.setup(pinStep2, GPIO.OUT)
GPIO.setup(pinDirection2, GPIO.OUT)

stepsPerRevolution = 200

try:
    while True:
        GPIO.output(pinDirection, GPIO.HIGH)
        GPIO.output(pinDirection2, GPIO.HIGH)

        for i in range(stepsPerRevolution):
            GPIO.output(pinStep, GPIO.HIGH)
            GPIO.output(pinStep2, GPIO.HIGH)
            print("step")
            time.sleep(0.01)  # 1 ms
            GPIO.output(pinStep, GPIO.LOW)
            GPIO.output(pinStep2, GPIO.LOW)
            time.sleep(0.01)  # 1 ms

except KeyboardInterrupt:
    pass  # Permite salir del bucle con Ctrl+C

finally:
    GPIO.cleanup()  # Limpia la configuración de los pines
