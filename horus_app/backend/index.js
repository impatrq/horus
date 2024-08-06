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


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then (() => {
  console.log("Connected to Database");
})
.catch ((err) => {
  console.log ("Error en la conexión con la base de datos")
})

// SERIAL COMMUNICATION
// La conexión serial no funciona a menos que se encuentre conectada la raspberry
const port = new SerialPort({
  path: 'COM3',
  baudRate: 115200,
})

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


// HTTP REQUEST ROUTES
app.get('/api/allLogs', async (req,res) => {
  let allLogs = await robotdata.find()
  res.json(allLogs)
})

app.get('/api/id/:id', async (req,res) => {
  try {
    const { id }  = req.params
    const idLog = await robotdata.findById(id)
    res.json(idLog)
  }
  catch (error) {
    res.json('Error en pedir un ID especifico')
  }
})

app.get('/api/time/:timeFilter', async (req,res) =>{
  try {
    const { timeFilter } = req.params
    const timeLog = await robotdata.find({time: timeFilter})
    res.json(timeLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tiempo')
  }
})

app.get('/api/robotId/:robot_idFilter', async (req,res) =>{
  try {
    const { robot_idFilter } = req.params
    const robot_idLog = await robotdata.find({robot_id: robot_idFilter})
    res.json(robot_idLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por ID de robot')
  }
})

app.get('/api/plague_type/:plague_typeFilter', async (req,res) =>{
  try {
    const { plague_typeFilter } = req.params
    const plague_typeLog = await robotdata.find({plague_type: plague_typeFilter})
    res.json(plague_typeLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})

app.get('/api/pheromone_trap/:pheromone_trapFilter', async (req,res) =>{
  try {
    const { pheromone_trapFilter } = req.params
    const pheromone_trapLog = await robotdata.find({pheromone_trap: pheromone_trapFilter})
    res.json(pheromone_trapLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})

app.get('/api/image_id/:image_idFilter', async (req,res) =>{
  try {
    const { image_idFilter } = req.params
    const image_idLog = await robotdata.find({image_id: image_idFilter})
    res.json(image_idLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})

app.get('/api/probability/:probabilityFilter', async (req,res) =>{
  try {
    const { probabilityFilter } = req.params
    const probabilityLog = await robotdata.find({probability: probabilityFilter})
    res.json(probabilityLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})


// Modificar date en los logs para formato 00-00-00 para que funcione esto.
// Alternativamente cambiarlo por las timestamps (createdAt)
app.get('/api/date/:dateFilter', async (req,res) =>{
  try {
    const { dateFilter } = req.params
    const dateLog = await robotdata.find({date: dateFilter})
    res.json(dateLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})


app.get('/api/coordinates/:coordinatesFilter', async (req,res) =>{
  try {
    const { coordinatesFilter } = req.params
    const coordinatesLog = await robotdata.find({coordinates: coordinatesFilter})
    res.json(coordinatesLog)
  }
  catch (error) {
    res.json('Error en pedir ID filtrado por tipo de plaga')
  }
})


app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
console.log("Hi")