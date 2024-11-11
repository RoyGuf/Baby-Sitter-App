<template>
  <div  class="outer p-5 transition ease-in-out delay-0 duration-200 shadow-grey-400 shadow-lg">
    <!-- <div class="loading">Loading&#8230;</div> -->
    <span class=" block text-sm font-medium text-slate-700 py-2">כתובת מייל*</span>
    <input v-model="data.customer_email" type="email"
    class=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      placeholder="מייל" required>
    <span v-if="!formSuccess" v-for="error in v$.customer_email.$errors" :key="error.$uid" class="text-red-500">
      {{ error.$message }}
    </span>
    <span class=" block text-sm font-medium text-slate-700 py-2">שם</span>
    <input v-model="data.customer_name" type="text" 
      class=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
      placeholder="שם" required>
    <span v-if="!formSuccess" v-for="error in v$.customer_name.$errors" :key="error.$uid" class="text-red-500">
      {{ error.$message }}
    </span>
    <span class=" block text-sm font-medium text-slate-700 py-2">תיאור</span>
    <textarea v-model="data.description" type="description" 
      class=" peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
      placeholder="תיאור" required>
    </textarea>
    <span v-if="!formSuccess" v-for="error in v$.description.$errors" :key="error.$uid" class="text-red-500">
      {{ error.$message }}
    </span>
    <star-rating
          class="py-4"
          @update:rating ="setRating"
          v-model="data.rate"
          :increment="0.5"
          :border-width="3"
          :rtl="true"
          :show-rating="true"
          :rounded-corners="true" 
          :star-size="40"></star-rating>    
    <span v-if="!formSuccess" v-for="error in v$.rate.$errors" :key="error.$uid" class="text-red-500">
      {{ error.$message }}
    </span>
    <span v-if="formError" class="text-red-500">
      אירעה שגיאה, נסה שוב מאוחר יותר
    </span>
    <button :disabled='formLoad' class="my-3 rounded-md text-center text-white bg-[#a94332] w-1/2 block px-3 py-2 mx-auto" @click="sendReview">
      <span v-if="!formLoad">הוסף ביקורת</span>
      <div class="lds-roller" v-if="formLoad"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </button>
  </div>

</template>

<script setup>
import store from '../store';
import { useRoute } from'vue-router'
import { ref, onMounted } from 'vue';
import StarRating from 'vue-star-rating';
import {reactive} from 'vue';
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { computed } from '@vue/reactivity'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const formLoad    = ref(false);
const formError   = ref(false);
const formSuccess = ref(false);
const route       = useRoute();
const showForm    = defineProps({showForm: Boolean});
const emit        = defineEmits(['eventname'])

const initialState = {
  customer_email: '',
  customer_name: '',
  description: '',
  rate: ''
};
const data  = reactive({ ...initialState });
const rules = {
  customer_email: { required, email  },
  customer_name: { required, minLength: minLength(2) },
  description: { required, minLength: minLength(5) },
  rate: { required },
}
const v$ = useValidate(rules, data)

function setRating(rating){
  data.rate = rating
}
async function sendReview(){
  formSuccess.value = false;
  formLoad.value    = true;
  const verified    = await v$.value.$validate()
  if (verified) {
    Object.assign(data, {babysitter_id : route.params.id});
    store.dispatch('createReview', data)
    .then((res) => {
      formLoad.value    = false;
      formSuccess.value = true;
      Object.assign(data, initialState);
      store.dispatch('searchBabySitterById', route.params.id)
      alertSuccess();
      emit('eventname', false);

    })
    .catch(err=> {
      console.log(err);
      alertError()
      formError.value = true
      formLoad.value  = false;
    });
  } else {
    alertError()
    formLoad.value = false;
  }
}
function alertSuccess() {
  toast.success("הביקורת נשלחה", {
    autoClose: 2000,
    rtl: true,
  });
}
function alertError() {
  toast.error("נא לתקן את השגיאות", {
    autoClose: 2000,
    rtl: true,
  });
}
</script>



<style scoped>

:deep(.sr-only){display:none !important}



.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>