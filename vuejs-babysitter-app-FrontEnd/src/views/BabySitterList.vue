<template>
  <div class="md:max-w-[1200px] mx-auto pt-3">
    <BabysitterFilters /> 
    <div class="item_list grid grid-cols-1 md:grid-cols-2 gap-5 p-8 max-[600px]:gap-15" 
    v-if="loaded && babySitters.length">
      <BabySitterListItem 
        class="max-[600px]:px-15 "
        v-for="babySitter of filteredBabySitters" 
        :key="babySitter._id" 
        :babySitter="babySitter"/>
    </div>
    <div class="item_list grid grid-cols-1 md:grid-cols-2 gap-5 p-8 max-[600px]:gap-15" 
    v-if="!loaded">
      <BabySitterListItemSkeleton
      class="max-[600px]:px-15 "
      v-for="index in 4" :key="index"/>
    </div>
  </div>
  <div v-if="loaded && !babySitters.length" class="text-center text-2xl p-20">לא נמצאו תוצאות</div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import store from '../store';
import { ref, onMounted, onUpdated, reactive, watch } from 'vue';
import BabySitterListItem from '../components/babySitterListItem.vue';
import BabySitterListItemSkeleton from './skeletons/BabySitterListItemSkeleton.vue'
import BabysitterFilters from '../components/BabysitterFilters.vue';

const loaded              = ref(false)
const babySitters         = computed(() => store.getters.getBabysittersWithRate);
const filteredBabySitters = computed(() => store.getters.getBabysittersWithRate); //computed(() => babySitters.value.filter((babySitter) => babySitter.ageGroups.includes(searchTerm)));

onMounted(() => {
  if(store.state.searchedBabySitters.data.length){
    loaded.value     = true;
  }
});

watch(filteredBabySitters, (newVal) => {
  if(newVal.value != filteredBabySitters.value){
    loaded.value = true;
  }
})




function filterAge(title){
  // searchTerm = title

  // console.log(searchTerm);
  // if(!title) return babySitters.value
  // else{
  //   // filteredBabySitters =  babySitters.value.filter((babySitter) => babySitter.ageGroups.includes(searchTerm))
  // }
  // searchTerm = title
  // filteredBabySitters = computed(() => babySitters.value.filter((babySitter) => babySitter.ageGroups.includes(searchTerm)));
  // filteredBabySitters = babySitters.value.filter((babySitter) => babySitter.ageGroups.includes(title));
  // filteredBabySitters = result.value 
  // console.log(filteredBabySitters.value);
  // console.log(searchTerm);
}
function clickTabTitle(title) {
        // selectedTitle = title
        // window.scrollTo({top: 200, behavior: 'smooth'});
      }
</script>

<style scoped>

.item_list{
  transition: 0.2s ease-out;
}

</style>