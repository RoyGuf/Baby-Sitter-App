<template>
  <div class="card">
    <div class="top">
      <span v-if="nameValue" class="block text-md font-medium text-slate-700 py-2">{{ nameValue }}</span>
      <p class="text-slate-700 font-semibold text-xs">Drag & drop images</p>
    </div>
    <div class="drag-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragleave" @drop.prevent="onDrop">
      <span v-if="!isDraggind">
        גרור תמונות, או 
        <span class="select font-semibold" role="button" @click="selectFiles">
          בחר
        </span>
      </span>
      <div class="select" v-if="isDraggind">Drop image here</div>
      <input :value="modelValue" :type="type" :class="class"
        @change="onFileSelected" 
        ref="fileInput" multiple
        :placeholder="placeholder" :required="required">
    </div>
    <div class="container">
      <div class="image" v-for="(image,index) in images" :key="index">
        <span title="מחק תמונה" alt="מחק תמונה" class="delete" @click="deleteImage(index)">&times;</span>
        <img :src="image.url"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDraggind  = ref(false);
const images      = ref([]);
const fileInput   = ref(null);
const emit        = defineEmits(['change'])
const inputData   = defineProps({
  nameValue: String,
  modelValue: String,
  placeholder: String,
  type: String,
  class: String,
  change: Function,
  required: String
});

function selectFiles(){
  fileInput.value.click()
}
async function onFileSelected(event){
  const files = event.target.files;
  if(files.lenght === 0) return;
  for (let index = 0; index < files.length; index++) {
    if(files[index].type.split("/")[0] != "image") continue;
    if(!images.value.some((e) => e.name === files[index].name)){
      let baseImg = await setFileToBase(files[index]);
      images.value.push(baseImg)
    }
  }
  emit('change', images.value);
}

function deleteImage(index){
  images.value.splice(index, 1)
}
function onDragOver(event){
  event.preventDefault();
  isDraggind.value = true;
  event.dataTransfer.dropEffect = "copy"
}
function onDragleave(event){
  event.preventDefault();
  isDraggind.value = false;
}
async function onDrop(event){
  event.preventDefault();
  isDraggind.value = false;
  const files = event.dataTransfer.files;
  for (let index = 0; index < files.length; index++) {
    if(files[index].type.split("/")[0] != "image") continue;
    if(!images.value.some((e) => e.name === files[index].name)){
      let baseImg = await setFileToBase(files[index]);
      images.value.push(baseImg)
    }
  }
  emit('change', images.value);
}
function setFileToBase (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      resolve({name: file.name, url: reader.result});
    }
    reader.onerror = (error) =>{
      reject(error);
    }
  })
}

// let blob = await fetch(URL.createObjectURL(files[i])).then(r => r.blob());
// reader.readAsDataURL(blob);
</script>

<style>
.card{
  box-shadow: 0 0 5px #ffdfdf;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.card .top{
  text-align: center;
}

.card .drag-area{
  height: 150px;
  border-radius: 5px;
  border: 1px dashed #b9b9b9;
  background: #fff;
  color: #cb4e3a;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  -webkit-user-select: none;
  margin-top: 10px;
}
.card .drag-area .visible{
  font-size: 18px;
}
.card .select{
  color: #5256ad;
  margin-right: 5px;
  cursor: pointer;
  transition: 0.4s;
}
.card .select:hover{
  opacity: 0.6;
}
.card .container{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
}
.card .container .image{
  width: 75px;
  margin-right: 5px;
  height: 75px;
  position: relative;
  margin-bottom: 8px;
  margin-top: 8px;
}
.card .container .image img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.card input, 
.card .drag-area .on-drop,  
.card .drag-area.dragover .visible{
  display: none;
}
.delete{
  z-index: 999;
  color: red;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  background: #eee;
  opacity: 0.8;
  width: 20px;
  height: 20px;
  text-align: centers;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>