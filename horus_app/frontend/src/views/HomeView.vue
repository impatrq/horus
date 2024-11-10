<template>
  <div style="display:flex; min-height:80vh">
    <div ref="mapContainer" style="width: 70vw"></div>
    <div style="display:flex; flex-direction: column; background-color: #E5E5E5; padding: 2rem">
      <DateFilter @updateFilter="updateFilter" @resetFilter="resetFilter" />
      
      <h3>Map Settings:  </h3>
      <section style="display:flex; align-items: center">
        <h5>Center Map:</h5>
        <input id='center-coordinates' v-model='centerCoordinates' @change='updateCenter' placeholder="Coordinates"></input>
      </section>

      <section style="display:flex; align-items: center">
        <h5>Add Pheromone Trap: </h5>
        <input id='pheromone-trap' v-model='trapCoordinates' @change='addTrap(1)' placeholder="Coordinates"></input>
        <input id='effect-radius' v-model='trapRadius' @change='addTrap(0)' placeholder="Effect Radius(km)"></input>
      </section>

      <section style="display:flex; align-items: center">
        <h5>Add Route Starting Point: </h5>
        <input id='starting-point' v-model='startCoordinates' @change='addStart(1)' placeholder='Coordinates'></input>
        <input id='robot-id' v-model='startId' @change='addStart(0)' placeholder='Robot ID'></input>
      </section>

      <section id='area' style="display:flex; align-items: center">
        <h5>Add Survey Area: </h5>
        <div style="flex-direction: column">
          <input id='polygon1' v-model='polygonCoordinates1' @change='addPolygon(0)' placeholder='Top Left Point'></input>
          <input id='polygon2' v-model='polygonCoordinates2' @change='addPolygon(1)' placeholder='Top Right Point'></input>
          <input id='polygon3' v-model='polygonRobot_ID' @change='addPolygon(4)' placeholder='Robot ID'></input>
          <input id='polygon4' v-model='polygonCoordinates4' @change='addPolygon(3)' placeholder='Bottom Right Point'></input>
          <input v-model='polygonCoordinates3' @change='addPolygon(2)' placeholder='Bottom Left Point'></input>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import 'leaflet.offline'
import { openDB } from 'idb'
import DateFilter from '@/components/DateFilter.vue';
import OrangeIcon from '@/assets/icono-naranja-claro.png'

const map = ref();
const mapContainer = ref();
const popup = L.popup();
const centerCoordinates = ref()
let db
const offlineMap = ref()
let detectionsLayer = ref()
let trapLayer = ref()
const trapCoordinates = ref()
const trapRadius = ref()
const trapFlag = ref({
  coordinates: false,
  radius: false
})
let startLayer = ref()
const startCoordinates = ref()
const startId = ref()
const startFlag = ref({
  coordinates: false,
  id: false,
})
let polygonLayer = ref()
const polygonCoordinates1 = ref()
const polygonCoordinates2 = ref()
const polygonCoordinates3 = ref()
const polygonCoordinates4 = ref()
const polygonRobot_ID = ref()
const polygonFlag = ref({
  coordinates1: false,
  coordinates2: false,
  coordinates3: false,
  coordinates4: false,
  robot_id: false
})
const filter = ref({
  date: '',
  time: '',
  robot_id: '',
  plague_type: '',
  pheromone_trap: '',
  image_id:'',
  probability:'',
  coordinates:''
})
const zoom = ref([51.505, -0.09])

// DARK ORANGE ICON (Detecciones)

// ORANGEICON (Punto de inicio)
const orangeOptions = {
  iconUrl: OrangeIcon,
  iconSize: [10, 10]
}

const orangeIcon = L.icon(orangeOptions);

const orangeMarker = {
  title: "Starting Point",
  clickable: true,
  draggable: true,
  icon: orangeIcon
}

// BRIGHT ORANGE (ROBOT)

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map.value);
}

function updateCenter() {
  console.log(centerCoordinates.value)
  const coordinates = centerCoordinates.value.split(",").map(Number);
  map.value.setView(coordinates, 13);
  postToDB('zoom_coordinates', coordinates)
}

const storeMap = async (event) => {
  const files = event.target.files;
  const transaction = db.transaction('map', 'readwrite');
  const store = transaction.objectStore('map');
  await store.clear();
  for (const file of files) {
    await store.put({ name: file.name, file })
    await transaction.done;
  }
};

