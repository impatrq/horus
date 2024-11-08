<template>
  <header>
    <div class="image"><img :src="require('../assets/Ojo de Horus.png')" /></div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/robots">Robots</RouterLink> |
      <RouterLink to="/data">Data</RouterLink> |
      <RouterLink to="/gallery">Gallery</RouterLink>
    </nav>
    <span></span>
    <SettingsIcon @OnClick="showSettings= !showSettings"/>
  </header>
  <Settings class="z-01" v-if="showSettings" />
</template>
    
<script setup>   
  import Settings from "./Settings.vue"
  import SettingsIcon from "./SettingsIcon.vue"
  
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'

  const showSettings = ref(false)
</script>

<style scoped>
nav {
  display: flex;
  width: 50%;
  height: 50px;
  text-align: left;
  justify-content: space-around;
  align-items: center
}

span{
  width: 50%;
}

header{
  display: flex;
  width: 100vw;
  height: 7vh;
  background-color: white;
  color: #2c3e50;
  align-items: center
}

.space {
  width: 10%;
  max-width: 3em;
  background-color: white;
  border: 0px; 
  margin-left: 2em;
  margin-right: 1em;
}

img {
  width: 100%;
}


nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.image {
  width: 4rem;
  padding-left: 0.8rem;
  padding-right: 0.4rem;
}

.z-01 {
  z-index: 801;
  position: fixed;
  right: 1vh;
}
</style>