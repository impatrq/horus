from machine import Pin
from time import sleep

# Define the pins for the first stepper motor
step_pin_1 = Pin(5, Pin.OUT)  # Change to your STEP pin
dir_pin_1 = Pin(6, Pin.OUT)   # Change to your DIR pin

# Define the pins for the second stepper motor
step_pin_2 = Pin(8, Pin.OUT)  # Change to your STEP pin
dir_pin_2 = Pin(7, Pin.OUT)   # Change to your DIR pin

# Signal pin to send a signal to Raspberry Pi 4
signal_pin = Pin(15, Pin.OUT)  # Change to the pin you're using for signaling


def move_stepper(step_pin, dir_pin, steps, delay):
    dir_pin.value(0)  # Set direction (1 or 0)
    for _ in range(steps):
        step_pin.on()
        sleep(delay)
        step_pin.off()
        sleep(delay)

# Move both steppers for 1 second
def run_motors():
    steps_per_second = 200# Adjust this depending on your motor speed
    delay_between_steps = 0.001  # Time between each step in seconds
    
    for _ in range(steps_per_second*30):
        move_stepper(step_pin_1, dir_pin_1, 1, delay_between_steps)
        move_stepper(step_pin_2, dir_pin_2, 1, delay_between_steps)

# Send signal after 1 second
def send_signal():
    signal_pin.on()
    sleep(0.1)
    print("signal sent")
    signal_pin.off()

# Main function
if __name__ == "__main__":
    run_motors()# Wait for 1 second of runtime
    send_signal()  # Send signal to Raspberry Pi 4
