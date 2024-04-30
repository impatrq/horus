<template>
    <header>
    <div class="space"><img :src="require('../assets/Ojo de Horus.png')" /></div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/robots">Robots</router-link> |
      <router-link to="/data">Data</router-link> |
      <router-link to="/gallery">Gallery</router-link>
    </nav>
    <span></span>
    <button class="space"><img :src="require('../assets/settings-icon.png')" alt="settings"></button> 
  </header>
</template>
    
<script>   
  export default {
  }
</script>

<style scoped>
nav {
  width: 50%;
  height: 50px;
  text-align: left;
  padding-top: 1em;
  justify-content: space-evenly;
}

span{
  width: 50%;
}

header{
  display: flex;
  width: 100%;
  height: 50px;
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
</style>