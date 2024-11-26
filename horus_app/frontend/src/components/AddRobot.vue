<template>
    <div class="dashboard">
        <button @click="$emit('addRobot')"><img src="../assets/boton-mas.png"></img></button>
    </div>   
</template>

<style scoped>
.dashboard {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 15%;
    padding: 2%;
    border-radius: 10%;
    margin: 3%;
    height: 50%
}

.dashboard:hover{
    background-color: #eeeeee
}

button {
    width: 25%;
    height: 25%;
    background: none;
    border: none;
    cursor: pointer
}

img {
    width: 100%
}

</style>