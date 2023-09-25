<template>
  <div class="star-rating">\
        <label class="star-rating__star" v-for="rating in ratings" 
        :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}" 
        v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">
        <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" 
        v-model="value" :disabled="disabled">★</label></div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const name = ref('')
const value = ref('')
const id = ref('')
const disabled = ref('')
const required = ref('')
const ratings = [1, 2, 3, 4, 5];

 function star_over(index) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = this.value;
        return this.value = index;
      }

    }
    function star_out() {
      var self = this;

      if (!this.disabled) {
        return this.value = this.temp_value;
      }
    }
    function set(value) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = value;
        return this.value = value;
      }
    }
</script>
