<template dir="rtl" >
  <div class="md:max-w-7xl mx-auto p-20 m-3 max-[600px]:px-2 bg-white"> <!-- v-if="Object.keys(Object.keys).length = 0" -->
    <div class="flex my-0 mx-auto w-full  h-44 py-3">
      <p class="shadow-md rounded-md w-40 my-0 border-slate-400 border-2 p-5 bg-slate-50"></p>
      <div class="px-3">
        <h1 class="shadow-md rounded-md w-60 h-6  m-1 my-3 mb-6"></h1>
        <p class="shadow-md rounded-md w-40 h-4  m-1 my-2"></p>
        <p class="shadow-md rounded-md w-44 h-4 m-1"></p>
      </div>
    </div>
    <div>
      <tabs-wrapper>
        <tab title="">
        </tab>
        <tab title="">
        </tab>
        <tab title="">
        </tab>
        <tab title=""></tab>
      </tabs-wrapper>
    </div>
  </div>
</template>

<script setup>
import Tab from '../../components/Tab.vue';
import TabsWrapper from '../../components/TabsWrapper.vue'


</script>

<style scoped>
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #db8e82;
  }
  100% {
    background-color: #eee;
  }
}

@keyframes pulse-bg-tab {
  0% {
    background-color: #eaeaea;
  }
  50% {
    background-color:  #c7a29d;
  }
  100% {
    background-color: #eaeaea;
  }
}

p, h1, img {
  animation: pulse-bg 2s infinite;
}
:deep(li){animation: pulse-bg-tab 2s infinite}
:deep(div.tab-content:not(:first-child)){
  display: none;
}
:deep(div.tab-content:first-child){
  display: block !important;
}


</style>