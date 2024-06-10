<template>
  <header>
    <div>
      <!--[if mso]>Abajo de este comenatario agrega icono de horus<![endif]-->
      
      <img src="../../public/horus_eye.ico">
      <h2>HORUS</h2>
      
      <nav>
        <RouterLink to="/contacts">Contactos</RouterLink>
      </nav>

      <!--[if mso]>Abajo de esta comentario agrega boton de config<![endif]-->
    </div>
  </header>
  <!--[if mso]>Abajo de esta comentario agrega el html del Home<![endif]-->

  <section id="principio">
    <h1>La innovación de la agroindustria</h1>
  </section>

  <section id="objetivo">
    <div>
      <h1>Nuestro Objetivo</h1>
    </div>
    <div>
      <p>Nuestro objetivo es brindar una herramienta que permita a los productores de campo en la Argentina combatir de forma más efectiva las plagas que afectan las cosechas de soja.
      Esta herramienta permitirá reconocer las 4 plagas principales que pueden estar afectando a la planta: las orugas defoliadoras, las chinches, las arañuelas y los trips; y dar un informe detallado al usuario sobre el tipo y donde se encuentra.</p>
    </div>
  </section>

  <section id="sponsors">
    <div class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div class="mx-auto w-full max-w-xl lg:mx-0">
            <h3  class="mt-6 text-lg leading-8 text-gray-300">"Agradecidos con todos aquellos que nos brindaron su apoyo"</h3>
            <p>-Equipo HORUS</p>
              <div class="mt-8 flex items-center gap-x-6">
            </div>
          </div>
          <div class="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/tuple-logo-white.svg" alt="Tuple" width="105" height="48" />
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/reform-logo-white.svg" alt="Reform" width="104" height="48" />
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/savvycal-logo-white.svg" alt="SavvyCal" width="140" height="48" />
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/laravel-logo-white.svg" alt="Laravel" width="136" height="48" />
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/transistor-logo-white.svg" alt="Transistor" width="158" height="48" />
            <img class="max-h-12 w-full object-contain object-left" src="https://tailwindui.com/img/logos/statamic-logo-white.svg" alt="Statamic" width="147" height="48" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="nosotros">
    <div class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div class="mx-auto max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Nuestro Equipo</h2>
          <p class="mt-4 text-lg leading-8 text-gray-400">Conozcan un poco más sobre nuestro equipo y sus opiniones en base al proyecto que desarrollamos.</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          <li v-for="person in people" :key="person.name" class="rounded-2xl bg-gray-800 px-8 py-10">
            <img class="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" :src="person.imageUrl" alt="" />
            <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{{ person.name }}</h3>
            <p class="text-sm leading-6 text-gray-400">{{ person.role }}</p>
            <ul role="list" class="mt-6 flex justify-center gap-x-6">
              <li>
                <a :href="person.xUrl" class="text-gray-400 hover:text-gray-300">
                  <span class="sr-only">X</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a :href="person.linkedinUrl" class="text-gray-400 hover:text-gray-300">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <footer>
  </footer>
</template>

<style scoped>
  /* Abajo de este comentario va el css especifico del home y el nav */
</style>
