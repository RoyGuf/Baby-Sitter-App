<template lang="html">
  <div class="tab-content p-5 overflow-auto" v-show="title == selectedTitle">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'
  export default {
    props: {
      title: {
        type: String,
        default: 'Tab'
      }
    },
    setup() {
      const selectedTitle = inject("selectedTitle")
      return {
        selectedTitle,
      }
    }
  }
</script>

<style scoped>
  .tab-content{
    min-height: 200px;
    border: 1px solid #8080806e;
    border-radius: 10px;
  }
</style>
