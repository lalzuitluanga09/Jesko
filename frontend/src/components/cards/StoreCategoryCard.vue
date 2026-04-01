<template>
  <div @click="handleclick"
    class="w-24 h-24 md:w-32 md:h-32 mx-1 my-2
          border border-gray-300 hover:bg-primary/20
          rounded-4xl shadow dark:hover:bg-bg-soft-dark
          transition-all duration-300 ease-in-out 
          flex flex-col items-center justify-center 
          cursor-pointer group relative overflow-hidden"
          :class="{
            'bg-primary/20 dark:bg-gray-800': item.id === storeFilter.category_id,
          }"
  >

    <div
      class="z-10 w-12 h-12 md:w-14 md:h-14 
            bg-gradient-to-br from-primary to-primary-hover
          text-white rounded-full 
            flex items-center justify-center 
            group-hover:scale-110 transition-transform duration-300 ease-out"
    >
      <i v-if="item.icon" :class="`mdi ${item.icon} text-3xl md:text-4xl`"></i>
      <i v-else class="mdi mdi-lightning-bolt text-3xl md:text-4xl"></i>
    </div>

    <h3
      class="z-10 mt-3 text-xs md:text-sm font-medium  text-center
            group-hover:text-primary transition-colors duration-300 line-clamp-1 px-2"
        :class="{
            'text-primary': item.id === storeFilter.category_id,
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