const initDB = async () => {
  db = await openDB('map-store', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('map')) {
        db.createObjectStore('map', { keyPath: 'name' })
      }
    },
  })
}

async function loadLogs() {
  try {
    const data = await fetch('http://localhost:3000/api/map/logs')
    console.log('data', data)
    const logs = await data.json();
    console.log('logs', logs)

    for (const log of logs) {
      const marker = L.marker(log.coordinates, orangeMarker).addTo(detectionsLayer)
      console.log('marker written')
      marker.bindPopup(`Trap at: ${log.coordinates[0]}, ${log.coordinates[1]}`);
      // marker.bindPopup(`Trap at: ${coordinates[0]}, ${coordinates[1]}`).openPopup();
    }    
  } catch (err) {
    alert('Server Connection Error')
  }
}

async function loadMapData() {
  try {
    let data = await fetch('http://localhost:3000/api/map/pheromone_traps')
    let elements = await data.json()
    
    for (const element of elements) {
      console.log('element', element.trap_coordinates)
      let circle = L.circle(element.trap_coordinates, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        // Leaflet uses metres not km, that's why the 1000
        radius: trapRadius.value * 1000
      }).addTo(trapLayer);
      circle.bindPopup(`Trap at: ${element.trap_coordinates[0]}, ${element.trap_coordinates[1]}`);

      circle.on('dblclick', async function() {
        trapLayer.removeLayer(circle);
        console.log(element._id)
        const api = await fetch(`http://localhost:3000/api/delete/trap_coordinates/${element._id}`, { method: 'DELETE' })
      });
    }
    console.log('hello from loadMapData')
  } catch(err) {
    alert('Server Connection Error')
    console.log('Problem loading pheromone traps', err)
  }

  try {
    let data = await fetch('http://localhost:3000/api/map/start_points')
    let elements = await data.json()

    for (const element of elements) {
      console.log('start', element)
      const marker = L.marker(element.starting_point).addTo(startLayer)
      marker.bindPopup(`Trap at: ${element.starting_point[0]}, ${element.starting_point[1]}`);

      marker.on('dblclick', async function() {
        startLayer.removeLayer(marker);
        const api = await fetch(`http://localhost:3000/api/delete/starting_point/${element._id}`, { method: 'DELETE' })
      });
    }
  } catch(err) {
    alert('Server Connection Error')
    console.log('Problem loading start points')
  }

  try {
    let data = await fetch('http://localhost:3000/api/map/polygons')
    let elements = await data.json()
    
    for (const element of elements) {
      console.log('polygon',element)
      const polygon = L.polygon([
        element.polygon_coordinates[0],
        element.polygon_coordinates[1],
        element.polygon_coordinates[2],
        element.polygon_coordinates[3]
      ]).addTo(polygonLayer);
      polygon.bindPopup(`Area de rastreo de robot $(element.id)`);

      polygon.on('dblclick', async function() {
        polygonLayer.removeLayer(polygon);
        console.log('deleting polygon')
        const api = await fetch(`http://localhost:3000/api/delete/polygon_coordinates/${element._id}`, { method: 'DELETE' })
      });
    }
  } catch(err) {
    alert('Server Connection Error')
    console.log('Problem loading polygons', err)
  }
}

const addTrap = (field) => {
  console.log(trapCoordinates.value)
  if (field === 1) {
    trapFlag.coordinates = true
  } else {
    trapFlag.radius = true
  }

  if (trapFlag.coordinates === true && trapFlag.radius === true) {
    try {
      const coordinates = trapCoordinates.value.split(',').map(Number);

      if (coordinates.length !== 2 || coordinates.some(isNaN)) {
        throw new Error('Coordenadas tienen que tener formato "x,y"');
      }

      console.log(coordinates);
      let circle = L.circle(coordinates, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        // Leaflet uses metres not km, that's why the 1000
        radius: trapRadius.value * 1000
      }).addTo(trapLayer);
      postToDB('trap_coordinates', coordinates, null, trapRadius.value);

      circle.on('dblclick', async function() {
        trapLayer.removeLayer(circle);
        console.log(element._id)
        const api = await fetch(`http://localhost:3000/api/delete/trap_coordinates/${element._id}`, { method: 'DELETE' })
      });

      trapCoordinates.value = ''
      trapRadius.value = ''
      trapFlag.radius = ''
      trapFlag.coordinates = ''
    } catch (error) {
      console.error('Error creating marker:', error.message);
      alert('Failed to create marker. Please provide valid coordinates.');
    }
  }
}

