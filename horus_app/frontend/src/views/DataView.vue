<template>
  <div class="view-background">
      <div class="box">
        <DateFilter @updateFilter="updateFilter" @resetFilter="resetFilter"></DateFilter>
        <OrderFilter @sendOrder="updateOrder" @sendDirection="updateDirection"></OrderFilter>
      </div>
      <DataLog :filtered="filtered" :ordered="ordered"></DataLog>
  </div>
</template>

<script setup>
  import DateFilter from '@/components/DateFilter.vue';
  import DataLog from '@/components/DataLog.vue'
  import OrderFilter from '@/components/OrderFilter.vue'
  import { ref } from 'vue'

  const filtered = ref({
    date: '',
    time: '',
    robot_id: '',
    plague_type: '',
    pheromone_trap: '',
    image_id: '',
    probability: '',
    coordinates: ''
  })

  const ordered = ref({
    orderType: {
      date: -1,
      time: -1
    }
  })

  function updateFilter({ key, value }) {
    if (key === 'date') {
      filtered.value[key] = dateFormat(value);
    } else {
      filtered.value[key] = value;
    }
    console.log(filtered.value);
  }
  
  function resetFilter(key) {
    filtered.value[key] = '';
  }

  function dateFormat(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
  }

  function updateOrder(order){
    ordered.value.orderType = order
  }

  function updateDirection(direction){
    ordered.value.direction = direction
  }
</script> 



<style scoped>
  .view-background{
    background-color: white;
    opacity: 0.9;
    padding: 1%;
    z-index: 1;
    position: relative;
    display:flex;
    justify-content: space-between;
  }

  .box {
    padding: 1%;
    height: auto;
  }
</style>