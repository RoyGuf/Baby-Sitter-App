<template dir="rtl" >
   <div class="md:max-w-[1200px] mx-auto px-20 py-10 max-[600px]:px-4" v-if="customer && loaded"> <!-- v-if="Object.keys(Object.keys).length = 0" -->
    <div class="flex my-0 mx-auto w-full  h-40 py-3 ">
      <div class="px-3 bg-slate-50 w-full rounded-xl border-slate-300 border-2">
        <h1 class="p-3 font-semibold text-center my-0 inline-flex items-center text-2xl">
          {{ customer.name }}</h1>
        <p><strong>מספר ביקורות: </strong>{{ customer.reviews ? customer.reviews.length : 0 }}</p>
      </div>
    </div>
    <div>
      <reviews-list :dataArray="customer" :showFormButton="false" :showLink="true">
      </reviews-list>
    </div>
  </div>
  <NotFoundPage v-if="!customer && loaded" />
</template>

<script setup>
import store from '../store';
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute } from'vue-router'
import ReviewsList from '../components/ReviewsList.vue'
import NotFoundPage from './NotFoundPage.vue';


const customer = ref('');
const route    = useRoute();
const loaded   = ref(false);


onMounted(() => {
  store.dispatch('searchCustomerById', route.params.id)
  .then(() => {
    loaded.value   = true
    customer.value = store.getters.getCurrentCustomer
  })
  .catch(err=> {
    console.log(err);
    loaded.value   = true
    customer.value = {};
  });
});

</script>

<style scoped>


</style>