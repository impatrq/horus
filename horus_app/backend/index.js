// Imports
const express = require ('express');
const morgan = require ('morgan');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require ("@serialport/parser-readline");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const dataRoute = require ("./routes/robotdata");
const robotdata = require('./models/robotdata');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then (() => {
  console.log("Connected to Database");
})
.catch ((err) => {
  console.log ("Error en la conexión con la base de datos")
})

// Serial Communication - Port Creation

const port = new SerialPort({
  path: 'COM3',
  baudRate: 115200,
})

port.on('readable', function () {
  data = port.read();
  let serial_data = JSON.parse(data);
  console.log('Data:', serial_data);
  robotdata.create(serial_data)
})

// Método de base de datos para el archivo json de conexión serie

console.log("Hi")