<template>
<div @click="handleclick"
  class="w-24 h-24 md:w-34 md:h-34 mx-1 my-2
         border border-gray-300 hover:bg-amber-50
         rounded-3xl shadow dark:hover:bg-gray-800
         transition-all duration-300 ease-in-out 
         flex flex-col items-center justify-center 
         cursor-pointer group relative overflow-hidden"
        :class="{
          'bg-amber-50 dark:bg-gray-800': item.id === storeFilter.category_id,
        }"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-700 dark:to-gray-900 
           opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
  ></div>

  <div
    class="z-10 w-12 h-12 md:w-16 md:h-16 
           bg-gradient-to-br from-purple-600 to-pink-500 
         text-white rounded-full 
           flex items-center justify-center 
           group-hover:scale-110 transition-transform duration-300 ease-out"
  >
    <i class="mdi mdi-lightning-bolt text-3xl md:text-4xl"></i>
  </div>

  <h3
    class="z-10 mt-3 text-xs md:text-sm font-medium  text-center 
           group-hover:text-pink-600 transition-colors duration-300 line-clamp-1 px-2"
      :class="{
          'text-pink-600 dark:text-pink-400': item.id === storeFilter.category_id,
      }"
  >
    {{ item.name }}
  </h3>
</div>

</template>

<script setup lang="ts">
import type { StoreCategory } from '@/types/store';
import { useStore } from '@/composables/useStore';

const props = defineProps<{
  item: StoreCategory
}>()

const {
  storeFilter,
  filterStores,
  getData

} = useStore()

const handleclick = () => {
  const id =  props.item.id
  if(storeFilter.value.category_id == id) {
    storeFilter.value.category_id = null
  } else {
    storeFilter.value.category_id = id
  }
  getData()
}

</script>

<style scoped></style>
