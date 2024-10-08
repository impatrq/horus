<template>
    <div class="orderbox">
        <h3>Order by</h3>
        <div class="orderfilter">
            <select v-model="ordertype" @change="emitOrder">
                <option value="date-time" selected>Día y Hora</option>
                <option value="time">Hora</option>
                <option value="image_id">ID Imagen</option>
                <option value="plague_type">Tipo de Plaga:</option>
                <option value="pheromone_trap">Trampa de feromonas</option>
                <option value="robot_id">ID Robot</option>
                <option value="probability">Probabilidad</option>
                <option value="coordinates">Coordenadas</option>
            </select>
            <select id="direction" v-model="direction" @change="emitOrder">
                <option value="asc">⬆️</option>
                <option value="des" selected>⬇️</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['sendOrder'])
const ordertype = ref()
const direction = ref('des')

function emitOrder() {
    const order = {}
    const sort = direction.value === 'asc' ? 1 : -1
    if (ordertype.value === 'date-time') {
        order['date'] = sort
        order['time'] = sort
    } else {
        order[ordertype.value] = sort
    }
    emit('sendOrder', order)
}
</script>

<style scoped>
</style>