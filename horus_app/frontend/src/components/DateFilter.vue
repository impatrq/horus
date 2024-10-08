<template>
    <div class="sorting-box">
        <h3>Filtrar por:</h3>
        {{filterInput.value}}
        <select v-model="filterSelect" @change="showCateg">
            <option value="date">Día</option>
            <option value="time">Hora</option>
            <option value="imageId">ID Imagen</option>
            <option value="robotId">ID Robot</option>
            <option value="plagueType">Tipo de Plaga:</option>
            <option value="pheromoneTrap">Trampa de feromona:</option>
            <option value="probability">Probabilidad:</option>
            <option value="location">Coordenadas:</option>
        </select>
        <!-- <FilterInput :inputType="date" :showIf="false" /> -->
        <div class="datepicker-box" v-if="showIfs.date">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('date')"></input>
            <input type="date" v-model="filterInput.date" @change="updateFilter('date', filterInput.date)"></input>
        </div>
        <div class="timepicker-box" v-if="showIfs.time">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('time')"></input>
            <input type="time" v-model="filterInput.time" @change="updateFilter('time', filterInput.time)"></input>
        </div>
        <div class="imageid-input" v-if="showIfs.imageId">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('imageId')"></input>
            <input v-model="filterInput.image_id" placeholder="Image ID" @change="updateFilter('image_id', filterInput.image_id)"></input>
        </div>
        <div class="Robotid-input" v-if="showIfs.robotId">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('robotId')"></input>
            <input v-model="filterInput.robot_id" placeholder="Robot ID" @change="updateFilter('robot_id', filterInput.robot_id)"></input>
        </div>
        <div class="Plaguetype-input" v-if="showIfs.plagueType">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('plagueType')"></input>
            <input v-model="filterInput.plague_type" placeholder="Plague Type" @change="updateFilter('plague_type', filterInput.plague_type)"></input>
        </div>
        <div class="pheromonetrap-radio" v-if="showIfs.pheromoneTrap">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('pheromoneTrap')"></input>
            <input type="radio" name="pheromone-trap" v-model="filterInput.pheromone_trap" @change="updateFilter('pheromone_trap', filterInput.value.pheromone_trap)">Yes</input>
            <input type="radio" name="pheromone-trap" v-model="filterInput.pheromone_trap" @change="updateFilter('pheromone_trap', filterInput.value.pheromone_trap)">No</input>
        </div>
        <div class="Probability-input" v-if="showIfs.probability">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('probability')"></input>
            <input v-model="filterInput.probability" placeholder="Probability" @change="updateFilter('probability', filterInput.probability)"></input>
        </div>
        <div class="Location-input" v-if="showIfs.location">
            <input class="deleteCateg "type="image" :src="require('../assets/delete.png')" @click="hideCateg('location')"></input>
            <input v-model="filterInput.coordinates" placeholder="Location" @change="updateFilter('coordinates', filterInput.coordinates)"></input>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const filtertype = ref();
const filterSelect = ref();

const listLogs = ref([]);

const emit = defineEmits(['updateFilter', 'resetFilter'])

const filterInput = ref({
    date: '',
    time: '',
    robot_id: '',
    plague_type: '',
    pheromone_trap: '',
    image_id: '',
    probability: '',
    coordinates: ''
});


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
    showIfs.value[categ] = false;
    emit('resetFilter', categ)
}

function updateFilter(key, value) {
  emit('updateFilter', { key, value });
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
        margin-right: 1rem;
        flex-wrap: wrap
    }
</style>
