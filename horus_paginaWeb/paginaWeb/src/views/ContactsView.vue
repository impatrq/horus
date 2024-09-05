<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="btn"><button>Home</button></RouterLink>
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
            <a href="https://www.tiktok.com/@agro_horus?_t=8p5c2ynrSwY&_r=1">
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


.btn button{
  font-weight: 700;
  font-size: 1.1rem;
  color: #1b3039;
  padding: 9px 20px;
  margin: 2% 3% 0;
  background: #eceff1;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.btn button:hover{
  background-color: #e2f1f8;
  color: #ffbc0e;
  transform: scale(1.1);
}

h1 {
  text-align: left;
  margin: 0 0 0 8rem;
  font-size: 6.5rem;
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
  flex-wrap: no-wrap;
  justify-content: space-between;
  width: 100vw;
  margin: 2rem 10rem;
}

.reng1 {
  display: flex;
  flex-wrap: wrap;
  gap: 20%;
  width: 80%;
  margin-bottom: 3rem;
}

.reng2 {
  display: flex;
  flex-wrap: wrap;
  gap: 20%;
  width: 80%;
}

.adress {
  align: left;
  padding: 1%;
  width: 50%;
}

.mail {
  padding: 1%;
}

.number {
  align: left;
  padding: 1%;
  width: 50%;
}

.socials {
  align: right;
  padding: 1%;
  width: 15%;
}

.socialimg {
  width: 4rem;
}

img {
  width: 2rem;
  height: 100%;
  border-radius: 10%;
}

.imagenes {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}


@media only screen and (max-width: 1440px) {

h1 { font-size: 7rem; }

h2 { font-size: 2rem; }

p { font-size: 1rem; }

}

@media only screen and (max-width: 768px) {

h1 { font-size: 3rem; margin-top: 4rem; }

h2 { font-size: 1.7rem; }

p { font-size: 0.8rem; }

}

@media only screen and (max-width: 500px) {

.btn button { margin-top: 1rem; }

h1 { font-size: 4rem; text-align: center;  margin-top: 1rem; }

h2 { font-size: 2rem; }

p { font-size: 1rem; }

.info .reng1 { margin-bottom: 0;}

.info .reng1 .adress { width: 100%; }

.info .reng2 .number { width: 100%; }

}

@media only screen and (max-width: 350px) {

h1 { font-size: 3rem; }

h2 { font-size: 2rem; }

p { font-size: 1rem; }

.info .reng1 .adress { width: 100%; }

.info .reng2 .number { width: 100%; }

}


</style>
