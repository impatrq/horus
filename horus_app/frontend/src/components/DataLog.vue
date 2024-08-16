<template>
    <div class="frame">
        <div class="log"v-for="(log, index) in listLogs" :key="index">
            <h5>Date: {{log.date}}</h5>
            <h5>Time: {{log.time}}</h5>
            <h5>Image ID: {{log.image_id}}</h5>
            <h5>Robot ID: {{log.robot_id}}</h5>
            <h5>Plague Type: {{log.plague_type}}</h5>
            <h5>Phermone Trap: {{log.pheromone_trap}}</h5>
            <h5>Probability: {{log.probability}}</h5>
            <h5>Location: {{log.coordinates}}</h5>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const listLogs = ref([]);

    async function getData() {
        const res = await fetch("http://localhost:3000/api/allLogs");
        const finalRes = await res.json();
        listLogs.value = finalRes;
        console.log(finalRes)
    }
    getData()
    
</script>

<style scoped>
    .frame {
        background-color: gray;
        width: 60vw;
        padding: 1%;
        height: 70vh;
        overflow-y:scroll;
    }

    .log {
        width: 90%;
        background-color: #C0CECA;
        margin-bottom: 3%;
        flex-direction: column;
        padding: 1%;
    }
</style>