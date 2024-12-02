<template>
  <div class="md:max-w-[1200px] mx-auto py-3 ">
    <div class="w-full p-4" v-if="loaded">נמצאו {{ babySitters.length }} תוצאות</div>
    <div class="item_list grid grid-cols-1 md:grid-cols-2 gap-5 px-0 max-[600px]:gap-15" 
    v-if="loaded && babySitters.length">
      <BabySitterListItem 
        class="max-[600px]:px-15 hover:animate-wiggle"
        v-for="babySitter of babySitters" 
        :key="babySitter._id" 
        :babySitter="babySitter"/>
    </div>
    <div class="item_list grid grid-cols-1 md:grid-cols-2 gap-5 p-12 px-0 max-[600px]:gap-15" 
    v-if="!loaded">
      <BabySitterListItemSkeleton
      class="max-[600px]:px-15 "
      v-for="index in 4" :key="index"/>
    </div>
  </div>
  <div v-if="loaded && !babySitters.length" class="text-center text-2xl p-20">לא נמצאו תוצאות</div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import store from '../store';
import BabySitterListItem from '../components/BabySitterListItem.vue';
import { computed } from '@vue/reactivity'
import { useRoute } from'vue-router'
import BabySitterListItemSkeleton from './skeletons/BabySitterListItemSkeleton.vue'


const babySitters = ref('');
const route       = useRoute();
const loaded      = ref(false)


onMounted(() => {
  store.dispatch('searchBabySittersByAges', route.params.age)
  .then(() => {
    babySitters.value = store.getters.getBabysittersWithRate;
    loaded.value      = true;
  })
  .catch(err=> {
    console.log(err);
    babySitters.value = {};
  });
});


</script>

<style scoped>
.item_list{
  transition: 0.2s ease-out;
}
</style>