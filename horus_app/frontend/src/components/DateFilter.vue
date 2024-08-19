<template>
    <div class="sorting-box">
        <h3>Filter by</h3>
        <select v-model="filtertype" @change="$emit('filterChange')">
            <option>Date</option>
            <option>Time</option>
            <option>Image ID</option>
            <option>Robot ID</option>
            <option>Plague Type</option>
            <option>Pheromone Trap</option>
            <option>Probability</option>
            <option>Location</option>
        </select>
        <div class="datepicker-box" v-if="filtertype === 'Date'">
            <Datepicker class="datepicker" v-model="picked" typeable></Datepicker>
        </div>
        <div class="timepicker-box" v-if="filtertype === 'Time'">
            <input type="time"></input>
        </div>
        <div class="imageid-input" v-if="filtertype === 'Image ID'">
            <input></input>
        </div>
        <div class="Robotid-input" v-if="filtertype === 'Robot ID'">
            <input></input>
        </div>
        <div class="Plaguetype-input" v-if="filtertype === 'Plague Type'">
            <input></input>
        </div>
        <div class="pheromonetrap-radio" v-if="filtertype === 'Pheromone Trap'">
            <input type="radio" name="pheromone-trap">Yes</input>
            <input type="radio" name="pheromone-trap">No</input>
        </div>
        <div class="Probability-input" v-if="filtertype === 'Probability'">
            <input></input>
        </div>
        <div class="Location-input" v-if="filtertype === 'Location'">
            <input></input>
        </div>
    </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())

const state = ref({
    searchResults: [],
    noSearch: true
});

const filtertype = ref();

const listLogs = ref([]);

async function getData() {
    const res = await fetch("http://localhost:3000/api/");
    const finalRes = await res.json();
    listLogs.value = finalRes;
    console.log(finalRes)
}

async function searchData() {
    const res = await fetch("http://localhost:3000/api/filter");
    const finalRes = await res.json();
}
</script>

<style scoped>
    .datepicker-box{
        width: 40%;
    }

    .datepicker{
        width: 100%;
    }
</style>
