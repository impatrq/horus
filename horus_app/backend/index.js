// Imports
const express = require ('express');
const morgan = require ('morgan');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require ("@serialport/parser-readline");
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
app.use(express.json())
const robotdata = require('./models/robotdata');
const bodyParser = require("body-parser")
const cors = require('cors')

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


// HTTP REQUEST ROUTES
app.use(cors())

app.get('/api/allLogs', async (req,res) => {
  let allLogs = await robotdata.find()
  res.json(allLogs)
})

app.post('/api/filter', async (req,res) => {
  console.log(req.body)
  const date = req.body.date
  const time = req.body.time
  const robot_id = req.body.robot_id
  const plague_type = req.body.plague_type
  const pheromone_trap = req.body.pheromone_trap
  const image_id = req.body.image_id
  const probability = req.body.probability
  const coordinates = req.body.coordinates

  const order = req.body.order
  
  let find = await robotdata.find({
    ...(date !== undefined && { date: { $regex: new RegExp('.*' + date + '.*') } }),
    ...(time !== undefined && { time: { $regex: new RegExp('.*' + time + '.*') } }),
    ...(robot_id !== undefined && { robot_id }),
    ...(plague_type !== undefined && { plague_type: { $regex: new RegExp('.*' + plague_type + '.*') } }),
    ...(pheromone_trap !== undefined && { pheromone_trap }),
    ...(image_id !== undefined && { image_id }),
    ...(probability !== undefined && { probability }),
    ...(coordinates !== undefined && { coordinates: { $regex: new RegExp('.*' + coordinates + '.*') } })
  }).sort( order ).exec();
  res.json(find)
})

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
console.log("Hi")