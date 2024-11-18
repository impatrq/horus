<template>
    <div class="frame">
    <!-- {{props.ordered}} -->
        <div class="log" v-for="(log, index) in listLogs" :key="index">
            <h5 class="bold">Date: <span>{{log.date}}</span></h5>
            <h5 class="bold">Time: <span>{{log.time}}</span></h5>
            <h5 class="bold">Image ID: <span>{{log.image_id}}</span></h5>
            <h5 class="bold">Robot ID: <span>{{log.robot_id}}</span></h5>
            <h5 class="bold">Plague Type: <span>{{log.plague_type}}</span></h5>
            <h5 class="bold">Phermone Trap: <span>{{log.pheromone_trap}}</span></h5>
            <h5 class="bold">Probability: <span>{{log.probability}}</span></h5>
            <h5 class="bold">Location: <span>{{log.coordinates}}</span></h5>
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
            ...(props.filtered.robot_id ? { robot_id: props.filtered.robot_id } : {}),
            ...(props.filtered.plague_type ? { plague_type: props.filtered.plague_type } : {}),
            ...(props.filtered.pheromone_trap ? { pheromone_trap: props.filtered.pheromone_trap } : {}),
            ...(props.filtered.image_id ? { image_id: props.filtered.image_id } : {}),
            ...(props.filtered.probability ? { probability: props.filtered.probability } : {}),
            ...(props.filtered.coordinates ? { coordinates: props.filtered.coordinates } : {}),
            ...(props.ordered.orderType ? { order: props.ordered.orderType } : {}),
        })};
        try {
            const response = await fetch("http://localhost:3000/api/filter", requestOptions);
            const data = await response.json();
            listLogs.value = data;
        } catch (err) {
            console.error("Fetch error: ", err)
        }
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
        box-shadow: 0px 5px 10px rgba(0.2, 0.2, 0.2, 0.2);
    }

    .log {
        width: 90%;
        background-color: #C0CECA;
        margin-bottom: 3%;
        flex-direction: column;
        padding: 1%;
        box-shadow: 0px 5px 10px rgba(0.5, 0.5, 0.5, 0.5);
    }

    .bold {
        font-weight: bold
    }
</style>