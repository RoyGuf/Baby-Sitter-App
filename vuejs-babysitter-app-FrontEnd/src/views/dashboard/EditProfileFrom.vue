<template>
    <form @submit.prevent="submit" class="md:w-full  block">
      <div>
        <div class="w-full flex justify-start">
          <button  v-if="!showInput" :disabled="formLoad" class="p-2 m-2 w-1/3 bg-[#9b5c51] text-[#fff] rounded-md font-semibold  text-center items-center" 
          @click.prevent="showInput = !showInput">
            {{ !showInput ? 'עריכת פרטים' : 'סגור' }}</button>
          <button  v-if="showInput" :disabled="formLoad" class="p-2 m-2 w-1/3 bg-[#9b5c51] text-[#fff] rounded-md font-semibold  text-center items-center" 
          @click.prevent="cancelEdit">ביטול</button>      
          <button  v-if="showInput" :disabled="formLoad" class="w-1/4 p-2 m-2 rounded-md text-center items-center text-white bg-[#b97c73]" type="submit">
            <span v-if="!formLoad">שמירה</span>
            <span v-if="formLoad" class="loader mx-auto"></span>
            <!-- <div v-if="formLoad" class="center">
              <div class="wave"></div>
            </div> -->
          </button>
        </div>
        <div class="p-4" >
          <p class="flex items-center h-10 my-2  flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>שם פרטי : </strong>
            <div> {{ babySitter.firstName }}</div>
            <custom-input id="firstName" required="true" v-if="showInput"  class="h-8 w-1/2 flex-initial mr-auto  mt-auto transition" v-model="babySitter.firstName" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>שם משפחה : </strong>
            <div> {{ babySitter.lastName }}</div>
            <custom-input id="lastName" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto" v-model="babySitter.lastName" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>טלפון : </strong> 
            <div> {{ babySitter.phone }}</div>
            <custom-input id="phone" required="true" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.phone" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.phone.$errors" :key="error.$uid" class=" text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>אימייל : </strong> 
            <div>{{ babySitter.email }}</div>
            <custom-input id="email" required="true" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.email" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>גיל : </strong>
            <div>{{ babySitter.age }}</div>
            <custom-input id="age" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.age" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.age.$errors" :key="error.$uid" class="text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 border-b-gray-200 border-b-[1px] pb-3"><strong>מגדר : </strong>
            <div>{{ babySitter.gender }}</div>
            <select v-model="babySitter.gender" v-if="showInput"
              class=" bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 h-8 w-1/2 flex-initial mr-auto py-1"
              placeholder="מחיר" required>
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
              <option value="אחר">אחר</option>
            </select>
            <!-- <custom-input  v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto" v-model="babySitter.gender" type="text"></custom-input> -->
          </p>
          <p class="flex items-center h-10 my-2 flex-wrap border-b-gray-200 border-b-[1px] pb-3"><strong>תעריף לשעה : </strong>
            <div>{{ babySitter.price }}  ₪</div> 
            <custom-input id="price" required="true" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.price" type="text"></custom-input>
            <span v-if="!formSuccess" v-for="error in v$.price.$errors" :key="error.$uid" class="text-red-500 basis-full">
              {{ error.$message }}
            </span>
          </p>
          <p class="flex items-center h-10 my-2 border-b-gray-200 border-b-[1px] pb-3"><strong>עיר : </strong>
            <div>{{ babySitter.address ? babySitter.address.city : babySitter.address }}</div>
            <custom-input id="city" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.address.city" type="text"></custom-input>
          </p>
          <p class="flex items-center h-10 my-2 border-b-gray-200 border-b-[1px] pb-3"><strong>כתובת : </strong>
            <div>{{ babySitter.address ? babySitter.address.details : babySitter.address }}</div>
            <custom-input id="details" v-if="showInput" class="h-8 w-1/2 flex-initial mr-auto mt-auto" v-model="babySitter.address.details" type="text"></custom-input>
          </p>
          <div class="flex items-center my-2 h-28 border-b-gray-200 border-b-[1px] pb-3">
            <div class="">
              <h1 class="font-bold underline underline-offset-4">קצת על {{ babySitter.firstName }} :</h1>
              <div>{{ babySitter.description }}</div>
            </div>
            <textarea id="description" v-if="showInput" v-model="babySitter.description" type="text" 
              class="h-full w-1/2 flex-initial mr-auto peer  block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none"
              placeholder="אודות" required></textarea>
          </div>
          <div class="flex items-center my-1 h-32 border-b-gray-200 border-b-[1px] pb-3">
            <div class="h-full">
              <p class="font-semibold">{{ babySitter.firstName }} עובד.ת עם גילאים:</p>
              <div class="inline-block w-1/2" v-for="age of babySitter.ageGroups">
                <li >{{  age }}</li>
              </div>
            </div>
            <div v-if="showInput" class=" w-1/2 flex-initial mr-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                <div v-for="age in ages" class="">
                  <input
                  type="checkbox"
                  class="default:ring-2"
                  v-model.number="babySitter.ageGroups"
                  :id="age.id"
                  :value="age.title"
                  @change="save"
                  />
                <label class="px-2">גילאים: {{ age.title }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

</template>


<script setup>
import { onMounted, ref, watch  } from 'vue';
import store from '../../store';
import { toast } from 'vue3-toastify';
import useValidate from '@vuelidate/core'
import { computed } from '@vue/reactivity';
import CustomInput from '../../components/CustomInput.vue'
import { required, email, minLength, sameAs, integer, maxLength, decimal } from '@vuelidate/validators'
import Swal from 'sweetalert2'
import ages from '../../assets/ageGroups.js'



const showInput          = ref(false);
const formSuccess        = ref(false);
const originalBabysitter = ref({});
const emit               = defineEmits(['cancelEdit', 'changeFormLoad', 'clickTabTitle'])
const inputData          = defineProps({
  babySitter: Object,
  formLoad: Boolean
});
watch(inputData.babySitter, (newVal) => {
  inputData.babySitter.value  = newVal;
})
onMounted(() => {
  originalBabysitter.value = JSON.parse(JSON.stringify(inputData.babySitter));
});

// validation rules
const rules = computed(() => {
  return {
    firstName: { required, minLength: minLength(2), maxLength: maxLength(10)  },
    lastName: "",
    email: { required, email  },
    phone: { integer },
    age: { decimal },
    price: { decimal },
    imgUrl: "",
    address: {
      city: "",
      details: "",
    },
    gender: "",
    ageGroups: [],
    description: "",
  }
})
const v$    = useValidate(rules, inputData.babySitter);

// submit form
async function submit() {
  emit('changeFormLoad', true)
  const isDeepEqualObj   = isDeepEqual(originalBabysitter.value, inputData.babySitter)
  const verified = await v$.value.$validate()
  try {
    if (verified && !isDeepEqualObj) {
      const {_id, createdAt, __v, updatedAt, value, reviews, avatar, ...newData} = inputData.babySitter.value;
      await store.dispatch('updateBabySitter',{
        data: newData, 
        id: inputData.babySitter._id
      });
      await store.dispatch('getAuthentication');
      emit('cancelEdit');
      formSuccess.value = true;
      showInput.value   = false;
      alertSuccess("השינויים נשמרו בהצלחה");
      setTimeout(() => emit('clickTabTitle', 0), "1000");
    } else {
      alertError("נא לתקן את השגיאות")
      emit('cancelEdit');
    }
  } catch (error) {
    console.log(error);
    alertError("נא לתקן את השגיאות")
    emit('cancelEdit');
  }
};

// toast alerts
function alertError(errorMessage) {
  toast.error(errorMessage, {
    autoClose: 2000,
    rtl: true,
  });
}
function alertSuccess(successMessage) {
  toast.success(successMessage, {
    autoClose: 2000,
    rtl: true,
  });
}

// discard edits
async function cancelEdit(){
  const isDeepEqualObj = isDeepEqual(originalBabysitter.value, inputData.babySitter)
  if(!isDeepEqualObj){
    const result = await Swal.fire({
      title: 'למחוק את השינויים שבוצעו?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'כן',
      denyButtonText: `לא`,
      cancelButtonText: `ביטול`,
      confirmButtonColor: '#cb4e3a',
      denyButtonColor: '#c79a92'
    })
    if (result.isConfirmed) {
      emit('changeFormLoad', true)
      await store.dispatch('getAuthentication');
      showInput.value  = false
      emit('cancelEdit');
      emit('changeFormLoad', false)
      formSuccess.value = true;
    }
  }else{
    showInput.value  = false
    emit('cancelEdit');
    formSuccess.value = true;
  }
  
}

// deep compare 2 objects
const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);
  if (objKeys1.length !== objKeys2.length) return false;
  for (var key of objKeys1) {
    const value1    = object1[key];
    const value2    = object2[key];
    const isObjects = isObject(value1) && isObject(value2);
    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
};
const isObject = (object) => {
  return object != null && typeof object === "object";
};

</script>

<style scoped>
:deep(.sr-only){display:none !important}

.loader {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  0% {
    box-shadow: -72px 0 #FFF inset;
  }
  100% {
    box-shadow: 48px 0 #FFF inset;
  }
}

</style>