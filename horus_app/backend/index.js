// Imports
const { SerialPort } = require('serialport');
const { ReadlineParser } = require ("@serialport/parser-readline");
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(
    () => { 
      console.log("Connected");
    },
    err => {
      console.log(err); 
    }
);

// Serial Communication - Port Creation

const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
})


port.on('readable', function () {
  console.log('Data:', port.read().toString());
})

console.log("Hi")