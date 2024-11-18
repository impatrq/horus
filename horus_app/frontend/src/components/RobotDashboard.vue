<template>
    <div class="dashboard">
        <div class="superior">
            <div class="center-circle">
                <div class="circle">
                    <p>{{name}}</p>
                </div>
            </div>
            <button @click="$emit('deleteRobot', id)"><img src="../assets/boton-menos.png"></img></button>
        </div>
        <h4>Robot ID: {{robot.display_id}}</h4>
        <h4>Battery left: {{robot.battery + '%'}}</h4>
        <h4>Time left: {{robot.time}}</h4>
        <h4>Last Log: {{robot.log}}</h4>
        <h4>Coordinates: {{robot.coordinates}}</h4>
    </div>
</template>

<script setup>
import computed from 'vue'

defineProps({
    robot: {
        type: Object,
        required: true
    }
})

const name = computed(() => 'R' + (robot.display_id || ''))
const robot_id = computed(() => (robot.robot_id || ''))
const battery = computed(() => (robot.battery || ''))
const time = computed(() => 'R' + (robot.time || ''))
const log = computed(() => 'R' + (robot.log || ''))
const coordinates = computed(() => 'R' + (robot.coordinates || ''))
</script>

<style scoped>
.circle {
    border-radius: 50%;
    background-color: black;
    width: 5rem;
    height: 5rem;
    align-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-align: center;
    justify-content: center;
    align-content: center ;
    padding-top: 0.5;   
}

.center-circle{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center
}

button{
    position: absolute; 
    right: 5%;
    top: 5%;
    width: 15%;
    height: 15%;
    border: none;
    background: none
}

.dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 15%;
    padding: 100%;
    padding: 2%;
    border-radius: 10%;
    margin: 3%;
    height: 50%;
    position: relative
}

.superior {
    padding: 5%;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 50%
}

p, h4{
    margin: 0px
}

p {
    padding-top: 2rem
}

img {
    width: 100%
}
</style>