<template>
  <div  class="bg-white shadow-md rounded-xl max-[600px]:gap-5">
        <div class="flex flex-row p-3">
          <p class="border-slate-50 border-2 p-5 bg-slate-50 md:w-2/5 border-none w-1/2 basis-1/3 rounded-xl inline h-52 "></p>
             <div class="p-5 inline basis-2/3 md:w-2/3 w-1/2">
                <h3 class="shadow-md rounded-md h-12 p-3 mb-4 py-1 font-semibold block text-xl w-1/2"></h3>
                <p class="shadow-md rounded-md p-3 block my-1"></p>
                <p class="shadow-md rounded-md p-3 block my-1"></p>
                <p class="shadow-md rounded-md p-3 block my-1"></p>
             </div>
        </div>
        <div class="p-3">
          <div class="  py-1 grid grid-cols-3">
            <p class="rounded-sm py-1 m-1 h-6"></p>
            <p class="rounded-sm  py-1 m-1 h-6"></p>
            <p class="rounded-sm  py-1 m-1 h-6"></p>
            <p class="rounded-sm  py-1 m-1 h-6"></p>
            <p class="rounded-sm  py-1 m-1 h-6"></p>
          </div>
          <div class="flex items-center w-full p-1 bottom-0 pt-5">
            <button
              class="h-10 font-semibold w-full text-center p-3 rounded  hover:bg-white hover:text-black bg-[#db8e82ba] text-white">
            </button>
          </div>
        </div>  
    </div>
</template>

<script setup>

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

p, h3, img {
  animation: pulse-bg 1.2s infinite;
}
button {
  animation: pulse-bg-tab 1.2s infinite;
}
:deep(.sr-only){display:none !important}

</style>