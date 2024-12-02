<template class="">
<div class="w-full p-2 mt-2 filter border-4 rounded-lg">
  <div class="text-center px-3 inline-block max-[800px]:w-full">
    <label class="px-6 font-semibold text-center max-[800px]:w-1/2">גילאים:</label>
    <select name="filter" id="filter" v-model="filter" class="max-[800px]:w-1/2 inline mx-2 shadow-sm  bg-[#fff] md:px-8 py-2 rounded text-center p-2 m-2 cursor-pointer">
      <option value=" " class="text-slate-400">כולם</option>
      <option v-for="age of ages" :value="age.title" 
        :key="age.id">{{ age.title }}</option>
    </select>
  </div>
  <div class="text-center px-3 inline-block max-[800px]:w-full">
    <label class="px-6 font-semibold text-center max-[800px]:w-1/2">מיון לפי:</label>
    <select name="sort" id="sort" v-model="sort" class="inline mx-2 shadow-sm max-[800px]:w-1/2 bg-[#fff] md:px-8 py-2 rounded text-center p-2 m-2 cursor-pointer">
      <option value=" "  class="text-slate-400">ללא</option>
      <option value="age" >גיל (יורד)</option>
      <option value="age acd" >גיל (עולה)</option>

      <option value="reviews.length" >מספר ביקורות</option>
      <option value="avgRate" >ממוצע ציון ביקורות (יורד)</option>
      <option value="avgRate acd" >ממוצע ציון ביקורות (עולה)</option>

      <option value="price" >מחיר (יורד)</option>
      <option value="price acd" >מחיר (עולה)</option>
    </select>
  </div>
</div>
</template>
      <!-- <label v-if="showClear" class="hamburger " 
        @click="changeSearch( )">
        <div class="top-bun "></div>
        <div class="meat "></div>
        <div class="bottom-bun "></div>
      </label>  -->
<script setup>
import store from '../store';
import ages from '../assets/ageGroups.js'
import { ref, watch } from 'vue';


const selectedTitle = ref('')
const filter        = ref(' ')
const sort          = ref(' ')
const loaded        = ref(false)
const showClear     = ref(false)

watch(filter, (newVal) => {
  changeSearch(newVal)
})
watch(sort, (newVal) => {
  changeSort(newVal)
})

function changeSearch(title){
  loaded.value = false;
  if(title != " ") showClear.value = true;
  if(!title) showClear.value = false;
  selectedTitle.value = title;
  sort.value = " ";
  store.dispatch('filterBabySittersByAge', title)
  .then(() => {
    loaded.value = true;
  })
}

function changeSort(val){
  if(val.split(" ")[1] && val.split(" ")[1] == "acd"){
    store.dispatch('sortBabySitters', {keyword:val.split(" ")[0], acd:true})
  }else{
    store.dispatch('sortBabySitters', {keyword:val, acd:false})
  }
}
</script>

<style scoped>
.filter li.selected{
  color: white;
  background-color: #b97c73;
}
.filter li{
  border: 1px solid #d5d3d3;
  border-bottom: outset #db8e82ba;
}
option{
  padding-right: 2px;
}
.hamburger {
    position: relative;
    /* top: 5em;
    right: 5%;
    margin-left: -2em;
    margin-top: -45px; */
    width: 2em;
    height: 45px;
    /* z-index: 999; */
    cursor: pointer;
  }

  .hamburger div {
    position: relative;
    width: 2em;
    height: 7px;
    border-radius: 3px;
    background-color: #b97c73;
    margin-top: 8px;
    transition: all 0.3s ease-in-out;
  }
   .hamburger .top-bun {
    transform: rotate(-45deg);
    margin-top: 30px;
  }
  .hamburger .bottom-bun {
    opacity: 0;
    transform: rotate(45deg);
  }
   .hamburger .meat {
    transform: rotate(45deg);
    margin-top: -7px;
  }

   .hamburger + .nav {
    top: 0;
    transform: scale(1);
  }
</style>