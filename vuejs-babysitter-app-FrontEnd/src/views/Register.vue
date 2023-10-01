<template>
  <div class="md:max-w-[1200px] mx-auto pt-10">
    <h1 class="text-2xl p-4 h3 mb-3 fw-normal text-center font-semibold bg-slate-200 rounded-md">הרשמה</h1>
    <form @submit.prevent="submit" class="pt-5 md:w-full mx-auto p-10 ">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <custom-input required="true" class="w-full" v-model="data.firstName" placeholder="שם פרטי" nameValue="שם פרטי" type="text"></custom-input>            
          <span v-if="!formSuccess" v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input class="w-full" v-model="data.lastName" placeholder="שם משפחה" nameValue="שם משפחה" type="text"></custom-input>            
          <span v-if="!formSuccess" v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input required="true" class="w-full" v-model="data.password" placeholder="סיסמה" nameValue="סיסמה" type="password"></custom-input>            
          <span v-if="!formSuccess" v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input required="true" class="w-full" v-model="data.email" placeholder="אימייל" nameValue="כתובת אימייל" type="email"></custom-input>
          <span v-if="!formSuccess" v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input required="true" class="w-full" v-model="data.phone" placeholder="מספר טלפון" nameValue="מספר טלפון" type="phone"></custom-input>
          <span v-if="!formSuccess" v-for="error in v$.phone.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input class="w-full" v-model="data.age" placeholder="גיל" nameValue="גיל" type="text"></custom-input>
          <span v-if="!formSuccess" v-for="error in v$.age.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input required="true" class="w-full" v-model="data.price" placeholder="תעריף לשעה" nameValue="תעריף לשעה" type="text"></custom-input>
          <span v-if="!formSuccess" v-for="error in v$.price.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div class="w-full">
          <custom-input class="inline max-[600px]:w-2/5 w-3/7" v-model="data.address.city" placeholder="עיר" nameValue="כתובת" type="text"></custom-input>
          <custom-input class="float-left inline md:w-3/7" v-model="data.address.details" placeholder="פרטים" nameValue="" type="text"></custom-input>
        </div>
        <div class="w-full">
          <span class="block text-md font-medium text-slate-700 py-2">מגדר</span>
          <select v-model="data.gender"
            class="peer mt-1 block w-full px-8 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            placeholder="מחיר" required>
            <option value="זכר">זכר</option>
            <option value="נקבה">נקבה</option>
            <option value="אחר">אחר</option>
          </select>
        </div>
        <div class="w-full">
          <span class="block text-md font-medium text-slate-700 py-2">קבוצות גילאים</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div v-for="age in ages" class="">
                <input
                type="checkbox"
                class="default:ring-2"
                v-model.number="data.ageGroups"
                :id="age.id"
                :value="age.title"
                @change="save"
                />
              <label class="px-2">גילאים: {{ age.title }}</label>
            </div>
          </div>
        </div>
        <div>
          <span class="block text-md font-medium text-slate-700 py-2">קצת על עצמך</span>
          <textarea v-model="data.description" type="text" 
            class="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-[#cb4e3a] invalid:text-pink-600
            focus:invalid:border-[#cb4e3a] focus:invalid:ring-[#cb4e3a]"
            placeholder="אודות" required></textarea>
          <span v-if="!formSuccess" v-for="error in v$.description.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <div>
          <custom-input @change="handleImage" class="w-full"  placeholder="תמונה" nameValue="תמונה" type="file"></custom-input>
          <img v-if="data.imgUrl" style="width: 150px; height: 150px;;" :src="data.imgUrl" class="pt-2">
          <span v-if="!formSuccess" v-for="error in v$.imgUrl.$errors" :key="error.$uid" class="text-red-500">
            {{ error.$message }}
          </span>
        </div>
        <!-- <drag-and-drop @change="handleImage" class="w-full"  placeholder="תמונה" nameValue="תמונה" type="file"></drag-and-drop> -->
      </div>
      <p v-if="formError" class="text-red-500">
        אירעה שגיאה, נסה שוב מאוחר יותר
      </p>
      <button class="w-full my-5 rounded-md text-center text-white bg-[#b97c73] block px-3 py-2" type="submit">
        <span v-if="!formLoad">הרשמה</span>
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
import { required, email, minLength, sameAs, integer } from '@vuelidate/validators'
import { computed } from '@vue/reactivity';
import {useRouter} from "vue-router";
import ages from '../assets/ageGroups.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CustomInput from '../components/CustomInput.vue'
import DragAndDrop from '../components/DragAndDrop.vue';


const router = useRouter();


const formLoad     = ref(false);
const formError    = ref(false);
const formSuccess  = ref(false);
const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  phone: "",
  age: "",
  price: "",
  imgUrl: "",
  address: {
    city: "",
    details: "",
  },
  gender: "",
  ageGroups: [],
  description: "",
};
const data  = reactive({ ...initialState });
const rules = computed(() => {
  return {
    firstName: { required, minLength: minLength(2)  },
    lastName: "",
    password: { required, minLength: minLength(4) },
    email: { required, email  },
    phone: { integer },
    age: "",
    price: { integer },
    imgUrl: "",
    address: {
      city: "",
      details: "",
    },
    gender: "",
    ageGroups: { required, minLength: minLength(1) },
    description: "",
  }
})
const v$ = useValidate(rules, data)

async function submit() {
  // console.log(data);
  const verified = await v$.value.$validate()
  formLoad.value = true;
  try {
    if (verified) {
      const res = await store.dispatch('register',data);
      formLoad.value    = false;
      formSuccess.value = true;
      Object.assign(data, initialState);
      alertSuccess()
      setTimeout(() => router.push('/login'), "1500");
    } else {
      alertError("נא לתקן את השגיאות")
      formLoad.value = false;
    }
  } catch (error) {
    console.log(error);
    alertError("נא לתקן את השגיאות")
    formError.value = true;
    formLoad.value  = false;
  }
}
function alertError(errorMessage) {
  toast.error(errorMessage, {
    autoClose: 2000,
    rtl: true,
  });
}
function alertSuccess() {
  toast.success("נרשמת בהצלחה, הנך מועבר.ת לדף התחברות", {
    autoClose: 2000,
    rtl: true,
  });
}
function handleImage(e){
  const file = e.target.files[0];
  console.log(file.type.split("/")[0]);
  if(file.type.split("/")[0] != "image") {
    alertError("תמונה צריכה להיות בפורמט JPEG / PNG")
    return
  }else setFileToBase(file);
}
function setFileToBase (file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () =>{
    console.log(reader.result);
    data.imgUrl = reader.result
  }
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