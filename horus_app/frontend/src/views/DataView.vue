<template>
  <div class="view-background">
    <div class="display">
      <DateFilter></DateFilter>
      <DataLog></DataLog>
    </div>
  </div>
</template>

<script setup>
  import DateFilter from '@/components/DateFilter.vue';
  import DataLog from '@/components/DataLog.vue'

</script>

<style scoped>
  .view-background{
    background-color: white;
    opacity: 0.9;
    padding: 1%;
    z-index: 1;
    position: relative
  }

  .display{
    display:flex;
    justify-content: space-between
  }

</style>