<template>
    <div class="frame">
    <!-- {{props.ordered}} -->
        <div class="log" v-for="(log, index) in listLogs" :key="index">
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
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps({
        filtered: {
            type: Object,
            required: true
        },
        ordered: {
            type: Object,
            required: true
        }
    })

    const listLogs = ref([]);

    async function getData() {
        const res = await fetch("http://localhost:3000/api/allLogs");
        const finalRes = await res.json();
        listLogs.value = finalRes;
    }

    async function searchData() {
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            ...(props.filtered.date ? { date: props.filtered.date } : {}), 
            ...(props.filtered.time ? { time: props.filtered.time } : {}),
            ...(props.filtered.robot_id ? { time: props.filtered.robot_id } : {}),
            ...(props.filtered.plague_type ? { time: props.filtered.plague_type } : {}),
            ...(props.filtered.pheromone_trap ? { time: props.filtered.pheromone_trap } : {}),
            ...(props.filtered.image_id ? { time: props.filtered.image_id } : {}),
            ...(props.filtered.probability ? { time: props.filtered.probability } : {}),
            ...(props.filtered.coordinates ? { time: props.filtered.coordinates } : {}),
            ...(props.ordered.orderType ? { order: props.ordered.orderType } : {}),
        })};
        const response = await fetch("http://localhost:3000/api/filter", requestOptions);
        const data = await response.json();
        listLogs.value = data;
    }

    function resetCheck(){
        console.log('reset function')
        for (const key in props.filtered) {
            console.log(key)
            if (props.filtered[key] !== '') {
            return false
            }
        }
        return true
    }

    watch(() => props.filtered, async (newValue, oldValue) => {
        let emptyFilter = resetCheck()
        console.log('watch props',props.filtered)
        if (emptyFilter === true) {
            console.log('empty')
            getData();
        } 
        else {
            console.log('notempty')
            await searchData();
        }
    }, { deep: true });
    
    watch(() => props.ordered, async (newValue, oldValue) => {
        await searchData();
    }, { deep: true });

    onMounted(() => {
        getData();
    });
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