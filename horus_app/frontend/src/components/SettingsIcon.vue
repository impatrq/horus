<template>
    <button @click="$emit ('OnClick')" class="space">
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
</style>