<template>
  <div id="error" :style="{display: displayVar}" :class="{ active: showError }" class="error fixed bg-red-400 font-semibold text-xl w-11/12 text-center p-5 m-3 z-10 rounded-md shadow-md">hiiii</div>
  <!-- <div id="success"  :style="styleObject" :class="{ active: showSuccess }" class="success fixed bg-green-400 font-semibold text-xl w-11/12 text-center p-5 m-3 z-10 rounded-md shadow-md">hiiii</div> -->

</template>

<script >
import { ref } from 'vue';

export default {
    data() {
      return {
        
      }
    },
    setup(props, {slots}){
      const showError = ref(false);
      const showSuccess = ref(false);
      let displayVar= 'block'

      // provide("selectedTitle", selectedTitle)
      return {
        showError,
        showSuccess,
        displayVar
      }
    },
    methods: {
      alertError: function(){
        this.displayVar = 'block';
      },
      alertSuccess: function(){
        this.showSuccess = true;
      }
    }
  }
// const showError = ref(false);
// const successError = ref(false);

// function alertError(){
//   showError.value = true;
// }
// function alertSuccess(){
//   showError.successError = true;
// }
</script>

<style>

.active{
  display: block;
}

.error {
  display: none;
  opacity: 1;
  animation: fade 7s linear;
  animation-fill-mode: forwards;
}


@keyframes fade {
  0%,100% { opacity: 0 }
  1%, 50%, 75% { opacity: 1 }
}

</style>

