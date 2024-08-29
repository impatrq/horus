<template>
  <header class="header">
      <div class="logo">
        <img src="../../public/Logo-Photoroom.png" alt="Logo de la marca">
        <span>HORUS</span>
      </div>
      <RouterLink to="/contacts" class="btn"><button>CONTACTANOS</button></RouterLink>
  </header>
  <!--[if mso]>Abajo de esta comentario agrega el html del Home<![endif]-->


  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>La innovación de la agroindustria</h1>
        <hr>
        <p>Te contamos un poco sobre nosotros más abajo</p>
      </div>  
    </div>
  </section>

  <section class="objective-section">
      <hr class="up">
      <div class="text">
        <h2>Nuestro Objetivo</h2>
        <p>Nuestro objetivo es brindar una herramienta que permita a los productores de campo en la Argentina combatir de forma más efectiva las plagas que afectan las cosechas de soja.</p>
        <p>Esta herramienta permitirá reconocer las 4 plagas principales que pueden estar afectando a la planta: las orugas defoliadoras, las chinches, las arañuelas y los trips; y dar un informe detallado al usuario sobre el tipo y donde se encuentra.</p>
      </div>
      <div class="cell">
        <img src="../../public/manos-guantes.png" alt="react logo">
      </div>
      <hr class="down">
  </section>

  
  <section class="features-section">
    <div class="feature">
      <div class="illustration">
        <img src="../../public/images.jpg" alt="Impa logo">
      </div>
      <div class="text-info">
        <p>"Agradecidos con todos aquellos que nos brindaron su apoyo"</p>
        <h3>Equipo HORUS</h3>
      </div>
    </div>
  </section>

  <section id="team-section">
    <div class="team-title">
      <h1>Nuestro Equipo</h1>
      <p>Conozcan un poco más sobre nuestro equipo y sus opiniones en base al proyecto que desarrollamos</p>
    </div>
    <div class="team-cards">
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/lara.jpg" alt="Lara Díaz">
        </div>
        <div class="team-detail">
          <p>El desarrollo de la IA fue muy complicado pero eso no me detuvo. Superé los desafíos y alcancé las metas establecidas</p>
          <h3>Díaz, Lara</h3>
        </div>
      </div>
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/mateo.jpg" alt="Mateo Kearney">
        </div>
        <div class="team-detail">
          <p>Si le preguntases a Chat GPT que te dé un proyecto invaluable, HORUS sería su respuesta. Propuse una idea innovadora y mi equipo no dudó en trabajar en ella para desarrollarla.</p>
          <h3>Kearney, Mateo</h3>
        </div>
      </div>
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/nacho.jpg" alt="Juan Ignacio Torres">
        </div>
        <div class="team-detail">
          <p>Sin comentarios. Déjame en paz!</p>
          <h3> Torres, Juan Ignacio</h3>
        </div>
      </div>
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/ferrante.jpg" alt="Santino Ferrante">
        </div>
        <div class="team-detail">
          <p>Para la gente común diseñar es complicado, para mí es muy fácil</p>
          <h3> Ferrante, Santino</h3>
        </div>
      </div>
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/abril.jpg" alt="Abril Contreras">
        </div>
        <div class="team-detail">
          <p>Muy lindo.</p>
          <h3> Contreras, Abril</h3>
        </div>
      </div>
      <div class="team-card">
        <div class="team-image">
          <img src="../../public/marito.jpg" alt="Martin Cabrera">
        </div>
        <div class="team-detail">
          <p>Sin mí no serían nada</p>
          <h3> Cabrera, Martin</h3>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="foot">
      <div class="logo-container">
        <img src="../../public/Logo-Photoroom.png" alt="Horus logo" class="logo">
      </div>
      <div class="social-icons-container">
        <a href="https://www.instagram.com/agro_horus/" class="social-icon"></a>
        <a href="https://www.linkedin.com/company/agro-horus/about/" class="social-icon"></a>
        <a href="" class="social-icon"></a>
      </div>
      <ul class="footer-menu-container">
        <li class="menu-item">Tel +54 9 11 6939-4245</li>
        <li class="menu-item">agroohoruss@gmail.com</li>
      </ul>
      <div class="copyright">
        <span>HORUS Ⓒ All Rights Reserved. Designed by Kearney Mateo</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  /* Abajo de este comentario va el css especifico del home y el nav */



.header{
    background: linear-gradient(90deg, rgb(34, 61, 60), rgb(50, 112, 95), rgb(34, 61, 60));
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8%;
    padding: 5px 7%;
    margin: 0;
}

