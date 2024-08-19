<template>
  <div class="view-background">
      <div class="box">
        <DateFilter></DateFilter>
        <OrderFilter></OrderFilter>
      </div>
      <DataLog></DataLog>
  </div>
</template>

<script setup>
  import DateFilter from '@/components/DateFilter.vue';
  import DataLog from '@/components/DataLog.vue'
  import OrderFilter from '@/components/OrderFilter.vue'
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