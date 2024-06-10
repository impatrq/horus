<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <button>
    <RouterLink to="/">Home</RouterLink>
  </button>
  <!--[if mso]>Abajo de este comentario tenes que agregar html de Contactos<![endif]-->
  <h1>PONTE EN CONTACTO</h1>
  <div class="adress">
    <h2>Mailing Address</h2>
    <p>123 Anywhere St., Any City State, Country 12345</p>
  </div>
  <div class="mail">
    <h2>Email</h2>
    <p>agroohoruss@gmail.com</p>
  </div>
  <div class="number">
    <h2>Número Telefónico</h2>
    <p>(+54 9) 11 6939 4245</p>
  </div>
  <div class="socials">
    <h2>Socials</h2>
    <div class="imagenes">
      <div>
        <a href="">
        <img src="../../public/tiktok_logo.ico" alt="logo de TikTok">
        </a> 
      </div>
      <div>
        <a href="https://www.linkedin.com/company/agro-horus/about/">
        <img src="../../public/linkedin_logo.ico" alt="logo de Linkedin"> 
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/agro_horus/">
        <img src="../../public/instagram_logo.ico" alt="logo de Instagram">
        </a>
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
  margin: 30px 40px;
}

h1 {
  text-align: left;
  margin: 0 0 0 105px;
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

.adress {
  text-align: left;
  margin-left: 100px;
}

.mail {
  text-align: left;
  margin-left: 430px;
}

.number {
  text-align: left;
  margin-left: 100px;
}

.socials {
  text-align: left;
  margin-left: 588px;
  max-width: 1000px;
}

img {
  width: 100%;
  border-radius: 10px;
  max-width: 45px;
}

.imagenes {
  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 15px;
}

.adress, .mail {
  display: inline-block;
  padding: 5px;

}

.number, .socials {
  display: inline-block;
  padding: 5px;
}

</style>
