<template>
  <dashboard-skeleton v-if="!babySitterLoaded" ></dashboard-skeleton>
  <div v-if="babySitterLoaded" class="pt-10 p-2 md:p-10 md:max-w-7xl mx-auto flex justify-between">
    <div class="w-full block">
      <div class="w-full block p-3 px-6 bg-[#d19d94b8] rounded ml-7 font-semibold text-2xl text-[#eee] border-[#9d9d9d] border-1[px] shadow-md" >
        חשבון
      </div>
      <!-- side tabs -->
      <div class="w-full flex">
        <ul class="w-1/6 md:w-1/4 tabs_header items-center">
          <li v-for="title in titles" 
            ref="scrollToMe"
            class="text-sm md:text-lg shadow-md block mr-0 font-semibold max-[600px]:px-2 max-[600px]:mx-0.5 rounded w-full text-center p-3 bg-[#e3caa9] m-2 cursor-pointer hover:bg-[#d19c72d9]" 
            :key="title" 
            :id="title"
            :class="{selected: title == selectedTitle}"
            @click="clickTabTitle(titles.indexOf(title))">
            {{ title }}
          </li>
        </ul>
        <!-- middle content -->
        <div class="block ml-0 md:ml-0 bg-white shadow-md m-2 md:mx-4 w-5/6 md:w-3/4 rounded-xl border-[#b7b7b7] border-[1px] border-solid"
        :class="{loading: formLoad }">
          <!-- img and name -->
          <div class="p-3">
            <div class="flex mx-auto w-full  h-44  relative">
              <img  :src="babySitter.avatar ? babySitter.avatar.url : ''" :alt="babySitter.firstName + ' ' + babySitter.lastName"
                class="rounded-md md:w-40 w-1/2 object-fill my-0  border-slate-400 border-2 ">
              <!-- edit image -->
              <span title="עדכנ.י תמונה" alt="עדכנ.י תמונה" role="button" @click="selectFiles" class="material-symbols-outlined">edit</span>
              <input class="img-input" type="file"
                name="img-input"
                @change="onFileSelected" 
                ref="fileInput">
              <!-- new profile image  -->
              <div class="mx-1">
                <img v-if="data.imgUrl && data.imgUrl != babySitter.avatar.url" :src="data.imgUrl"
                  class=" h-4/5 rounded-md md:w-40 w-1/2  object-fill my-0  border-slate-300 border-2 border-dashed "/>
                  <div class="w-full flex justify-between h-10">
                    <button v-if="imageSelected" :disabled="imageLoad" class="p-1 m-1 w-1/2 bg-[#ad7979] text-[#fff] rounded-md font-semibold  text-center items-center" 
                      @click.prevent="cancelEdit">ביטול</button>      
                    <button v-if="imageSelected" :disabled="imageLoad" class="w-1/2 p-1 m-1 rounded-md text-center items-center text-white bg-[#508c8d]" 
                      @click.prevent="updateProfileImage">
                      <span v-if="imageSelected && !imageLoad">שמירה</span>
                      <span v-if="imageSelected && imageLoad" class="loader mx-auto"></span>
                    </button>
                  </div>
              </div>
              <div class="px-3  ">
                <h1 class="p-3 font-semibold text-center my-0 inline-flex items-center text-2xl">
                  {{ babySitter.firstName + ' ' + babySitter.lastName }}</h1>
              </div>
            </div>
          </div>
          <!-- tab content -->
          <!-- tab 1 -->
          <div class="tab-content  p-3 overflow-auto" 
            v-show="selectedTitle == titles[0]">
            <DashboardMainPage 
              :babySitter="babySitter" 
              @clickTabTitle="clickTabTitle"></DashboardMainPage>
          </div>
          <!-- tab 2 -->
          <div class="tab-content p-3 overflow-auto " 
            v-show="selectedTitle == titles[1]">
            <EditProfileFrom 
              :babySitter="babySitter" 
              @cancelEdit="cancelEdit" 
              :formLoad="formLoad" 
              @changeFormLoad="changeFormLoad"
              @clickTabTitle="clickTabTitle"></EditProfileFrom>
          </div>
          <!-- tab 3 -->
          <div class="tab-content md:p-7 p-4 overflow-auto" 
            v-show="selectedTitle == titles[2]">
            <drag-and-drop
              :key="keyIndex"
              @change="handleMedia"
              class="w-full"
              placeholder="תמונות"
              nameValue="תמונות"
              type="file">
            </drag-and-drop>
            <div role="button" class="p-3 rounded-md text-center items-center text-white bg-[#508c8d]" @click="uploadMedia" v-if="mediaSelected">
              <span v-if="!imageLoad">שמירת תמונות</span>
              <span v-if="imageLoad" class="loader mx-auto"></span>
            </div>
            <h1 class="font-semibold text-xl block pt-6 pb-3 border-[#eee] border-b-[2px]">מדיה קיימת</h1>
            <div class="flex justify-start py-3 flex-wrap">
              <div v-for="image in babySitter.media" class="relative w-1/3">
                <span title="מחק תמונה" alt="מחק תמונה" class="delete" @click="deleteImage(image)">&times;</span>
                <img  :src="image.url" class=" inline p-2"/>
              </div>
            </div>     
          </div>
          <!-- tab 4 -->
          <div class="tab-content md:p-7 p-4 overflow-auto w-full" 
            v-show="selectedTitle == titles[3]">
            <reviews-list 
              :dataArray="babySitter" 
              :showFormButton="false">
            </reviews-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, watch  } from 'vue';
