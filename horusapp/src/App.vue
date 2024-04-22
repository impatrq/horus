<template>
  <Header />
</template>

<script>
import Header from "./components/Header"

export default{
  name: "App",
  components: {
    Header,
  }
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
