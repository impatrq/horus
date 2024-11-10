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
const mappolygon = require('./models/mappolygon')
const maptrap = require('./models/maptrap')
const mapstart = require('./models/mapstart')
const robotprofiles = require('./models/robotprofiles')
const mapzoom = require('./models/mapzoom')
const bodyParser = require("body-parser")
const cors = require('cors')
const fs =  require('fs')

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
// try{
//   const port = new SerialPort({
//     path: 'COM3',
//     baudRate: 115200,
//   })
// } catch (err) {
//   console.log("Error initializing serial")
// }


// const parser = new ReadlineParser();
// port.pipe(parser);


// const commQueue = []

// parser.on('data', async (data) => {
//   try {
//     let serial_data = JSON.parse(data);
//     console.log('Data:', serial_data);
//     if (serial_data.type === 'confirm') {
//       const check = robotprofiles.exists({robot_id: serial_data.robot_id})
//       if (!check){
//         robotprofiles.create(serial_data)
//       }
//     } else if (serial_data.type === 'log') {
//       const maxDistanceInKm = 1000 * 0.0003048;
//       const traps = await maptrap.find({}, {coordinates:1, _id:0})
//       for (const trap in traps) {
//         const distance = haversineDistance(trap.coordinates, serial_data.coordinates)
//         if (distance <= maxDistanceInKm) {
//           serial_data.pheromone_trap = true;
//           break;
//         }
//       }
//       robotdata.create(serial_data);
//       robotprofiles.updateOne({robot_id: serial_data.robot_id}, { last_log: serial_data.last_log})
//     } else if (serial_data.type === 'rd') { // robot data
//       robotprofiles.updateOne({ robot_id: serial_data.robot_id},{
//         location: serial_data.location,
//         battery: serial_data.battery,
//         time_left: serial_data.time_left,
//       })
//     } else if (serial_data === 'SWITCH'){
//       port.write(commQueue[0])
//     }
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//   }
// })

// function sendQueue() {
//   if (commQueue.length === 0) {
//     turn = false
//     return
//   }

//   const message = commQueue.shift()

//   port.write(message, (err) => {
//     if (err) {
//       console.error('Error on write: ', err.message);
//       turn = false; // Reset state if there's an error
//     } else {
//       console.log('Message written:', message);
//       turn = false;

//       if (sendQueue.length > 0) {
//         sendMessage();
//       }
//     }
//   });
// }

// HTTP REQUEST ROUTES
app.use(cors())

// Data App Route
app.get('/api/allLogs', async (req,res) => {
  let allLogs = await robotdata.find()
  res.json(allLogs)
})

app.post('/api/filter', async (req,res) => {
  console.log(req.body)
  try {
    const date = req.body.date
    const time = req.body.time
    const robot_id = req.body.robot_id
    const plague_type = req.body.plague_type
    const pheromone_trap = req.body.pheromone_trap
    const image_id = req.body.image_id
    const probability = req.body.probability
    // El catch de error es porque muestra error si coordinates es undefined(si no se completo en el filtro)
    try {
      coordinates = JSON.parse(req.body.coordinates)
    } catch (err) {
      coordinates = req.body.coordinates
    }
  
    const order = req.body.order
    
    let find = await robotdata.find({
      ...(date !== undefined && { date: { $regex: new RegExp('.*' + date + '.*') } }),
      ...(time !== undefined && { time: { $regex: new RegExp('.*' + time + '.*') } }),
      ...(robot_id !== undefined && { robot_id }),
      ...(plague_type !== undefined && { plague_type: { $regex: new RegExp('.*' + plague_type + '.*') } }),
      ...(pheromone_trap !== undefined && { pheromone_trap }),
      ...(image_id !== undefined && { image_id }),
      ...(probability !== undefined && { probability }),
      ...(coordinates !== undefined && { coordinates })
    }).sort( order ).exec();
    res.json(find)
  } catch (err) {
    console.log ('Error fetching data')
  }
})

// Home App Route
app.get('/api/map/logs', async (req,res) => {
  let find = await robotdata.find({}, { coordinates: 1, _id: 0})
  res.json(find)
})

app.get('/api/map/pheromone_traps', async (req,res) => {
  let find = await maptrap.find({}, { trap_coordinates: 1, radius: 1 })
  console.log(find)
  res.json(find)
})

app.get('/api/map/start_points', async (req,res) => {
  let find = await mapstart.find({}, { starting_point: 1, id: 1 })
  console.log(find)
  res.json(find)
})

app.get('/api/map/polygons', async (req,res) => {
  let find = await mappolygon.find({}, { polygon_coordinates: 1, id: 1})
  console.log(find)
  res.json(find)
})

