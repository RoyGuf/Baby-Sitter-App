<template>
  <span v-if="nameValue" class="block text-md font-medium text-slate-700 py-2">{{ nameValue }}</span>
  <input :value="modelValue" :type="type" :class="class"
    @change="$emit('change', $event)"
    @input="handleInput($event.target.value)"
      class="peer mt-1 block  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-[#cb4e3a] invalid:text-pink-600
      focus:invalid:border-[#cb4e3a] focus:invalid:ring-[#cb4e3a]"
      :placeholder="placeholder" required>
</template>

<script setup>

const inputData   = defineProps({
  nameValue: String,
  modelValue: String,
  placeholder: String,
  type: String,
  class: String,
  change: Function
});
const emit        = defineEmits(['change', 'update:modelValue'])
const handleInput = (e) => emit('update:modelValue', e)

</script>

<style>

</style>