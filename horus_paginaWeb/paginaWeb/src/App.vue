<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './views/HomeView.vue'
</script>

<template>
    <RouterView />
</template>

<style>
@font-face {
    font-family: Abril_Fatface;
    src: url('../public/Abril_Fatface/AbrilFatface-Regular.ttf');
}
@font-face {
    font-family: Open_Sauce;
    src: url('../public/open-sauce/OpenSauceOne-Bold.ttf');
}
@font-face {
    font-family: Poppins;
    src: url('../public/Poppins/Poppins-Regular.ttf');
}

@font-face {
    font-family: Nunito;
    src: url('../public/Nunito/static/Nunito-Regular.ttf');
}

@font-face {
    font-family: Nunito-Bold;
    src: url('../public/Nunito/static/Nunito-Bold.ttf');
}

body {
    background-color: #223D3C;
    margin: 0;
}
body, html {
    width: 100vw;
}

</style>
