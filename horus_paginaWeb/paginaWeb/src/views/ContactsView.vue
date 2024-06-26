<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <button>
    <RouterLink to="/">Home</RouterLink>
  </button>
  <!--[if mso]>Abajo de este comentario tenes que agregar html de Contactos<![endif]-->
  <h1>PONTE EN CONTACTO</h1>
  <div class="info">
    <div class="reng1">
      <div class="adress">
        <h2>Mailing Address</h2>
        <p>123 Anywhere St., Any City State, Country 12345</p>
      </div>
      <div class="mail">
        <h2>Email</h2>
        <p>agroohoruss@gmail.com</p>
      </div>
    </div>
    <div class="reng2">
      <div class="number">
        <h2>Número Telefónico</h2>
        <p>(+54 9) 11 6939 4245</p>
      </div>
      <div class="socials">
        <h2>Socials</h2>
        <div class="imagenes">
          <div class="socialimg">
            <a href="">
            <img src="../../public/tiktok_logo.ico" alt="logo de TikTok">
            </a> 
          </div>
          <div class="socialimg">
            <a href="https://www.linkedin.com/company/agro-horus/about/">
            <img src="../../public/linkedin_logo.ico" alt="logo de Linkedin"> 
            </a>
          </div>
          <div class="socialimg">
            <a href="https://www.instagram.com/agro_horus/">
            <img src="../../public/instagram_logo.ico" alt="logo de Instagram">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Abajo de este comentario va el css especifico de la parte de contactos */
button {
  width:100%;
  max-width: 100px;
  font-size: 30px;
  margin: 1% 2.5%;
}

h1 {
  text-align: left;
  margin: 0 0 0 8rem;
  font-size: 100px;
  font-family: Abril_Fatface;
  color: #1DCD8D;
}

h2 {
  font-family: Open_Sauce;
  color: #1DCD8D;
}

p{
  font-family: Open_Sauce;
  color: #ffffff;
}

.info {
  flex-wrap: wrap;
  width: 70%;
  margin: 2rem 0 0 10rem;
}

.reng1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.reng2 {
  display: flex;
  justify-content: space-between;
}

.adress {
  align: left;
  padding: 1%;
}

.mail {
  align: right;
  padding: 1%;
}

.number {
  align: left;
  padding: 1%;
}

.socials {
  align: right;
  padding: 1%;
  width: 15%;
  margin-right: 6.6%;
}

.socialimg {
  width: 3rem;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 10%;
  max-width: 70%;
}

.imagenes {
  align-items: center;
  display: flex;
  gap: 0rem;
}


</style>
