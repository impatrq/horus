<template>
    <div @click="$emit('zoom-in', source)">
        <img :src="source" alt="Loaded Image" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    source: String
})
</script>

<style>
    img{
        width: 100%
    }
</style>