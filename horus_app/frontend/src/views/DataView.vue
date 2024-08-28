<template>
  <div class="view-background">
      <div class="box">
        <DateFilter @sendDate="receivedDate" @sendTime="receivedTime" @resetFilter="resetFilter"></DateFilter>
        <OrderFilter></OrderFilter>
      </div>
      <DataLog :filtered="filtered"></DataLog>
  </div>
</template>

<script setup>
  import DateFilter from '@/components/DateFilter.vue';
  import DataLog from '@/components/DataLog.vue'
  import OrderFilter from '@/components/OrderFilter.vue'
  import { ref } from 'vue'

  const filtered = ref({
    date: '',
    time: ''
  })

  function receivedDate(data){
    filtered.value.date = dateFormat(data)
    console.log(filtered.value)
  }

  function receivedTime(data){
    filtered.value.time = data
    console.log(filtered.value)
  }

  function resetFilter(key) {
    filtered.value[key] = '';
  }

  function dateFormat(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
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