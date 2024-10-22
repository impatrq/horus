from machine import Pin, PWM
from time import sleep

# Configuración de los pines GPIO para los motores paso a paso con A4988
dir1 = Pin(3, Pin.OUT)   # Dirección del motor 1
step1 = Pin(4, Pin.OUT)  # Paso del motor 1
dir2 = Pin(5, Pin.OUT)   # Dirección del motor 2
step2 = Pin(6, Pin.OUT)  # Paso del motor 2

# Pines de control del brazo tijera y el servo
dirB = Pin(7, Pin.OUT)   # Dirección del motor del brazo
stepB = Pin(8, Pin.OUT)  # Paso del motor del brazo
servo_pin = Pin(9)       # Pin para el control del servo (sin .OUT para PWM)

# Configuración del PWM para el servomotor
servo_pwm = PWM(servo_pin)  # Configurar pin 9 como salida PWM
servo_pwm.freq(50)          # Frecuencia de 50Hz (20 ms de período)

# Función para controlar un motor paso a paso con A4988 (usada para el brazo)
def mover_stepper(dir_pin, step_pin, pasos, direccion, delay):
    dir_pin.value(direccion)
    for _ in range(pasos):
        step_pin.on()
        sleep(delay)
        step_pin.off()
        sleep(delay)

# Función para controlar dos motores paso a paso de forma simultánea con A4988
def mover_steppers_simultaneos(dir_pin1, step_pin1, dir_pin2, step_pin2, pasos, direccion, delay):
    dir_pin1.value(direccion)
    dir_pin2.value(direccion)
    for _ in range(pasos):
        step_pin1.on()
        step_pin2.on()
        sleep(delay)
        step_pin1.off()
        step_pin2.off()
        sleep(delay)

# Función principal para ejecutar la secuencia
def detectar_pulso():
    esperar_pulso("Iniciar secuencia")
    pulsostartrecibido()

def pulsostartrecibido():
    print("Arrancando motores de orugas...")
    mover_steppers_simultaneos(dir1, step1, dir2, step2, pasos=200, direccion=1, delay=0.002)
    print("Motores funcionando durante 1 segundo...")
    sleep(1)
    brazoup()

def brazoup():
    print("Levantando brazo hasta el tope...")
    mover_stepper(dirB, stepB, pasos=600, direccion=1, delay=0.01)
    esperapulsocamara()

def esperapulsocamara():
    esperar_pulso("Esperando pulso de la cámara")
    pulsocamararecibido()

def pulsocamararecibido():
    print("Iniciando paneo del servo...")
    mover_servo_paneo()
    terminaservo()

# Control del servo para paneo de 0 a 180 grados en intervalos de 30 grados y luego regresar
def mover_servo_paneo():
    print("Moviendo el servo de 0 a 180 grados en intervalos de 30 grados...")
    for angulo in range(0, 181, 30):
        mover_servo(angulo)
        sleep(0.5)
    
    print("Moviendo el servo de 180 a 0 grados en intervalos de 30 grados...")
    for angulo in range(180, -1, -30):
        mover_servo(angulo)
        sleep(0.5)

# Función para mover el servo a una posición específica usando PWM real
def mover_servo(angulo):
    # Convertir el ángulo a ciclo de trabajo PWM
    duty_cycle = angle_to_duty_cycle(angulo)
    servo_pwm.duty_u16(duty_cycle)  # Ajustar ciclo de trabajo
    print(f"Servo movido a {angulo} grados con ciclo de trabajo {duty_cycle}")

# Función para convertir un ángulo (0-180) a ciclo de trabajo PWM
def angle_to_duty_cycle(angulo):
    # El ciclo de trabajo para el servo varía de 1ms (0 grados) a 2ms (180 grados).
    # En términos de ciclo de trabajo para una señal de 50 Hz:
    # - 1 ms corresponde aproximadamente a un ciclo de trabajo de 5% (3276 en valor de 16 bits)
    # - 2 ms corresponde aproximadamente a un ciclo de trabajo de 10% (6553 en valor de 16 bits)
    # Mapear el rango 0-180 grados al rango 3276-6553
    min_duty = 3276   # 5% de ciclo de trabajo (1 ms)
    max_duty = 6553   # 10% de ciclo de trabajo (2 ms)
    return int(min_duty + (angulo / 180.0) * (max_duty - min_duty))

def terminaservo():
    print("Enviando pulso a la Raspberry Pi 4...")
    sleep(3)
    print("Esperando 3 segundos...")
    brazodown()

def brazodown():
    print("Bajando brazo hasta el tope...")
    mover_stepper(dirB, stepB, pasos=600, direccion=0, delay=0.002)
    movermotoresfinal()

def movermotoresfinal():
    print("Moviendo los motores de orugas nuevamente...")
    mover_steppers_simultaneos(dir1, step1, dir2, step2, pasos=200, direccion=1, delay=0.01)
    print("Movimiento finalizado. Programa concluido.")

def esperar_pulso(mensaje):
    while True:
        pulso = input(f"{mensaje} (Escribe '1' para enviar pulso): ")
        if pulso == '1':
            print("Pulso detectado.")
            return
        else:
            print("Pulso no detectado, esperando...")

# Iniciar la simulación
detectar_pulso()
2212