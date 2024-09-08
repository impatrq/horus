<template>
  <div class="robots">
    <h1>This is an robots page</h1>
    <button @click="post"></button>
  </div>
</template>

<script setup>
  async function post() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Vue POST Request Example" })
    };
    const response = await fetch("http://localhost:3000/api/filter", requestOptions);
    const data = await response.json();
  }
</script>