import store from '../store';
import router from '../router'
import { toast } from 'vue3-toastify';
import ReviewsList from '../components/ReviewsList.vue'
import DragAndDrop from '../components/DragAndDrop.vue';
import DashboardSkeleton from './skeletons/DashboardSkeleton.vue'
import DashboardMainPage from './dashboard/DashboardMainPage.vue';
import EditProfileFrom from './dashboard/EditProfileFrom.vue';
import Swal from 'sweetalert2'



const babySitterLoaded = ref(false);
const mediaSelected    = ref(false);
const babySitter       = ref('');
const data             = ref({});
const mediaObject      = ref({})
const fileInput        = ref();
const scrollToMe       = ref();
const formLoad         = ref(false);
const imageLoad        = ref(false);
const imageSelected    = ref(false);
const keyIndex         = ref(0);
const titles           = [
  "ראשי", "פרטים אישיים", "מדיה", "ביקורות", 
]
const selectedTitle    = ref(titles[0]);

watch(babySitter, (newVal) => {
  babySitter.value  = newVal;
});
onMounted(async () => {
  try {
    await store.dispatch('getAuthentication');
    babySitter.value       = store.getters.getLoggedInBabySitter;
    babySitterLoaded.value = true;
  } catch (err) {
    console.log(err);
    babySitterLoaded.value = true;
    router.push({ name: 'home' });
  }
});
const initialState  = {
  firstName: babySitter.firstName,
  lastName: babySitter.lastName,
  email: babySitter.email,
  phone: babySitter.phone,
  age: babySitter.age,
  price: babySitter.price,
  imgUrl: babySitter.imgUrl,
  address: babySitter.address,
  gender: babySitter.gender,
  ageGroups: babySitter.ageGroups,
  description: babySitter.description,
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

// side tabs
function clickTabTitle(index) {
  const title = titles[index]
  selectedTitle.value = title
  const yOffset = -400;
  const element = document.getElementById(titles[0]);
  const y       = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// media
function handleMedia(images){
  mediaSelected.value = true
  const babysitterName = `${babySitter.value.firstName} ${babySitter.value.lastName} ${babySitter.value.phone}`;
  mediaObject.value    = {
    babysitterName: babysitterName,
    imgUrlArray: JSON.parse(JSON.stringify(images))
  }
}
async function uploadMedia(){
  imageLoad.value = true;
  formLoad.value  = true;
  try {
    await store.dispatch('updateBabySitter',{
      data: mediaObject.value, 
      id: babySitter.value._id
    });
    await store.dispatch('getAuthentication');
    babySitter.value = store.getters.getLoggedInBabySitter;
    formLoad.value   = false;
    imageLoad.value  = false;
    mediaSelected.value = false;
    cancelEdit()
    alertSuccess("השינויים נשמרו בהצלחה")
    keyIndex.value++
    setTimeout(() => clickTabTitle(0), "1000");
  } catch (error) {
    console.log(error);
    alertError("נא לתקן את השגיאות")
    formLoad.value  = false;
    imageLoad.value = false;
  }
}
async function deleteImage(image){
  console.log(image);
  imageLoad.value = true;
  formLoad.value  = true;
  const result = await Swal.fire({
    title: 'האם למחוק את התמונה?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'כן',
    denyButtonText: `לא`,
    cancelButtonText: `ביטול`,
    confirmButtonColor: '#cb4e3a',
    denyButtonColor: '#c79a92',
    imageUrl: image.url,
    imageWidth: 400,
    imageHeight: 200,
  })//.then(async(result) => {
  if (result.isConfirmed) {
    try {
      await store.dispatch('deleteMediaFromBabySitter',{
        babysitterId: babySitter.value._id, 
        mediaId: image._id
      });
      await store.dispatch('getAuthentication');
      babySitter.value = store.getters.getLoggedInBabySitter;
      formLoad.value   = false;
      imageLoad.value  = false;
      cancelEdit()
      alertSuccess("השינויים נשמרו בהצלחה")
      Swal.fire('התמונה נמחקה', '', 'success')
      keyIndex.value++
      setTimeout(() => clickTabTitle(0), "1000");
    } catch (error) {
      console.log(error);
      alertError("נא לתקן את השגיאות")
      formLoad.value  = false;
      imageLoad.value = false;
    }
  } else if (result.isDenied) {
    formLoad.value  = false;
    imageLoad.value = false;
    Swal.fire('התמונה לא נמחקה', '', 'info')
  }else{
    formLoad.value  = false;
    imageLoad.value = false;
  }
  //})
  
}

// profile picture
function selectFiles(){
  fileInput.value.click()
}
function onFileSelected(e){
  const file = e.target.files[0];
  if(!file || file.type.split("/")[0] != "image") {
    alertError("תמונה צריכה להיות בפורמט JPEG / PNG")
    return
  }else setFileToBase(file);
}
function setFileToBase (file) {
  imageSelected.value = true
  const reader        = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () =>{
    data.value.imgUrl= reader.result
  }
}
async function updateProfileImage(){
  imageLoad.value = true;
  formLoad.value  = true;
  try {
    await store.dispatch('updateBabySitter',{
      data: {
        imgUrl: data.value.imgUrl,
        firstName: babySitter.value.firstName,
        lastName: babySitter.value.lastName,
        phone: babySitter.value.phone
      }, 
      id: babySitter.value._id
    });
    await store.dispatch('getAuthentication');
    babySitter.value = store.getters.getLoggedInBabySitter;
    imageLoad.value  = false;
    cancelEdit()
    alertSuccess("השינויים נשמרו בהצלחה")
    setTimeout(() => router.push({ name: 'dashboard'}), "1500");
  } catch (error) {
    console.log(error);
    alertError("נא לתקן את השגיאות")
    imageLoad.value = false;
    formLoad.value  = false;
  }
}

// form functions
function changeFormLoad(val){
  formLoad.value = val;
}
function cancelEdit(){
  imageLoad.value = true;
  formLoad.value  = true;
  if(data.value.imgUrl && data.value.imgUrl != babySitter.value.avatar.url){
    Swal.fire({
      title: 'האם למחוק את התמונה?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'כן',
      denyButtonText: `לא`,
      cancelButtonText: `ביטול`,
      confirmButtonColor: '#cb4e3a',
      denyButtonColor: '#c79a92',
      imageUrl: data.imgUrl,
      imageWidth: 200,
      imageHeight: 200,
    }).then(async(result) => {
    if (result.isConfirmed) {
      data.value.imgUrl   = "";
      fileInput.value     = "";
      babySitter.value    = store.getters.getLoggedInBabySitter;
      formLoad.value      = false;
      imageSelected.value = false;
    }else{
      imageLoad.value = false;
      formLoad.value  = false;
    }})
  }else{
    data.value.imgUrl   = "";
    fileInput.value     = "";
    babySitter.value    = store.getters.getLoggedInBabySitter;
    formLoad.value      = false;
    imageSelected.value = false;
  }
  
}

</script>


<style scoped>
:deep(.sr-only){display:none !important}

@keyframes pulse-bg-tab {
  0% {
    background-color: #fff;
  }
  25% {
    background-color:  #f3fdfa;
  }
  50% {
    background-color:  #fdfcf3;
  }
  75% {
    background-color:  #f3fdf3;
  }
  100% {
    background-color: #fff;
  } 
}
.loader {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}
div.loading {
  animation: pulse-bg-tab 2s infinite;
  /* box-shadow: 0 0 2px; */
}
.material-symbols-outlined{
  z-index: 998;
  color: red;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 50%;
  background: #eee;
  opacity: 0.8;
  width: 30px;
  height: 30px;
  text-align: centers;
  display: flex;
  justify-content: center;
  align-items: center;
}
.material-symbols-outlined:hover{
  scale: 1.15;
  transition: 0.2s ease-out;
}
input.img-input{
  display: none;
}
.tabs_header li.selected{
  color: white;
  background-color: #9b5318ba;
}
.tabs_header li{
  border: 1px solid #d3caca;
  border-bottom: outset;
  /* scroll-margin-top: -1000px; */
}



@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}


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

.delete{
  z-index: 998 ;
  color: red;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  background: #eee;
  opacity: 0.8;
  width: 20px;
  height: 20px;
  text-align: centers;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete:hover{
  scale: 1.15;
  transition: 0.2s ease-out;
}
    
</style>