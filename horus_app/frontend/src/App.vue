<template>
  <Header />
  <Settings />
</template>

<script>
import axios from "axios"
import Header from "./components/Header"
import Settings from './components/Settings'

export default{
  name: "App",
  components: {
    Header,
    Settings,
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: white;
}

body{
  background-image: url("../src/assets/background-landscape.jpg");
  background-size: 100%;
  opacity: 0.8;
}
</style>
