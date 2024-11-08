<template>
  <div class="robotsView">
    <RobotDashboard v-for="(robot, index) in robotList" :key="index" :robot="robot" :id="index" @deleteRobot="deleteRobot"/>
    <AddRobot @addRobot="addNewRobot"/>
  </div>
</template> 

<script setup>
import RobotDashboard from '@/components/RobotDashboard.vue'
import AddRobot from '@/components/AddRobot.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const robotList = ref([])
const robotNum = ref(0)

async function addNewRobot () {
  console.log('hi', robotList.value)
  robotNum.value = robotNum.value + 1
  const newRobot = 'Robot ' + robotNum.value
  robotList.value.push(newRobot)
  const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    robot_id: robotNum.value
   })
  };
  try {
    const connect = await fetch('http://localhost:3000/api/robot/connect', requestOptions)
    console.log(connect.json())
  } catch (err) {
    alert('Robot Connection Error')
    console.log('Robot connection error', err)
  }
}

function deleteRobot (id){
  robotList.value.filter(robot => id != id)
  robotList.value.pop()
  robotNum.value('')
}

// function loadRobots (){
//   try {
//     const load = await fetch('http://localhost:3000/api/robot/connect')
//     robotList.value = load.json()
//   }
// }

// onMounted(async () => {

// })
</script>

<style scoped>
.robotsView{
  display:flex;
  height: 70%;
  flex-wrap: wrap;
}
</style>