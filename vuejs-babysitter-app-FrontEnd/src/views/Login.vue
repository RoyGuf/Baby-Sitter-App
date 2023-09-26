<template>
  <div class="md:max-w-[1200px] mx-auto ">
    <form @submit.prevent="submit" class="block w-80 mx-auto p-5 pt-10">
      <h1 class="p-4 h3 mb-3 fw-normal text-center rounded-md font-semibold bg-slate-200 text-2xl">כניסה לרשומים</h1>
      <custom-input class="w-full" v-model="data.email" placeholder="מייל" nameValue="כתובת אימייל" type="email"></custom-input>            
      <span v-if="!formSuccess" v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500">
        {{ error.$message }}
      </span>
      <custom-input class="w-full" v-model="data.password" placeholder="סיסמה" nameValue="סיסמה" type="password"></custom-input>            
      <span v-if="!formSuccess" v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-500">
        {{ error.$message }}
      </span>
      <custom-input class="w-full" v-model="data.confirmPassword" placeholder="אישור סיסמה" nameValue="אישור סיסמה" type="password"></custom-input>            
      <span v-if="!formSuccess" v-for="error in v$.confirmPassword.$errors" :key="error.$uid" class="text-red-500">
        {{ error.$message }}
      </span>
      <p v-if="formError && !invalid" class="text-red-500">
        אירעה שגיאה, נסה שוב מאוחר יותר
      </p>
      <p v-if="formError && invalid" class="text-red-500">
        פרטי התחברות לא נכונים
      </p>
      <button class="my-5 rounded-md text-center text-white bg-[#b97c73] w-full block px-3 py-2" type="submit">
        <span v-if="!formLoad">התחברות</span>
        <div class="lds-roller" v-if="formLoad"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </button>
      
    </form>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import store from '../store';
import { ref, onMounted } from 'vue';
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { computed } from '@vue/reactivity';
import {useRouter} from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CustomInput from '../components/CustomInput.vue'


const router = useRouter();

const formLoad     = ref(false);
const invalid      = ref(false);
const formError    = ref(false);
const formSuccess  = ref(false);
const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
};
const data  = reactive({ ...initialState });
const rules = computed(() => {
  return {
    email: { required, email  },
    password: { required, minLength: minLength(4) },
    confirmPassword: { required, sameAs: sameAs(data.password) },
  }
})
const v$ = useValidate(rules, data)

async function submit() {
  formLoad.value = true;
  invalid.value  = false;
  const verified = await v$.value.$validate()
  // AlertMessage.methods.alertError()
  try {
    if (verified) {
      const user = {
        email: data.email,
        password: data.password
      }
      const res = await store.dispatch('login',user);
      formLoad.value    = false;
      formSuccess.value = true;
      Object.assign(data, initialState);
      alertSuccess()
      setTimeout(() => router.push('/'), "1500");
    } else {
      alertError()
      formLoad.value = false;
    }
  } catch (error) {
    if(error.response.data.message == "invalid credentials"){
      invalid.value = true;
    }
    alertError()
    formError.value = true;
    formLoad.value  = false;
  }
}

function alertError() {
  if(invalid.value){
    toast.error("מייל או סיסמה לא נכונים", {
      autoClose: 2000,
      rtl: true,
    });
  }else{
    toast.error("אירעה שגיאה, נסה שוב מאוחר יותר", {
      autoClose: 2000,
      rtl: true,
    });
  }
}
function alertSuccess() {
  toast.success("התחברת בהצלחה", {
    autoClose: 2000,
    rtl: true,
  });
}
</script>


<style scoped>
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