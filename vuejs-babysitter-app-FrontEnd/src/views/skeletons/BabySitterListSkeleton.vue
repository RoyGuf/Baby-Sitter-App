<template>
  <div class="md:max-w-[1200px] mx-auto pt-3">
    <div class="w-full p-2 filter">
      <p class="px-10 font-semibold">גילאים:</p>
      <div class="px-3 md:gap-1 gap-1 grid grid-cols-3 md:grid-cols-8">
        <li
           class="inline mx-2 shadow-sm  bg-[#fff] md:px-5 py-2 rounded text-center p-2 m-2 cursor-pointer hover:bg-slate-300">
          </li>
          <label  class="hamburger ">
            <div class="top-bun "></div>
            <div class="meat "></div>
            <div class="bottom-bun "></div>
          </label>
      </div>
    </div>
    <div class="item_list grid grid-cols-1 md:grid-cols-3 gap-5 p-8 max-[600px]:gap-15 px-0" >
      <BabySitterListItem 
        class="max-[600px]:px-15 "/>
    </div>
  </div>
  <div class="text-center text-2xl p-20">לא נמצאו תוצאות</div>
</template>

<script setup>


</script>

<style scoped>
.filter li.selected{
  color: white;
  background-color: #b97c73;
}
.filter li{
  border: 1px solid #d5d3d3;
  border-bottom: outset #db8e82ba;
}
.item_list{
  transition: 0.2s ease-out;
}

</style>