const addStart = (field) => {
  if (field === 1) {
    startFlag.coordinates = true
  } else {
    startFlag.id = true
  }

  console.log(startFlag.coordinates)
  if (startFlag.coordinates === true && startFlag.id === true) {
    console.log('hi')
    try {
      const coordinates = startCoordinates.value.split(',').map(Number);

      if (coordinates.length !== 2 || coordinates.some(isNaN)) {
        throw new Error('Coordenadas tienen que tener formato "x,y"');
      }

      const marker = L.marker(coordinates).addTo(startLayer)
      marker.on('dblclick', async function() {
        startLayer.removeLayer(marker);
        const api = await fetch(`http://localhost:3000/api/delete/starting_point/${element._id}`, { method: 'DELETE' })
      });
      postToDB('trap_coordinates', coordinates, startId.value)
      startFlag.coordinates = false
      startFlag.id = false

      startCoordinates.value = ''
      startId.value = ''
    } catch (error) {
      console.error('Error creating marker:', error.message);
      alert('Failed to create marker. Please provide valid coordinates.');
    }
  }
}

const addPolygon = (field) => {
  console.log(polygonFlag)
  if (field === 0) {
    polygonFlag.coordinates1 = true
  } else if (field === 1) {
    polygonFlag.coordinates2 = true
  } else if (field === 2) {
    polygonFlag.coordinates3 = true
  } else if (field === 3){
    polygonFlag.coordinates4 = true
  } else {
    polygonFlag.robot_id = true
  }

  if (polygonFlag.coordinates1 === true && polygonFlag.coordinates2 === true && polygonFlag.coordinates3 === true && polygonFlag.coordinates4 === true && polygonFlag.robot_id === true ) {
    console.log('hi')
    try {
      const coordinates = [
        polygonCoordinates1.value.split(',').map(Number),
        polygonCoordinates2.value.split(',').map(Number),
        polygonCoordinates3.value.split(',').map(Number),
        polygonCoordinates4.value.split(',').map(Number)
      ];

      console.log(coordinates)
      const polygon = L.polygon([
        coordinates[0],
        coordinates[1],
        coordinates[2],
        coordinates[3]
      ]).addTo(polygonLayer);

      polygon.on('dblclick', async function() {
        polygonLayer.removeLayer(polygon);
        console.log('deleting polygon')
        const api = await fetch(`http://localhost:3000/api/delete/polygon_coordinates/${element._id}`, { method: 'DELETE' })
      });

      postToDB('polygon_coordinates', coordinates, polygonRobot_ID.value)
      polygonFlag.coordinates1 = false
      polygonFlag.coordinates2 = false
      polygonFlag.coordinates3 = false
      polygonFlag.coordinates4 = false
      polygonFlag.robot_id = false

      polygonCoordinates1.value = ''
      polygonCoordinates2.value = ''
      polygonCoordinates3.value = ''
      polygonCoordinates4.value = ''
      polygonRobot_ID.value = ''
    } catch (error) {
      console.error('Error creating polygon:', error.message);
      alert('Failed to create marker. Please provide valid coordinates.');
    }
  }
}

async function postToDB(type, coordinates, id, radius) {
  console.log('echo in postToDB')
  const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    [type]: coordinates,
    ...(id !== null && { id }),
    ...(radius !== null && { radius })
  })};
  const response = await fetch(`http://localhost:3000/api/store/${type}`, requestOptions);
}

