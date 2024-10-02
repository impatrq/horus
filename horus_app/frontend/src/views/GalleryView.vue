<template>
  <div class="outer">
    <div class="opacity-zoom" v-if="showZoom" @click="showZoom = false"></div>
    <div class="big-image-container" v-if="showZoom">
      <img :src="zoomSource" alt="Loaded log" class="zoomed-image"></img>
    </div>
    <div class="input-section">
      <input type="file" accept="jpg" @change="onFileInput" multiple class='hidden' id='file_input' />
      <label for='file_input' class='button'>Upload Images</label>
      <button @click="exportImages">Export All Images</button>
    </div>
    <div class="images-section">
      <h3 v-if='noImages' class="noImages">No images uploaded yet</h3>
      <div v-for="(image, index) in images" :key="index" class="image-container">
        <ImagesDisplay :source="image" @zoom-in="zoom"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { openDB } from 'idb'
import JSZip from 'jszip'
import ImagesDisplay from '../components/ImagesDisplay.vue'

const images = ref([])
const noImages = ref(false)
let db
const showZoom = ref(false)
const zoomSource = ref('')

const initDB = async () => {
  db = await openDB('image-store', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'name' })
      }
    },
  })
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })
}

const storeImage = async (file) => {
  const transaction = db.transaction('images', 'readwrite');
  const store = transaction.objectStore('images');
  await store.put({ name: file.name, file })
  await transaction.done;
};

const loadImagesFromDB = async () => {
  noImages.value = false
  const tx = db.transaction('images', 'readonly');
  const store = tx.objectStore('images');
  const allImages = await store.getAll();

  for (const imageRecord of allImages) {
    const base64String = await convertToBase64(imageRecord.file);
    images.value.push(base64String);
  }
  
  if (!images.value || images.value.length === 0){
    noImages.value = true
  } else {
    noImages.value = false
  }
};

const onFileInput = async (event) => {
  const files = event.target.files;
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      await storeImage(file);
      const base64String = await convertToBase64(file);
      images.value.push(base64String);
    }
  }
};

const exportImages = async () => {
  const transaction = db.transaction('images', 'readonly');
  const store = tx.objectStore('images');
  const allImages = await store.getAll();

  const zip = new JSZip();
  for (const imageRecord of allImages) {
    zip.file(imageRecord.name, imageRecord.file);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = 'horus_images.zip';
  link.click();
}

const zoom = (img) => {
  console.log('zoom', img)
  zoomSource.value = img
  showZoom.value = true
  console.log('zoom2', zoomSource.value)
}
  
onMounted(async () => {
  await initDB()
  await loadImagesFromDB()
})
</script>

<style scoped>
.outer{
  background-color: white;
  opacity: 0.9;
  height: min(78.5%)
}
.image-container {
  width: 15%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
img {
  width: 100%;
}
.images-section {
  display: flex;
  align-items: space-around;
  justify-content: space-around;
  z-index: 2;
  flex-wrap: wrap
}
.input-section {
  z-index: 2;
  padding: 2rem;
  display: flex
}
.opacity-zoom {
  background-color: black;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
}
.big-image-container {
  width: 75%;
  opacity: 1;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  left: 12.5%
}
.zoomed-image {
  width: 100%;
  opacity: 1;
  z-index: 5;
}
.noImages{
  align-self: center
}
.hidden{
  display: none
}
.button{
  display: inline-block;
  padding: 1px 6px;
  margin: 0;
  font-size: 13px;
  line-height: normal;
  text-align: center;
  cursor: pointer;
  background-color: buttonface;
  color: buttontext;
  border-width: 1px;
  border-style: outset;
  border-radius: 3px;
  border-color: gray;
  margin-right: 1vw
}
</style>