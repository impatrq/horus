<template>
    <Header />
    <RouterView />
</template>

<script setup>
import Header from "./components/Header"
import { RouterView } from 'vue-router'
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

</style>
