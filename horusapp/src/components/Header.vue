<template>
    <header>
    <div class="space"><img :src="require('../assets/Ojo de Horus.png')" /></div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/robots">Robots</router-link> |
      <router-link to="/data">Data</router-link> |
      <router-link to="/gallery">Gallery</router-link>
    </nav>
    <Header />
    <span></span>
    <button class="space"><img :src="require('../assets/settings-icon.png')" alt="settings"></button> 
  </header>
</template>
    
<script>   
    export default {
    }
</script>