const updateFilter = async ({ key, value }) => {
  filter.value[key] = value
  console.log(filter.value.date)
  try{
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      ...(filter.value.date ? { date: filter.value.date } : {}), 
      ...(filter.value.time ? { time: filter.value.time } : {}),
      ...(filter.value.robot_id ? { robot_id: filter.value.robot_id } : {}),
      ...(filter.value.plague_type ? { plague_type: filter.value.plague_type } : {}),
      ...(filter.value.pheromone_trap ? { pheromone_trap: filter.value.pheromone_trap } : {}),
      ...(filter.value.image_id ? { image_id: filter.value.image_id } : {}),
      ...(filter.value.probability ? { probability: filter.value.probability } : {}),
      ...(filter.value.coordinates ? { coordinates: filter.value.coordinates } : {}),
  })};
  const response = await fetch("http://localhost:3000/api/map/filter", requestOptions);
  const data = await response.json()

  detectionsLayer.clearLayers();
  for (const log of data) {
    const marker = L.marker(log.coordinates).addTo(detectionsLayer)
    console.log('marker written')
    // marker.bindPopup(`Trap at: ${coordinates[0]}, ${coordinates[1]}`).openPopup();
  }
  } catch (err) {
    console.log("Error al fetchear luego de actualizar filtro")
  }
}

const resetFilter = async (key) => {
  filter.value[key] = ''
  try{
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      ...(filter.value.date ? { date: filter.value.date } : {}), 
      ...(filter.value.time ? { time: filter.value.time } : {}),
      ...(filter.value.robot_id ? { robot_id: filter.value.robot_id } : {}),
      ...(filter.value.plague_type ? { plague_type: filter.value.plague_type } : {}),
      ...(filter.value.pheromone_trap ? { pheromone_trap: filter.value.pheromone_trap } : {}),
      ...(filter.value.image_id ? { image_id: filter.value.image_id } : {}),
      ...(filter.value.probability ? { probability: filter.value.probability } : {}),
      ...(filter.value.coordinates ? { coordinates: filter.value.coordinates } : {}),
    })};
    const response = await fetch("http://localhost:3000/api/map/filter", requestOptions);
    const data = await response.json()

    detectionsLayer.clearLayers();
    for (const log of data) {
      const marker = L.marker(log.coordinates).addTo(detectionsLayer)
      console.log('marker written')
      // marker.bindPopup(`Trap at: ${coordinates[0]}, ${coordinates[1]}`).openPopup();
    }
  } catch (err) {
    console.log("Error al fetchear luego de actualizar filtro")
  }
}

const storeZoom = async () => {
  postToDB()
}

const getZoom = async () => {
  try {
    const data = await fetch("http://localhost:3000/api/map/zoom")
    const res = await data.json()
    if (res.lenght != 0) {
      zoom.value = res.zoom_coordinates
    }
  } catch (err) {
    alert('Server Connection Error')
  }
}

function downloadTiles() {
  baseLayer.getStorage().startDownload([13,14,15]);
}

onMounted(async () => {
  console.log(zoom.value)
  await initDB();
  await getZoom();
  console.log(zoom.value)
  map.value = L.map(mapContainer.value, {doubleClickZoom: false}).setView(zoom.value, 13);
  const baseLayer = L.tileLayer.offline("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    doubleClickZoom: false,
    zoomAnimation: false,
  }).addTo(map.value);

  const controlSaveTiles = L.control.savetiles(
    baseLayer, 
    {
      zoomlevels: [13, 14, 15, 16],
      saveText: '💾',
      rmText: '🗑️',
      saveWhatYouSee: true
    }
  ).addTo(map.value);

  detectionsLayer = L.layerGroup().addTo(map.value) 
  trapLayer = L.layerGroup().addTo(map.value)
  startLayer = L.layerGroup().addTo(map.value)
  polygonLayer = L.layerGroup().addTo(map.value)

  map.value.on('click', onMapClick);
  await loadLogs();
  await loadMapData();
  
  L.control.layers({}, {
    'Detections': detectionsLayer,
    'Pheromone Traps': trapLayer,
    'Starting Points': startLayer,
    'Detection Areas': polygonLayer
  }, { collapsed: false }).addTo(map.value);
});
</script>

<style scoped>
h5 {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-right: 1em
}

.hidden{
  display: none;
}

.button{
  display: inline-block;
  padding: 1px 6px;
  margin: 0;
  font-size: 13px;
  line-height: normal;
  text-align: center;
  cursor: pointer;
  background-color: buttonface;
  color: buttontext;
  border-width: 1px;
  border-style: outset;
  border-radius: 3px;
  border-color: gray;
  margin-right: 1vw
}

</style>