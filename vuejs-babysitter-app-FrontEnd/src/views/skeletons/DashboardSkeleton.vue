<template>
  <div class="p-4 md:p-10 md:max-w-7xl mx-auto flex justify-between">
    <!-- side tabs -->
    <div class="w-full block">
      <div class="h-14 w-full block p-3 px-6 bg-[#d19d94b8] rounded ml-7 font-semibold text-2xl text-[#eee] border-[#9d9d9d] border-1[px] shadow-md" >
      
      </div>
      <div class="w-full flex">
        <ul class="w-1/4 tabs_header items-center">
          <li v-for="title in 4" 
            ref="scrollToMe"
            class="h-[52px] shadow-md block mr-0 max-[600px]:px-2 max-[600px]:mx-0.5 rounded w-full text-center p-3 bg-slate-200 m-2 cursor-pointer hover:bg-slate-400" 
            :key="title" 
            :id="title">
          </li>
        </ul>
        <!-- middle content -->
        <div class="block ml-0 md:ml-0 bg-white shadow-md m-2  md:mx-4 w-3/4 rounded-xl border-[#b7b7b7] border-[1px] border-solid">
          <!-- img and name -->
          <div class="p-3">
            <div class="flex mx-auto w-full  h-44  relative">
              <img  
                class="rounded-md md:w-40 w-1/2 object-fill my-0  border-slate-400 border-1 ">
                
              <div class="p-3 w-1/2 md:w-1/4 py-4 h-10">
                <h1 class=" p-3 font-semibold text-center my-0 inline-flex items-center w-full h-8"></h1>
              </div>
            </div>
            <!-- <button class="p-3 my-2 w-1/3 bg-[#d38f85] text-[#fff] rounded-md font-semibold h-14 text-center items-center" @click="showInput = !showInput"></button> -->

          </div>
          <!-- tab content -->
          <div class="tab-content  p-3 overflow-auto">
          <div v-for="index in 3" class="my-2 p-3 px-6 border-gray-300 border-[1px] hover:bg-[#fbf2f1] rounded-md shadow-lg hover:scale-y-105 transition ease-out">
            <div>
              <h1 class="h-10 w-full py-1 px-3 text-xl font-semibold border-b-gray-200 border-b-[1px]"></h1>
              <p class="h-16 w-full py-4 px-2 text-lg">
              </p>
            </div>
          </div>
        </div>
        </div>
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

p, h1, img, .tab-content>div {
  animation: pulse-bg 2s infinite;
  border-radius: 6px;
    box-shadow: 0 0 2px;
}
.tab-content>div h1 , .tab-content>div p{
  box-shadow: none;
  border-radius: 0;

}
button{
  animation: pulse-bg 2s infinite;
  border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
:deep(li, button){animation: pulse-bg-tab 2s infinite}
.material-symbols-outlined{
  z-index: 999;
  color: red;
  position: absolute;
  top: 20px;
  right: 20px;
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
input.img-input{
  display: none;
}
.tabs_header li.selected{
    color: white;
    background-color: slategray;
  }
  .tabs_header li{
    border: 1px solid #d3caca;
    border-bottom: outset;
    /* scroll-margin-top: -1000px; */
  }
</style>