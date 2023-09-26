<template>
<div class="sidebar">
  <input id="toggle" type="checkbox" ref="menu" v-model="showNav"  />
  <label for="toggle" class="hamburger z-50"  id="toggle-label">
    <div class="top-bun "></div>
    <div class="meat "></div>
    <div class="bottom-bun "></div>
  </label>
  <div class="nav z-10 w-2/3 lg:w-1/4">
    <div class=" nav-wrapper">
      <nav class="items-center mx-auto my-0 h-full " >
        <li v-if="!auth" class="px:2 md:px-5 pt-20 block items-center h-auto text-xs md:text-lg overflow-hidden ">
          <router-link
            to="/login"
            class="nav-link">
            <span class="material-symbols-outlined">
              verified_user
            </span>
            <span>התחברות</span>
          </router-link>            
        </li>
        <li v-if="!auth" class="px:2 md:px-5 block items-center h-auto  text-xs md:text-lg overflow-hidden ">
          <router-link
            to="/register"
            class="nav-link">
            <span class="material-symbols-outlined">
              person_add
            </span>
            <span>הרשמה</span>
          </router-link>            
        </li>
        <li v-if="auth" class="px:2 md:px-5 pt-20 block items-center h-auto text-xs md:text-lg overflow-hidden ">
          <a href="#" class="nav-link" @click="logout">
          <span class="material-symbols-outlined">
            person_off
          </span>
          <span class="mx-1">התנתקות</span>
          </a>
        </li>
        <li  class="px:2 md:px-5 block items-center h-auto text-xs md:text-lg overflow-hidden ">
          <router-link :to="{ name: 'ages' }"
            class=" transition ease-in-out delay-0 duration-200 text-md md:text-lg  ">
            <span class="material-symbols-outlined">
              person_search
            </span>
            <span >חיפוש לפי גיל</span>
          </router-link>
        </li>
        <li class="px:2 md:px-5 block items-center h-auto text-xs md:text-lg overflow-hidden ">
          <router-link
            to="/about"
            class="nav-link">
            <span class="material-symbols-outlined">
              newspaper
            </span>
          <span>אודות</span>  
          </router-link>            
        </li>
      </nav>
    </div>
  </div>
</div>

</template>

<script setup>
import { onMounted, ref, watch  } from 'vue';
import store from '../store';
import router from '../router'
import { computed } from '@vue/reactivity'
import { toast } from 'vue3-toastify';


const auth    = computed(() => store.getters.getAuthentication)
const showNav = ref(localStorage.getItem("showNav") === "true");

onMounted( () => {
  // close menu when clicking outside of it
  window.document.body.addEventListener('click', toggleNav, false)
})

watch(showNav, (newVal) => {
  localStorage.setItem("showNav", newVal)
})

function logout(){
  store.dispatch('logout')
  .then(() => {
    toast.info("התנתקת מהמערכת", {
      autoClose: 2000,
      rtl: true,
    });
    router.push({ name: 'home' })
  });
}
function toggleNav(event){
  if(event.target.id != 'toggle' 
    && event.target.id != 'toggle-label'
    && event.target.className != 'meat'){
    showNav.value = false;
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  label.hamburger{
    top: 4rem;
  }
  span.material-symbols-outlined{
    margin-right: 0;
    top: 5px;
    font-size: 24px;
  }
}
  .material-symbols-outlined{
    /* margin-right: 6rem; */
    position: absolute;
    display: block;
    font-size: 30px;
  }
  /* .sidebar{
    z-index: 99999;
    background: #000;
  } */
  #toggle {
      display: none;
  }

  /**
    Hamburger
  **/
  .hamburger {
    position: fixed;
    top: 5em;
    right: 5%;
    margin-left: -2em;
    margin-top: -45px;
    width: 3em;
    height: 45px;
    z-index: 999;
    cursor: pointer;
  }

  .hamburger div {
    position: relative;
    width: 3em;
    height: 7px;
    border-radius: 3px;
    background-color: #cdb3af;
    margin-top: 8px;
    transition: all 0.3s ease-in-out;
    border: 0.5px solid #7e1f1f;
  }

  /**
  Nav Styles
  **/
  .nav {
    position: fixed;
    height: 100%;
    background-color: #db8e82;
    opacity: 0.9;
    top: -100%; left: 0; right: 0; bottom: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
    z-index: 99;
  }
  .nav-wrapper {
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
  }
  nav a {
    position: relative;
    text-decoration: none;
    color: #232323;
    font-size: 18px;
    display: block;
    margin-top: 1.25em;
    transition: color 0.2s ease-in-out;
    letter-spacing: 2px;
    padding: 10px;
    text-align: center;
    font-weight: 600;
    /* padding-right: 2px; */
  }
  /* nav a span{
    margin-right: 10px;

  } */
  nav a:before {
    content: '';
    height: 0;
    position: absolute;
    width: 0.25em;
    background-color: white;
    left: 0em;
    transition: all 0.2s ease-in-out;
    top: 0;
  }
  nav a:hover {
    color: white;
  }
  nav a:hover:before {
    height: 100%;
  }

  /**
  Animations
  **/
  #toggle:checked + .hamburger .top-bun {
    transform: rotate(-45deg);
    margin-top: 25px;
  }
  #toggle:checked + .hamburger .bottom-bun {
    opacity: 0;
    transform: rotate(45deg);
  }
  #toggle:checked + .hamburger .meat {
    transform: rotate(45deg);
    margin-top: -7px;
  }

  #toggle:checked + .hamburger + .nav {
    top: 0;
    transform: scale(1);
  }

</style>