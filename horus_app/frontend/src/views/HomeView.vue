<template>
  <div ref="mapContainer" style="width: 90vw; height: 400px"></div>

  <input id='center-coordinates' v-model='centerCoordinates' @change='updateCenter'></input>

  <input type='file' id='offline-map'></input>

  <input id='pheromone-trap'></input>
  
  <input id='starting-point'></input>

  <section id='area'>
    <input id='polygono1'></input>
    <input id='polygono2'></input>
    <input id='polygono3'></input>
    <input id='polygono4'></input>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const popup = L.popup();
const centerCoordinates = ref()

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

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      map.value.setView([lat.value, lng.value], 13);

      L.marker([lat.value, lng.value],{draggable : true})
      .addTo(map.value)
      .on("dragend",(event)=> {
         console.log(event)
      });
    });
  }
}
</script>

<style>
</style>