<template>
  <div class="robotsView">
    <div v-for="(robot, index) in robotList" class="dashboard">
      <div class="superior">
        <div class="center-circle">
          <div class="circle">
            <p>{{'R' + robot.display_id}}</p>
          </div>
        </div>
        <button @click="deleteRobot(robot.display_id)"><img src="../assets/boton-menos.png"></img></button>
      </div>
      <h5>Robot ID: <span v-if="robot.robot_id">{{robot.robot_id}}</span><span v-if="!robot.robot_id" class="red">unavailable</span></h5>
      <h5>Battery left: <span v-if="robot.battery">{{robot.battery}}</span><span v-if="!robot.battery" class="red">unavailable</span><span>%</span></h5>
      <h5>Time left: <span v-if="robot.time">{{robot.time}}</span><span v-if="!robot.time" class="red">unavailable</span></h5>
      <h5>Last Log: <span v-if="robot.log">{{robot.log}}</span><span v-if="!robot.log" class="red">unavailable</span></h5>
      <h5>Coordinates:<span v-if="robot.coordinates && robot.coordinates.length >= 2">{{robot.coordinates[0] + ',' + robot.coordinates[1]}}</span><span v-if="!robot.coordinates" class="red">unavailable</span></h5>
    </div>
    <AddRobot @addRobot="addNewRobot"/>
  </div>
</template> 

<script setup>
import AddRobot from '@/components/AddRobot.vue'
import { ref, onMounted } from 'vue'

const robotList = ref([])

async function addNewRobot () {
  let newNumber = 0
  let maxNumber = 0
  try {
    maxNumber = robotList.value[0].display_id;

    for (let i = 1; i < robotList.value.length; i++) {
      if (robotList.value[i].display_id > maxNumber) {
        maxNumber = robotList.value[i].display_id;
      }
    }
  } catch(err) {
    console.log('addNewRobot', err)
  }
  newNumber = maxNumber + 1 

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      display_id: newNumber
    })
  };
  try {
    console.log(robotList.value)
    robotList.value.push({
      display_id: newNumber
    })
    const connect = await fetch('http://localhost:3000/api/robot/add', requestOptions)
  } catch (err) {
    console.log('Robot connection error', err)
  }
}

async function deleteRobot (id){
  robotList.value = robotList.value.filter(robot => robot.display_id !== id)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      display_id: id
    })
  }
  const request = await fetch('http://localhost:3000/api/robot/delete', requestOptions)
}


async function loadRobots (){
  try {
    const load = await fetch('http://localhost:3000/api/robot/load')
    const res = await load.json()
    console.log('loadrobots', res)
    for(const item of res) {
      robotList.value.push(item)
      console.log(item)
    }
  }
  catch {
    alert('Server Connection Error')
  }
}

function checkStatus(id){
  const checks = setInterval(async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_id: id
      })
    }
    const check = await fetch('http://localhost:3000/api/robot/check', requestOptions)
    const res = await check.json()
    if (res.found == true) {
      clearInterval(checks)
    }
  }, 500);
}

onMounted(async () => {
  await loadRobots()
})
</script>

<style scoped>
.robotsView{
  display:flex;
  height: 70%;
  flex-wrap: wrap;
}

.circle {
    border-radius: 50%;
    background-color: black;
    width: 5rem;
    height: 5rem;
    align-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-align: center;
    justify-content: center;
    align-content: center ;
    padding-top: 0.5;   
}

.center-circle{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center
}

button{
    position: absolute; 
    right: 5%;
    top: 5%;
    width: 15%;
    height: 15%;
    border: none;
    background: none
}

.dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 15%;
    padding: 100%;
    padding: 2%;
    border-radius: 10%;
    margin: 3%;
    height: 50%;
    position: relative;
    box-shadow: 0px 5px 10px rgba(0, 0.5, 0.5, 0.5);
}

.superior {
    padding: 5%;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 50%
}

p, h5{
  margin: 0px;
  margin-top: 4%
}

p {
    padding-top: 2rem
}

img {
    width: 100%
}

.red {
  color: red
}

span {
  font-weight: 100
}
</style>