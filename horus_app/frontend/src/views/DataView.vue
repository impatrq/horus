<template>
  <div class="view-background">
      <div class="box">
        <DateFilter @sendFiltered="received"></DateFilter>
        <OrderFilter></OrderFilter>
      </div>
      <DataLog :filtered="filter"></DataLog>
  </div>
</template>

<script setup>
  import DateFilter from '@/components/DateFilter.vue';
  import DataLog from '@/components/DataLog.vue'
  import OrderFilter from '@/components/OrderFilter.vue'
  import { ref } from 'vue'

  const filter = ref('')

  function received(message){
    filter.value = message
    console.log(filter.value)
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