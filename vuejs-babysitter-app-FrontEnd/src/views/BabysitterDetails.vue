<template dir="rtl" >
   <!-- <Suspense class="md:max-w-[1200px] mx-auto ">
    <template #default> -->
      <babysitter-details-skeleton v-if="!loaded" ></babysitter-details-skeleton>
      <div class=" item_view md:max-w-7xl mx-auto p-20 m-3 max-[600px]:px-2 bg-white " v-if="loaded && babySitter"> <!-- v-if="Object.keys(Object.keys).length = 0" -->
        <div class="flex my-0 mx-auto w-full  h-44 py-3">
          <img :src="babySitter.avatar.url" :alt="babySitter.firstName + ' ' + babySitter.lastName"
            class=" shadow-lg rounded-md w-40 object-fill my-0  border-slate-400 border-2 ">
          <div class="px-3  w-full xl:w-1/2">
            <h1 class="hover:animate-wiggle shadow-md rounded-xl mb-2 px-3 bg-[#db8e8282] p-3 font-semibold text-center my-0 inline-flex items-center text-2xl">
              {{ babySitter.firstName + ' ' + babySitter.lastName }}</h1>
            <p class="hover:animate-wiggle shadow-lg px-3 bg-[#db8e8282] w-fit rounded-xl">גיל : {{ babySitter.age }}</p>
            <p class="hover:animate-wiggle shadow-lg inline-flex py-1 px-3 bg-[#db8e8282] w-full md:w-1/2 rounded-xl my-3">דירוג כללי:  <star-rating
                class=""
                :increment="0.1"
                :border-width="2"
                :rtl="true"
                :show-rating="true"
                :rounded-corners="true" 
                :inline="true"
                :read-only="true"
                :star-size="17"
                :glow="10"
                :glow-color="'#eee'"
                :rating="Number(babySitter.avgRate)"></star-rating></p>
             
          </div>
        </div>
        <div>
          <tabs-wrapper>
            <tab title="פרטים">
              <p class="py-2 border-b-2 border-t-2 border-[#eee]"><strong>גיל : </strong>{{ babySitter.age }}</p>
              <p class="py-2 border-b-2 border-[#eee]"><strong>מגדר : </strong>{{ babySitter.gender }}</p>
              <p class="py-2 border-b-2 border-[#eee]"><strong>תעריף לשעה : </strong>{{ babySitter.price }}  ₪</p>
              <p class="py-2 border-b-2 border-[#eee]"><strong>עיר : </strong>{{ babySitter.address ? babySitter.address.city : babySitter.address }}</p>
              <p class="relative py-2 border-b-2 border-[#eee]"><strong>טלפון : </strong><a dir="rtl" class="text-cyan-800 hover:underline" :href="`tel:${ babySitter.phone }`"> 
                {{ babySitter.phone }} 
                <span class="material-symbols-outlined">
                  call
                </span>
                </a>   
              </p>
              <p class="py-2 border-b-2 border-[#eee]"><strong>אימייל : </strong><a dir="rtl" class=" text-cyan-800 hover:underline" :href="`mailto:${ babySitter.email }`"> 
                {{ babySitter.email }} 
                <span class="material-symbols-outlined">
                  mail
                </span>
                </a> 
              </p>
            </tab>
            <tab title="חוות דעת">
              <div class="star font-semibold">{{ babySitter.avgRate }}</div>
              <div>
                <p><strong>מספר ביקורות: </strong>{{ babySitter.reviews ? babySitter.reviews.length : 0 }}</p>
                <p class="inline py-2"><strong>דירוג כללי: </strong></p>
                <star-rating
                class="w-20"
                :increment="0.1"
                :border-width="2"
                :rtl="true"
                :show-rating="true"
                :rounded-corners="true" 
                :inline="true"
                :read-only="true"
                :star-size="20"
                :rating="Number(babySitter.avgRate)"></star-rating> 
              </div>
              <div v-if="babySitter.reviews" class="max-h-70 overflow-y-auto  p-5 ">
                <reviews-list :dataArray="babySitter" :showFormButton="true">
                </reviews-list>
              </div>
            </tab>
            <tab title="גילאים">
              <p class="font-semibold">{{ babySitter.firstName }} עובד.ת עם גילאים:</p>
              <div v-for="age of babySitter.ageGroups">
                <li>{{  age }}</li>
              </div>
            </tab>
            <tab title="אודות">
              <h1 class="font-bold underline underline-offset-4">קצת על {{ babySitter.firstName }} :</h1>
              {{ babySitter.description }}</tab>
          </tabs-wrapper>
        </div>
      </div>
    <!-- </template>
    <template #fallback> -->
      
    <!-- </template>
   </Suspense> -->
  <NotFoundPage v-if="!babySitter && loaded" />
</template>

<script setup>
import { computed } from '@vue/reactivity'
import store from '../store';
import { ref, onMounted, onUpdated, watch  } from 'vue';
import { useRoute } from'vue-router'
import Tab from '../components/Tab.vue';
import TabsWrapper from '../components/TabsWrapper.vue'
import ReviewsList from '../components/ReviewsList.vue'
import NotFoundPage from './NotFoundPage.vue';
import StarRating from 'vue-star-rating';
import BabysitterDetailsSkeleton from './skeletons/BabysitterDetailsSkeleton.vue'

const babySitter = ref('');
const route      = useRoute();
const loaded     = ref(false);


onMounted(async() => {
  await store.dispatch('searchBabySitterById', route.params.id)
  .then(() => {
    babySitter.value = store.getters.getCurrentBabysitter
    loaded.value     = true;

  })
  .catch(err=> {
    console.log(err);
    loaded.value = true;
  });
});
watch(
  () => store.state.currentBabySitter,
  (newValue, oldValue) => {
    babySitter.value = store.getters.getCurrentBabysitter
  },
  { deep: true }
)

</script>

<style scoped>
:deep(.sr-only){display:none !important}

@media screen and (max-width: 768px) {
  span.material-symbols-outlined{
    margin-right: 0;
    top: 5px;
    font-size: 24px;
  }
}
  .material-symbols-outlined{
    margin-right: 0.5em;
    position: absolute;
    display: inline-block;
    font-size: 20px;
  }
.star {
  height: 100px;
  width: 100px;
  -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  text-align: center;
  background: #ffd055;
  color: #000;
  border-radius: 10%;
}

.star::before , .small-star::before{
  display: inline-block;
  height: 100%;
  background: blue;
  vertical-align: middle;
  content: '';
  border-radius: 10%;
}

.item_view{
  transition: 0.2s ease-out;

}

</style>