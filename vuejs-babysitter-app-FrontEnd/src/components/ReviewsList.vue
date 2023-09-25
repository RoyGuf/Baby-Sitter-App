<template>
  <div v-for="review of propsObject.dataArray.reviews" 
      :key="propsObject.dataArray._id" 
      :propsObject.dataArray="propsObject.dataArray"
      class=" border-radius-2 border-gray-300 border-2 mt-2 shadow-xl bg-slate-50">
    <div class="border-b-gray-300 border-b-2 ">
      <router-link v-if="review.customer_id && !hideName"
          :to="{ name: 'customerDetails', params: {id: review.customer_id._id} }">        
          <div class="inline-flex text-lg bg-slate-200 p-3 shadow">{{ review.customer_id ? review.customer_id.name : 'ללא שם' }}</div>
      </router-link>
      <div v-if="!review.customer_id && !hideName" 
        class="inline-flex text-lg bg-slate-200 p-3 shadow">
        {{ review.customer_id ? review.customer_id.name : 'ללא שם' }}
      </div>
      <div class="inline-flex  px-10 text-center items-center ">דירוג:   
        <p class="shadow-xl text-md font-medium py-3 px-6 small-star mx-4">   {{ review.rate }}</p>
      </div>
    </div>
    <div class="h-20 p-2 font-black font-mono  ">{{ review.description }}</div>
  </div>
  <button class="my-3 rounded-md text-center text-white bg-gray-600 w-1/2 block px-3 py-2 mx-auto" 
          @click.prevent="showForm = !showForm"
          v-if="!hideName">{{ !showForm ? 'הוסף ביקורת' : 'סגור' }}
  </button>
  <Transition :duration="550" mode="out-in" name="nested">
    <ReviewForm v-if="showForm" v-model="showForm" @eventname="showForm = !showForm"></ReviewForm>
  </Transition>
</template>

<script setup>

import { useRoute } from'vue-router'
import { ref, onMounted, onUpdated } from 'vue';
import ReviewForm from './ReviewForm.vue';


const route       = useRoute();
const hideName    = route.fullPath.includes('customer')
const propsObject = defineProps(["dataArray"]); //store.state.currentBabySitter
const showForm    = ref(false);


</script>

<style scoped>
:deep(.sr-only){display:none !important}
.outer, .inner {
	background: #eee;
  padding: 30px;
  min-height: 100px;
}
  
.inner { 
  background: #ccc;
}
  
.nested-enter-active, .nested-leave-active {
	transition: all 0.5s ease-in-out;
}
/* delay leave of parent element */

.nested-enter-from,
.nested-leave-to {
  /* transform: translateY(30px); */
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
	transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
.small-star {
  /* height: 30px; */
  /* width: 30px; */
  -webkit-clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  text-align: center;
  background: #ffd055;
  color: #000;
  border-radius: 10%;
  border: 1px solid #000;
}
/* 
.star::before , .small-star::before{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  content: '';
  border-radius: 10%;
}

.rating:not(:checked) > input {
    position:absolute;
    top:-9999px;
    clip:rect(0,0,0,0);
}

.rating:not(:checked) > label {
    float:right;
    width:1em;
    padding:0 .1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:200%;
    line-height:1.2;
    color:#ddd;
    text-shadow:1px 1px #bbb, 2px 2px #666, .1em .1em .2em rgba(0,0,0,.5);
}

.rating:not(:checked) > label:before {
    content: '★ ';
}

.rating > input:checked ~ label {
    color: #f70;
    text-shadow:1px 1px #c60, 2px 2px #940, .1em .1em .2em rgba(0,0,0,.5);
}

.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
    color: gold;
    text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
}

.rating > input:checked + label:hover,
.rating > input:checked + label:hover ~ label,
.rating > input:checked ~ label:hover,
.rating > input:checked ~ label:hover ~ label,
.rating > label:hover ~ input:checked ~ label {
    color: #ea0;
    text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
}

.rating > label:active {
    position:relative;
    top:2px;
    left:2px;
} */
</style>


<!-- <fieldset class="rating" >
      <legend class="block text-sm font-medium text-slate-700 py-2">דירוג</legend>

      <input  value="1" v-model="data.rate" id="one" class="block mx-3 peer/one" type="radio" name="status" checked />
      <label for="one" class="peer-checked/one:text-sky-500">1</label>
      <input  value="2" v-model="data.rate" id="two" class="block mx-3 peer/two" type="radio" name="status" checked />
      <label for="two" class="peer-checked/two:text-sky-500">2</label>
      <input  value="3" v-model="data.rate" id="three" class="block mx-3 peer/three" type="radio" name="status" checked />
      <label for="three" class="peer-checked/three:text-sky-500">3</label>
      <input  value="4" v-model="data.rate" id="four" class="block mx-3 peer/four" type="radio" name="status" checked />
      <label for="four" class="peer-checked/four:text-sky-500">4</label>
      <input  value="5" v-model="data.rate" id="five" class="block mx-3 peer/five" type="radio" name="status" checked />
      <label for="five" class="peer-checked/five:text-sky-500">5</label>
    </fieldset> -->