app.post('/api/map/filter', async(req,res) => {
  console.log(req.body)
  try {
    const date = dateFormat(req.body.date)
    const time = req.body.time
    const robot_id = req.body.robot_id
    const plague_type = req.body.plague_type
    const pheromone_trap = req.body.pheromone_trap
    const image_id = req.body.image_id
    const probability = req.body.probability
    // El catch de error es porque muestra error si coordinates es undefined(si no se completo en el filtro)
    try {
      coordinates = JSON.parse(req.body.coordinates)
    } catch (err) {
      coordinates = req.body.coordinates
    }
      
    const find = await robotdata.find({
      ...(date !== undefined && { date: { $regex: new RegExp('.*' + date + '.*') } }),
      ...(time !== undefined && { time: { $regex: new RegExp('.*' + time + '.*') } }),
      ...(robot_id !== undefined && { robot_id }),
      ...(plague_type !== undefined && { plague_type: { $regex: new RegExp('.*' + plague_type + '.*') } }),
      ...(pheromone_trap !== undefined && { pheromone_trap }),
      ...(image_id !== undefined && { image_id }),
      ...(probability !== undefined && { probability }),
      ...(coordinates !== undefined && { coordinates })
    }, { coordinates: 1, _id: 0}).exec();
    console.log(find)
    res.json(find)
  } catch(err) {
    console.log("Error al fetch de filtro del home")
  }
})

function dateFormat(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

app.post('/api/store/polygon_coordinates', async (req,res) => {
  console.log(req.body)
  const find = await mappolygon.find({id: req.body.id})
  if (find.length > 0) {
    mappolygon.deleteOne({id: req.body.id})
  }
  mappolygon.create(req.body)
  updateRobotMapData(1)
})

app.post('/api/store/trap_coordinates', async (req,res) => {
  console.log(req.body)
  maptrap.create(req.body)
  updateRobotMapData(1)
})

app.post('/api/store/starting_point', async (req,res) => {
  console.log(req.body)
  const find = await mapstart.find({id: req.body.id})
  if (find.length > 0) {
    mapstart.deleteOne({id: req.body.id})
  }
  mapstart.create(req.body)
  updateRobotMapData(1)
})

app.post('/api/store/zoom_coordinates', async (req,res) => {
  console.log(req.body)
  const remove = await mapzoom.deleteOne({})
  const new_zoom = await mapzoom.create(req.body)
})

app.get('/api/map/zoom', async(req,res) => {
  console.log('hi')
  try {
    const find = await mapzoom.findOne()
    res.json(find)
    console.log(find)
  }
  catch(err) {
    console.log('error en api zoom')
    const find = {
      zoom_coordinates: [51.505, -0.09]
    }
    res.json(find)
  }
})

app.delete('/api/delete/trap_coordinates/:id', async(req,res) => {
  const remove = await maptrap.findByIdAndDelete(req.params.id)
})

app.delete('/api/delete/starting_point/:id', async(req,res) => {
  const remove = await mapstart.findByIdAndDelete(req.params.id)
})

app.delete('/api/delete/polygon_coordinates/:id', async(req,res) => {
  const remove = await mappolygon.findByIdAndDelete(req.params.id)
})

// Robots App Route
app.post('/api/robot/connect', async (req,res) => {
  const connectJSON = {
    type: 'connect',
    robot_id: req.body.robot_id
  }
  const response = res.json('ok')
  // commQueue.push(connectJSON)
})

app.get('/api/robot/load', async(req,res) => {
  const robots = await robotprofiles.find()
})

async function updateRobotMapData (id){
  const area = await mappolygon.find({ robot_id: id}, {polygon_coordinates:1, _id:0})
  console.log(area)
  const robotMapData = {
    type: 'rd',
    area: area.polygon_coordinates
  }
  // commQueue.push(robotMapData)
}

app.get('/api/robot/remove', async (req, res) => {
  const getinfoJSON = {
    type: 'getinfo',
  }
  // commQueue.push()
})

app.post('/api/offline', async (req, res) => {
  console.log(req.body)
  // El primer elemento del array es un objecto con datos del robot
  const check = robotprofiles.exists({robot_id: req.body[0].robot_id})
  if (!check){
    robotprofiles.create(req.body[0])
  }
  robotprofiles.updateOne({ robot_id: req.body[0].robot_id},{
    location: req.body[0].location,
    battery: req.body[0].battery,
    time_left: req.body[0].time_left,
    last_log: req.body[0].last_log
  })

  // El segundo elemento del array es un array json con logs
  for (const item of req.body.lenght[1]){
    const traps = await maptrap.find({}, {coordinates:1, _id:0})
    for (const trap of traps) {
      const maxDistance = trap.radius
      const distance = haversineDistance(trap.coordinates, req.body[0].location)
      if (distance <= maxDistance) {
        serial_data.pheromone_trap = true
        // Si encuentra una coincidencia, ya es suficiente
        break
      }
    }
    robotdata.create(item);
  }

  // Ahora tengo que devolver datos para poner en el pendrive
  const find_area = await mappolygon({id: req.body[0].robot_id})
  const find_point = await mapstart({id: req.body[0].robot_id})
  const answer = {
    polygon_coordinates: find_area,
    starting_point: find_point
  }
  res.json(answer)
})

// Funcion para calcular distancia de coordenadas en km (para la distancia robot-trampa)
function haversineDistance(coords1, coords2) {
  const R = 6371; // Radius of the Earth in kilometers

  const lat1 = coords1[0];
  const lon1 = coords1[1];
  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance; // Returns distance in kilometers
}

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
console.log("Hi")