// Imports
const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require ("@serialport/parser-readline");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const dataRoute = require ("./routes/robotdata")


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then (() => {
  console.log("Connected to Database");
})
.catch ((err) => {
  console.log ("Error en la conexión con la base de datos")
})

// Serial Communication - Port Creation

// const port = new SerialPort({
//   path: 'COM3',
//   baudRate: 115200,
// })

// port.on('readable', function () {
//   let serial_data = JSON.parse(port.read());
//   console.log('Data:', port.read().toString());
//   return serial_data;
// })

console.log("Hi")