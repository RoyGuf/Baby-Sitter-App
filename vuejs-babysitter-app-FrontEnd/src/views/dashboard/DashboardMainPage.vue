<template>
  <div class="my-2 p-3 px-6 border-gray-300 border-[1px] rounded hover:bg-[#fbf2f1] shadow-lg hover:scale-y-105 transition ease-in-out">
    <div>
      <h1 class=" py-1 px-3 text-xl font-semibold border-b-gray-200 border-b-[1px]">דירוג כללי </h1>
      <star-rating
          class="py-4 px-2 w-1/2"
          :increment="0.1"
          :border-width="2"
          :rtl="true"
          :show-rating="true"
          :rounded-corners="true" 
          :read-only="true"
          :star-size="30"
          :glow="10"
          :glow-color="'#eaeaea'"
          :rating="Number(babySitter.avgRate)"></star-rating>
    </div>
  </div>
  <div @click="$emit('clickTabTitle', 3)" class="cursor-pointer my-2 p-3 px-6 border-gray-300 border-[1px] hover:bg-[#fbf2f1] rounded shadow-lg hover:scale-y-105 transition ease-out">
    <div>
      <h1 class=" py-1 px-3 text-xl font-semibold border-b-gray-200 border-b-[1px]">מספר ביקורות </h1>
      <p class="py-4 px-2 w-1/2 text-lg">
        {{ babySitter.reviews.length }}
      </p>
    </div>
  </div>
  <div @click="$emit('clickTabTitle', 1)" class="my-2 cursor-pointer p-3 px-6 border-gray-300 border-[1px] hover:bg-[#fbf2f1] rounded shadow-lg hover:scale-y-105 transition ease-in-out">
    <div>
      <h1 class=" py-1 px-3 text-xl font-semibold border-b-gray-200 border-b-[1px]">שדות ריקים</h1>
      <li v-for="field in emptyFields" class="py-4 px-2 w-1/2 text-lg">
        {{ hebrewDictionary[field] }}
      </li>
      <p class="py-4 px-2 w-1/2 text-sm text-[#c9c4c4]">
        מילוי השדות הריקים יכול לעזור ללקוחות הבאים שלכם להחליט !
      </p>
    </div>
  </div>
  <div @click="$emit('clickTabTitle', 2)" class="cursor-pointer my-2 p-3 px-6 border-gray-300 border-[1px] hover:bg-[#fbf2f1] rounded shadow-lg hover:scale-y-105 transition ease-out">
    <div>
      <h1 class=" py-1 px-3 text-xl font-semibold border-b-gray-200 border-b-[1px]">מדיה</h1>
      <div class="flex justify-start py-3 flex-wrap">
        <img v-for="image in babySitter.media" :src="image.url" class="w-1/3 inline p-2"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref, watch  } from 'vue';
import StarRating from 'vue-star-rating';

const emptyFields = ref([]);
const emit        = defineEmits(['clickTabTitle'])
const inputData   = defineProps({
  babySitter: Object
});

onMounted(async () => {
  try {
    checkEmptyValues();
  } catch (err) {
    console.log(err);
  }
});

const hebrewDictionary  = {
  firstName: "שם פרטי",
  lastName: "שם משפחה",
  email: "אימייל",
  phone: "מספר טלפון",
  age: "גיל",
  price: "תעריף לשעה",
  url: "תמונת פרופיל",
  city: "עיר",
  details: "כתובת",
  gender: "מגדר",
  ageGroups: "קבוצות גיל",
  description: "תיאור",
};

// check if there are empty fields to babysitter
function checkEmptyValues(){
  for (let index in inputData.babySitter) {
    const babysitterKey = inputData.babySitter[index]
    if(typeof(babysitterKey) == 'object'){
      for (let subIndex in babysitterKey) {
        if(babysitterKey[subIndex] === "" || !babysitterKey[subIndex]){
          emptyFields.value.push(subIndex)
        }
      }
    }else{
      if(babysitterKey === ""){
        emptyFields.value.push(index)
      }
    }
  }
}

</script>

<style>

</style>