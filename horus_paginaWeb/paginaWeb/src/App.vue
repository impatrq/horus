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

body {
    background-color: #223D3C;
}
</style>
