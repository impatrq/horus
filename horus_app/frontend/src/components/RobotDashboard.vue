<template>
    <div class="dashboard">
        <div class="superior">
            <div class="center-circle">
                <div class="circle">
                    <p>{{robot}}</p>
                </div>
            </div>
            <button @click="$emit('deleteRobot', id+1)"><img src="../assets/boton-menos.png"></img></button>
        </div>
        <h4>Robot ID: {{id+1}}</h4>
        <h4>Battery left:</h4>
        <h4>Time left:</h4>
        <h4>Last Log:</h4>
        <h4>Coordinates:</h4>
    </div>
</template>

<script setup>
defineProps({
    robot: String,
    id: Number
})
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