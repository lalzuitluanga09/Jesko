<template>
  <div
    @click="select"
    :class="selectedCategory === title + ' Stores' ? 'bg-amber-50 dark:bg-gray-400' : 'bg-gray-50 dark:bg-gray-500'"
    class="w-28 h-28 md:w-38 md:h-38 lg:w-42 lg:h-42 hover:bg-amber-50 dark:hover:bg-gray-400 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 md:p-8 flex flex-col items-center cursor-pointer group"
  >
    <div
      class="w-10 h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:scale-105 transition-transform duration-300"
    >
      <i class="mdi mdi-lightning-bolt text-2xl md:text-4xl lg:text-5xl" style="color: white"></i>
    </div>
    <h3
      class="text-xs md:text-base lg:text-lg font-medium text-center line-clamp-1"
    >
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/useStore'

const props = defineProps<{
  title: string
}>()

const { selectedCategory, storeItems, loading } = useStore()
let timeout: ReturnType<typeof setTimeout> | null = null

const select = () => {
  loading.value = true
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    if (selectedCategory.value == props.title + ' Stores') {
      selectedCategory.value = ''
      storeItems.value = 4
    } else {
      selectedCategory.value = props.title + ' Stores'
      storeItems.value = 2
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped></style>
