<template>
  <div class="md:max-w-[1200px] mx-auto max-[600px]:px-6 p-20 pt-10 justify-center gap-5 mt-2 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2" dir="rtl">
    <router-link v-for="age of ages" 
      :to="{name: 'byAge', params: {age:age.title}}" 
      :key="age.id"
      class=" hover:font-bold transition ease-in-out delay-0 duration-500 shadow-md w-full text-center h-60  items-center overflow-hidden">
      <div class=" flex hover:opacity-80  h-full hover:scale-110 transition ease-in-out delay-0 duration-500 items-center text-center"
      :style="{ 'background-image': `url(${age.img})`, 
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center'}">
        <div class="inline-grid w-full h-24 my-auto text-center items-center text-2xl bg-red-100 bg-opacity-70 transition ease-in-out delay-0 duration-600">{{ age.title }}</div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import ages from '../assets/ageGroups.js'


</script>