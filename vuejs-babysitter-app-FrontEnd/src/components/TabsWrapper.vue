import { ref } from 'vue';
<template>
  <div class="tabs w-full ">
    <ul class="tabs_header items-center flex justify-between ">
      <li v-for="title in tabTitles" 
        ref="scrollToMe"
        class="mr-0 font-semibold max-[600px]:px-2 max-[600px]:mx-0.5 rounded w-full text-center p-3 bg-[#cb4e3a40] m-2 cursor-pointer hover:bg-[#cb3a3a75]" 
        :key="title" 
        :id="title"
        :class="{selected: title == selectedTitle}"
        @click="clickTabTitle(title)">
        {{ title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  import { ref, provide } from 'vue';
  export default {
    setup(props, {slots}){
      const tabTitles     = ref(slots.default().map((tab) => tab.props.title))
      const selectedTitle = ref(tabTitles.value[0])

      provide("selectedTitle", selectedTitle)
      return {
        selectedTitle,
        tabTitles,
      }
    },
    methods: {
      clickTabTitle(title) {
        this.selectedTitle = title
        const yOffset = -200;
        const element = document.getElementById(title);
        const y       = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
        // element.scrollIntoView({behavior: "smooth"})
        // window.scrollTo({top: 200, behavior: 'smooth'});
      }
    }
  }
  
</script>

<style scoped>
  .tabs {
    margin: 0 auto;
  }
  .tabs_header li.selected{
    color: white;
    background-color: #cb3a3acf;
    transition: 0.4s;
  }
  .tabs_header li{
    border-bottom: outset;
    transition: 0.4s;

    /* scroll-margin-top: -1000px; */
  }
</style>
