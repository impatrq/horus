<template>
    <div class="sorting-box">
        <h3>Filter by</h3>
        <select v-model="filterSelect" @change="showCateg">
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="imageId">Image ID</option>
            <option value="robotId">Robot ID</option>
            <option value="plagueType">Plague Type</option>
            <option value="pheromoneTrap">Pheromone Trap</option>
            <option value="probability">Probability</option>
            <option value="location">Location</option>
        </select>
        <div class="datepicker-box" v-if="showIfs.date">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('date')"></input>
            <input type="date" v-model="dateInput"></input>
        </div>
        <div class="timepicker-box" v-if="showIfs.time">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('time')"></input>
            <input type="time" v-model="timeInput"></input>
        </div>
        <div class="imageid-input" v-if="showIfs.imageId">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('imageId')"></input>
            <input v-model="imageIdInput" placeholder="Image ID"></input>
        </div>
        <div class="Robotid-input" v-if="showIfs.robotId">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('robotId')"></input>
            <input v-model="robotIdInput" placeholder="Robot ID"></input>
        </div>
        <div class="Plaguetype-input" v-if="showIfs.plagueType">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('plagueType')"></input>
            <input v-model="plagueTypeInput" placeholder="Plague Type"></input>
        </div>
        <div class="pheromonetrap-radio" v-if="showIfs.pheromoneTrap">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('pheromoneTrap')"></input>
            <input type="radio" name="pheromone-trap" v-model="pheromoneTrapInput">Yes</input>
            <input type="radio" name="pheromone-trap" v-model="pheromoneTrapInput">No</input>
        </div>
        <div class="Probability-input" v-if="showIfs.probability">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('probability')"></input>
            <input v-model="probabilityInput" placeholder="Probability"></input>
        </div>
        <div class="Location-input" v-if="showIfs.location">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('location')"></input>
            <input v-model="locationInput" placeholder="Location"></input>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const picked = ref(new Date())

const filtertype = ref();
const filterSelect = ref();

const listLogs = ref([]);


const dateInput = ref();
const timeInput = ref();
const imageIdInput = ref();
const robotIdInput = ref();
const plagueTypeInput = ref();
const pheromoneTrapInput = ref();
const probabilityInput = ref();
const locationInput = ref();

const showIfs = ref({
    date: false,
    time: false,
    imageId: false,
    robotId: false,
    plagueType: false,
    pheromoneTrap: false,
    probability: false,
    location: false
});


function showCateg(){
    filtertype.value = filterSelect.value
    showIfs.value[filterSelect.value] = true;
}

function hideCateg(categ){
    console.log(categ)
    showIfs.value[categ] = false;
}
</script>

<style scoped>
    button{
        width: 1rem;
        height: 100%;
    }

    div:not(.sorting-box){
        display: flex;
        width: 100%;
        padding-top: 0.5rem
    }

    .sorting-box{
        width: 100%;
    }

    .deleteCateg{
        height: 1.5rem;
        margin-right: 1rem
    }
</style>