.header .logo{
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 2%;
}

.header .logo img{
    height: 2rem;
    width: auto;
    transition: all 0.3s;
}

.header .logo img:hover{
    transform: scale(1.2);
}

.header .logo span {
  font-family: Poppins;
  font-size: 2rem;
  color: #ffffff;
}

.header .btn button{
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}

.header .btn button:hover{
    background-color: #e2f1f8;
    color: #ffbc0e;
    transform: scale(1.1);
}


@media only screen and (max-width: 1024px) {

.header .logo span { font-size: 2rem; }

}

@media only screen and (max-width: 768px) {

.header .logo span{ font-size: 1.5rem; }

.header .logo img { height: 1.5rem; width: auto; }

.header .btn button { padding: 6,8px 1%; }

}

@media only screen and (max-width: 500px) {

.header .logo span { font-size: 1rem; }

.header .logo img { height: 1rem; width: auto; }

.header .btn button { padding: 4px 3.4%; }

}

@media only screen and (max-width: 350px) {

.header .logo span { font-size: 0.7rem; }

.header .logo img { height: 0.7rem; width: auto; }

.header .btn button { padding: 3.1px 1%; }

}







.hero {
  display: flex;
  text-align: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: url(../../public/tractor.jpg) no-repeat center center/cover;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content:"";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.65)
}

.hero * {
  z-index: 1;
}

.container {
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
}

.hero .container .hero-content hr {
  margin: 1% 25%;
}

.hero .container .hero-content h1 {
  font-size: 2.7rem;
  font-family: Poppins;
  color: #ffffff;
  margin-bottom: 0;
}

.hero .container .hero-content p {
  font-size: 1.9rem;
  font-family: Poppins;
  color: #ffffff;
}




@media only screen and (max-width: 1024px) {

.hero .container .hero-content h1 { font-size: 2.7rem; }

}

@media only screen and (max-width: 768px) {

.hero .container .hero-content h1 { font-size: 2rem; }

.hero .container .hero-content p { font-size: 1.2rem; }

}

@media only screen and (max-width: 500px) {

.hero .container .hero-content h1 { font-size: 2rem; }

.hero .container .hero-content p { font-size: 1.2rem; }

}

@media only screen and (max-width: 350px) {

.hero .container .hero-content h1 { font-size: 1.4rem; }

.hero .container .hero-content p { font-size: 0.8rem; }

}


.up {
  width: 100%;
}

.down {
  width: 100%;
}

.objective-section {
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 7% 3% 8% ;
  gap: 40px;
  background: linear-gradient(90deg, rgb(34, 61, 60), rgb(50, 112, 95), rgb(34, 61, 60));
}

.objective-section .text {
  flex: 5;
}

.objective-section .text h2 {
  font-size: 4rem;
  margin-top: 0;
  margin-bottom: 2rem;
  font-family: Poppins;
  color:#1DCD8D;
}

.objective-section .text p {
  font-size: 150%;
  color: #ffffff;
}

.objective-section .text {
  display: inline-block;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: .1s;
  font-family: Nunito-Bold;
}

.objective-section .cell img {
  width: 23rem;
  border-radius: 50%;
}



@media only screen and (max-width: 1440px) {

.hero .container .hero-content h1 { font-size: 5,6rem; }

.hero .container .hero-content p { font-size: 210,9%; }

.objective-section .cell img { width: 23rem; }

}

@media only screen and (max-width: 768px) {

.objective-section .text h2 { font-size: 3rem; }

.objective-section .text p { font-size: 112,5%; }

.objective-section .cell img { width: 17.3rem; }

}

@media only screen and (max-width: 500px) {

.objective-section .text h2 { font-size: 2rem; }

.objective-section .text p { font-size: 73,2%; }

.objective-section .cell img { width: 11.2rem; }

.objective-section .text { text-align: center; margin-bottom: 0; }

.objective-section { flex-direction: column; gap: 10px; }

}

@media only screen and (max-width: 350px) {

.objective-section .text h2 { font-size: 2rem; }

.objective-section .text p { font-size: 80%; }

.objective-section .cell img { width: 7.9rem; }

.objective-section .text { text-align: center; margin-bottom: 0; }

.objective-section { flex-direction: column; gap: 10px; }

}







.features-section {
  padding: 5rem 2rem 7rem 2rem;
}

.feature {
  display: flex;
  justify-content: space-between;
  height: 15rem;
  margin-bottom: 45px;
  padding: 55px 55px 55px 55px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5rem;
  background-color: #231F1F;
}

