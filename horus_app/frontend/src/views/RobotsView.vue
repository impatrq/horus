<template>
  <div class="robotsView">
    <RobotDashboard v-for="robot in robotList" />
    <AddRobot @addRobot="addNewRobot"/>
  </div>
</template>

<script setup>
import RobotDashboard from '@/components/RobotDashboard.vue'
import AddRobot from '@/components/AddRobot.vue'
import { ref } from 'vue'

const robotList = ref({list: []})
const robotNum = ref(0)

function addNewRobot () {
  console.log('hi')
  robotNum.value = robotNum.value + 1
  const newRobot = 'Robot ' + robotNum.value
  robotList.value.list.push(newRobot)
}
</script>

<style scoped>
.robotsView{
  display:flex;
  height: 70%
}
</style>