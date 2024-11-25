import serial, time, string, pynmea2

while True:
    port = "/dev/ttyAMA0"
    ser = serial.Serial(port, baudrate = 9600, timeout = 0.5)
    dataout = pynmea2.NMEAStreamReader()
    newdata = ser.readline()
    
    n_data = newdata.decode('latin-1')
    
    
    if n_data[0:6] == "$GPRMC":
        newmsg= pynmea2.parse(n_data)
        lat = newmsg.latitude
        lng = newmsg.longitude
        
        gps = "latitude = " + str(lat) + "\n longitude = " +str(lng)
        
        #en una misma posicion los primeros 4 numeros luego de la coma no cambian
        
        print(gps)
        time.sleep(1)