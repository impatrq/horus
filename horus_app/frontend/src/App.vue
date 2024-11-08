<template>
  <!-- <div class="title-bar">
    <button class="window-controls" @click="closeWindow">-</button>
    <button class="window-controls" @click="maximizeWindow">[]</button>
    <button class="window-controls" @click="closeWindow">X</button>
  </div> -->
  <Header />
  <RouterView />
</template>

<script setup>
import Header from "./components/Header"
import { RouterView } from 'vue-router'

function minimizeWindow() {
  window.api.send('minimize-window');
}

function maximizeWindow() {
  window.api.send('maximize-window');
}

function closeWindow() {
  window.api.send('close-window');
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

body{
  background-image: url("../src/assets/background-filtered.jpg");
  background-size: 100%;
}

html,body,#app{
  width: 100vw;
  height: 100vh;
  margin: 0px
}

::-webkit-scrollbar {
  display: none;
}

RouterView {
  height: 90vh
}

.title-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #F0F0F0;
  height: 30px;
}

.window-controls {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  margin-left: 10px;
  height: 80%
}

.window-controls button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
