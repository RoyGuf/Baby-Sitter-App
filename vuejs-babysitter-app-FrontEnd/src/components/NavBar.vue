<template>
  <header class="z-50 bg-white shadow-lg shadow-slate-500 h-68 fixed w-full top-0"
  :class="[scrollPosition >= 250 ? 'shrink' : '', '']">
    <div class="max-w-[1200px] items-center mx-auto head">
      <div class="justify-between item-stretch flex p-1 h-24 md:h-44">
        <header-menu></header-menu>
        <up-button></up-button>
        <div class="logo flex mx-auto my-0 w-3/5 max-[600px]:w-full items-center z-50">
          <router-link :to="{ name: 'home' }" class="justify-center inline-flex h-full px-5 w-full">
            <img src="https://res-console.cloudinary.com/dicrh8yqo/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/YmFieXNpdHRlcnMtaW1hZ2VzL3Rlc3QveGd1NDc1OXVkc2IycG9va3Jtd3M=/template_primary"
              class="w-auto items-center h-auto block justify-center">
          </router-link>
        </div>
      </div>
      <div class="search relative max-w-screen-lg mx-auto flex flex-col px-3 pb-9 pt-0 justify-center max-[600px]:pb-6 z-50" dir="rtl">
        <button class="absolute left-10" @click="searchBabySitter">
          <span class="material-symbols-outlined">
          search
          </span>
        </button>
        <input type="text" v-model="keyword" class="h-9 md:h-11 rounded-3xl border-2 border-grey-200 w-full" placeholder="חיפוש חופשי"
          @keyup="searchBabySitter"
          @keyup.enter="searchBabySitter" />
      </div>
      <span class="loader z-50" v-if="searching"></span>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from'vue-router'
import store from '../store';
import HeaderMenu from './HeaderMenu.vue';
import UpButton from './UpButton.vue';
import router from '../router'

const searching      = ref(false);
const route          = useRoute(); 
const keyword        = ref('');
const scrollPosition = ref(0);


onMounted(async () => {
  console.log(process.env.NODE_ENV);
  window.addEventListener('scroll', updateScroll); // for shrink header
  if(route.params.name){
    keyword.value = route.params.name
    searchBabySitter(); // search babysitters by keyword value
  }
  try {
    const localAuth = localStorage.getItem("isAuthenticated"); // flag of auth cookie
    if(localAuth && new Date().getTime() < JSON.parse(localAuth).expDate){ // if there is a JWT cookie
      const response = await store.dispatch('getAuthentication') // check JWT
      if(response) store.dispatch('setAuth', true);
      else store.dispatch('setAuth', false);
    }else{
      localStorage.removeItem("isAuthenticated");
    }
  } catch (e) {
    store.dispatch('setAuth', false);
  }
});

// search babysitters by keyword value
function searchBabySitter() {
  searching.value = true;
  if(keyword.value){
    console.log(store.state.babySitters.data.length);
    if(store.state.babySitters.data.length == 0){ // check if store have babySitters
      router.push({ name: 'byName', params: { name: keyword.value } })
      .then(() => store.dispatch('getAllBabySitters'))
      .then(() => {
        searching.value = false;
        store.dispatch('searchBabySitters', keyword.value)
      })
    }else{
      router.push({ name: 'byName', params: { name: keyword.value } })
      .then(() => {
        searching.value = false;
        store.dispatch('searchBabySitters', keyword.value)
      })
    }
  }else{
    searching.value = false;
  }
};

function updateScroll() {
  scrollPosition.value = window.scrollY
};


</script>

<style scoped>
  #toggle {
    display: none;
  }
  header{
    background-color: #cb4e3a;
    color: #fff;
    z-index: 999;
  }
  @media screen and (min-width: 768px) {
    header.shrink, header.shrink > div > div{
      max-height: 100px;
      transition: all 0.3s ease-out;


    }
    header.shrink .logo{
      max-height: 100px;
      height: 100px !important;
      transition: all 0.3s ease-out;


    }
    header.shrink .search{
      display: none;
      transition: all 0.3s ease-out;
    }
    header.shrink .head::before{
      transform: skew(0deg, 6deg);
    }
    header.shrink .head::after{
      transform: skew(0deg, -6deg);
    }
  }
  .head::before{
    content: "";
    position: absolute;
    top: 0%;
    left: 0;
    height: 100%;
    width: 50%;
    background: #cb4e3a;
    transform: skew(0deg, 3deg);
  }
  .head::after{
    content: "";
    position: absolute;
    top: 0%;
    right: 0;
    height: 100%;
    width: 50%;
    background: #cb4e3a;
    transform: skew(0deg, -3deg);
  }
  @media (max-width: 768px){
    .head::after, .head::before{
      top: 3%;
    }
  }

  header input{
    color: #232323;
  }
  
  svg, .material-symbols-outlined{
    fill:#232323;
    color: #232323;
    display: block;
  }
 
  .loader {
    width: 25px;
    height: 25px;
    position: absolute;
    border: 5px solid #eee;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    z-index: 99999;
    margin: 0 auto;
    right: 0;
    left: 0;
    bottom: -10px;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
  
</style>