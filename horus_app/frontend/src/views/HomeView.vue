<template>
  <div style="display:flex; min-height:80vh">
    <div ref="mapContainer" style="width: 70vw"></div>
    <div style="display:flex; flex-direction: column; background-color: #E5E5E5; padding: 2rem">
      <DateFilter @updateFilter="updateFilter" @resetFilter="resetFilter" />
      
      <h3>Configuración de Mapa:  </h3>
      <section style="display:flex; align-items: center">
        <h5>Centrar mapa:</h5>
        <input id='center-coordinates' v-model='centerCoordinates' @change='updateCenter'></input>
      </section>

      <section style="display:flex; align-items: center">
        <h5>Subir mapa offline: </h5>
        <input type='file' id='offline-map' @change='storeMap' class='hidden'></input>
        <label for='offline-map' class='button'>Mapa Offline</label>
      </section>

      <section style="display:flex; align-items: center">
        <h5>Agregar trampa de feromona: </h5>
        <input id='pheromone-trap' v-model='trapCoordinates' @change='addTrap'></input>
      </section>

      <section style="display:flex; align-items: center">
        <h5>Agregar punto de inicio de ruta de robot: </h5>
        <input id='starting-point'></input>
        <input id='robot-id'</input>
      </section>

      <section id='area' style="display:flex; align-items: center">
        <h5>Agregar área de reconocimiento: </h5>
        <div style="flex-direction: column">
          <input id='polygon1'></input>
          <input id='polygon2'></input>
          <input id='polygon3'></input>
          <input id='polygon4'></input>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import { openDB } from 'idb'
import DateFilter from '@/components/DateFilter.vue';

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const popup = L.popup();
const centerCoordinates = ref()
let db
const offlineMap = ref()
let detectionsLayer = ref()
let trapLayer = ref()
const trapCoordinates = ref()

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map.value);
}

function updateCenter() {
  console.log(centerCoordinates.value)
  const [latitude, longitude] = centerCoordinates.value.split(",").map(Number);
  lat.value = latitude
  lng.value = longitude
  map.value.setView([lat.value, lng.value], 13);
  console.log(typeof lat.value, typeof lng.value)
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

const loadImagesFromDB = async () => {
  noImages.value = false
  const tx = db.transaction('images', 'readonly');
  const store = tx.objectStore('images');
  const allImages = await store.getAll();
  
  if (!images.value || images.value.length === 0){
    noImages.value = true
  } else {
    noImages.value = false
  }
};

async function loadLogs() {
  const data = await fetch('http://localhost:3000/api/map')
  console.log('data', data)
  const logs = await data.json();
  console.log('logs', logs)

  if (!detectionsLayer.value) {
    detectionsLayer = L.layerGroup().addTo(map.value)
    console.log('layer created')
  }

  if (!trapLayer.value) {
  trapLayer = L.layerGroup().addTo(map.value)
  console.log('layer created')
  }

  for (const log of logs) {
    const marker = L.marker(log.coordinates).addTo(detectionsLayer)
    console.log('marker written')
    marker.bindPopup(`Trap at: 1, 2`);
    // marker.bindPopup(`Trap at: ${coordinates[0]}, ${coordinates[1]}`).openPopup();
  }
}

const addTrap = () => {
  const coordinates = trapCoordinates.value.split(',').map(Number);
  console.log(coordinates)
  const marker = L.marker(coordinates).addTo(trapLayer)
  postToDB('trap_coordinates', 'polygon_coordinates', 'starting_point', coordinates[0], coordinates[1])
}

async function postToDB(type, noTypeOne, noTypeTwo, coordinates_x, coordinates_y) {
  const coordinates = [coordinates_x, coordinates_y]
  const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    [type]: coordinates,
    [noTypeOne]: null,
    [noTypeTwo]: null
  })};
  const response = await fetch("http://localhost:3000/api/store", requestOptions);
}

const filter = () => {

}

onMounted(async () => {
  await initDB();
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  const baseLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  const circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
  }).addTo(map.value);

  const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(map.value);

  const marker = L.marker([51.5, -0.09]).addTo(map.value);

  map.value.on('click', onMapClick);
  await loadLogs();
  
  L.control.layers({}, {
    'Detecciones': detectionsLayer,
    'Pheromone Traps': trapLayer
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