<template>
  <div class="relative w-48" ref="ddRef" >
    <button
      @click="isOpen = !isOpen"
      class="w-full text-left px-4 py-2 border border-gray-300 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
    >
      <span v-if="selected.length === 0" class="text-gray-400 mdi mdi-map-marker"><span class="pl-2">Location</span></span>
      <span v-else class="truncate">
        <span class="text-gray-400 mdi mdi-map-marker pr-2"></span>
        {{ selected.slice(0, 1).join(', ') }}<span v-if="selected.length > 1">...</span>
      </span>
    </button>

    <div
      v-show="isOpen"
      class="absolute z-10 mt-1 w-full bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 dark:opacity-80 rounded-md max-h-60 overflow-y-auto"
    >
      <label
        v-for="location in locations"
        :key="location"
        class="flex items-center px-4 py-2 hover:bg-pink-100 dark:hover:bg-gray-500 cursor-pointer"
      >
        <input
          type="checkbox"
          :value="location"
          v-model="selected"
          class="form-checkbox text-pink-600 focus:ring-pink-500 rounded"
        />
        <span class="ml-2 text-gray-800 dark:text-gray-200">{{ location }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const selected = ref<string[]>([])

const ddRef = ref<HTMLElement | null>(null)


const locations = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Miami',
  'San Francisco',
  'Seattle',
  'Boston',
  'Dallas',
  'Atlanta'
]

const handleClickOutside = (event: MouseEvent) => {
  if (ddRef.value && !ddRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
