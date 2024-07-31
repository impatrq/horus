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

// const port = new SerialPort({
//   path: 'COM3',
//   baudRate: 115200,
// })

// const parser = new ReadlineParser();
// port.pipe(parser);

// parser.on('data', (data) => {
//   try {
//     let serial_data = JSON.parse(data);
//     console.log('Data:', serial_data);
//     robotdata.create(serial_data);
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//   }
// });

// Routes
app.get('/api/allLogs', async (req,res) => {
  let allLogs = await robotdata.find()
  res.json(allLogs)
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
console.log("Hi")