.feature .text-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  color: #1DCD8D;
  font-family: Nunito;
}

.feature .text-info p {
  color: var(--grayish-blue);
  font-size: 2rem;
  margin-bottom: 0;
}

.feature .text-info h3 {
  font-size: 1.9rem;
}


.feature .illustration {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature .illustration img {
  height: 20rem;
  width: 20rem;
}



@media only screen and (max-width: 1440px) {

.feature .illustration img { height: ; width: ; }

.feature .text-info h3 { font-size: 2.7rem; }

.feature .text-info p { font-size: 2.8rem; }

}

@media only screen and (max-width: 768px) {

.feature .illustration img { height: 15rem; width: 15rem; }

.feature .text-info h3 { font-size: 1.4rem; }

.feature .text-info p { font-size: 1.5rem; }

}

@media only screen and (max-width: 500px) {

.feature { height: 10rem; }

.feature .illustration img { height: 8.8rem; width: 8.8rem; }

.feature .text-info h3 { font-size: 0.9rem; }

.feature .text-info p { font-size: 1rem; }

}

@media only screen and (max-width: 350px) {

.feature { height: 5rem; }

.feature .illustration img { height: 6.8rem; width: 6.8rem; }

.feature .text-info h3 { font-size: 0.6rem; }

.feature .text-info p { font-size: 0.7rem; }

}







.team-section{
  margin-top: 75px;
  background-color: #ff000f;
}

.team-title h1{
  font-size: 50px;
  font-family: Nunito;
  color:#1DCD8D;
  text-align: center;
  position: relative;
}

.team-title p{
  font-size: 25px;
  font-family: Nunito;
  color: #fff;
  text-align: center;
  position: relative;
}

.team-cards{
  width:85vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
}

.team-card{
  background-color: #F4F4F4;
  border-radius: 50px;
  box-shadow: 0px 2px 5px rgba(0,0,0, 0.2);
  margin: 10px;
  padding:20px;
  text-align: center;
  transition: transform 0.6s ease;  
  width: calc(33.33% - 40px);
  box-sizing: border-box;
}

.team-card:hover{
  transform: translateY(-12px);
}

.team-image img{
  border-radius: 50%;
  height:130px;
  width:130px;
  object-fit: cover;
  margin-bottom: 10px;
}

.team-detail h3{
  color:#1DCD8D;
  font-size: 30px;
  font-family: Nunito;
  margin:15px 0px;
}

.team-detail p{
  color:#000000;
  font-size: 18px;
  font-family: Nunito;
}

@media screen and (max-width: 768px){

.team-cards{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.team-card{
  width:85%;
  margin:25px auto;
}

}








.foot {
  width: 100vw;
  position: absolute;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #111B1B;
}

.logo-container{
  width: 9.5%;
  margin-top: 0.7rem;
  margin-bottom: 1rem;
  justify-content: center;
  display: flex;
}

.logo {
  width: 50%;
}

.social-icons-container, .footer-menu-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.social-icon{
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 1px solid #f2f2f2;
  background-image: url(../assets/InstagramBlanco.png);
  background-position: center;
  background-size: 40%;
  background-repeat: no-repeat;
  margin: 1rem;
}

.social-icon:hover{
  background-color: #121212;
  filter: invert(1);
}

.social-icon:nth-of-type(2){
  background-image: url(../assets/LinkedinBlanco.png);
}
.social-icon:nth-of-type(3){
  background-image: url(../assets/Github.png);
}


.footer-menu-container{
  list-style-type: none;
  color: #f2f2f2;
  font-size: 18px;
  padding: 0;
}

.menu-item{
  margin: 1rem 1.5rem;
  cursor: pointer;
  opacity: 0.6;
}

.menu-item:hover{
  opacity: 1;
}

.copyright{
  color: #f2f2f2;
  opacity: 0.3;
  text-align: center;
}

@media only screen and (max-width: 500px) {

.foot .logo-container .logo { width: 100%; }

.foot .logo-container { margin-top: 1rem; width: 15%;}

.foot .social-icons-container { margin-bottom: 0; }

.foot .footer-menu-container { margin-top: 0; }

}

@media only screen and (max-width: 350px) {

.foot .logo-container .logo { width: 100%; }

.foot .logo-container { margin-top: 1rem; width: 15%;}

.foot .social-icons-container { margin-bottom: 0; }

.foot .footer-menu-container { margin-top: 0; }

}

</style>
