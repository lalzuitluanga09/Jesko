<template>
  <div class="relative" ref="ddRef" >
    <button
      @click="isOpen = !isOpen"
      class="w-full text-left px-4 py-2 border border-gray-300 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
    >
      <span class="text-gray-400 mdi mdi-map-marker"></span>
    </button>

    <div
      v-show="isOpen"
      class="absolute z-10 mt-1 w-48 bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 dark:opacity-80 rounded-md max-h-60 overflow-y-auto"
    >
      <label
        v-for="item in options"
        :key="item.id"
        class="flex items-center px-4 py-2 hover:bg-pink-100 dark:hover:bg-gray-500 cursor-pointer"
      >
        <input
          type="checkbox"
          :value="item.id"
          v-model="selected"
          class="form-checkbox text-pink-600 focus:ring-pink-500 rounded"
        />
        <span class="ml-2 text-gray-800 dark:text-gray-200">{{ item.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from '@/types/location';
import { onMounted, onUnmounted, ref, watch } from 'vue'

defineProps<{
  options: Location[]
}>()

const isOpen = ref(false)
const selected = ref<number []>([])

const ddRef = ref<HTMLElement | null>(null)

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

const emit = defineEmits<{
  (e: 'select', value: number[]): void;
}>();

watch(selected, (newValue) => {
  emit('select', newValue);
});
</script>
