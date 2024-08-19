<template>
    <div class="orderbox">
        <h3>Order by</h3>
        <div class="orderfilter">
            <select v-model="ordertype">
                <option>Date</option>
                <option>Time</option>
                <option>Image ID</option>
                <option>Robot ID</option>
                <option>Plague Type</option>
                <option>Pheromone Trap</option>
                <option>Probability</option>
                <option>Location</option>
            </select>
            <select v-model="direction">
                <option>^</option>
                <option selected>∨</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const ordertype = ref();  
const direction = ref();  
</script>

<style scoped>

</style>
