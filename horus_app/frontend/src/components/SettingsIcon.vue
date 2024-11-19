<template>
    <button @click="$emit ('OnClick')">
        <img :src="require('../assets/settings-icon.png')" alt="settings">
    </button> 
</template>

<script setup>
    import { ref } from 'vue'
</script>

<style scoped>
    .image {
        width: 4rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
    }
    img, button {
        width: 100%;
    }
    button {
        border: none;
        align-self: right;
        width: 4%;
        background-color: white
    }
    button:hover {
        background-color: #CCCCCC
    }
</style>