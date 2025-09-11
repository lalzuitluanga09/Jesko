<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span class="mdi mdi-magnify text-xl text-gray-400"></span>
      </div>
      <input
        type="text"
        id="table-search"
        class="block w-52 md:w-80 py-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="title"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>


<style scoped>

</style>