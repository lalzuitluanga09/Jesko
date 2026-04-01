<template>
  <div ref="dropdownRef" class="relative inline-block w-42 text-sm">
    <button
      class="w-full dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md px-2 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
      @click="isOpen = !isOpen"
    >
    <span class="mdi mdi-sort-variant"></span>
      {{ value }}
      <span class="float-right">
        <i class="mdi" :class="isOpen?'mdi-chevron-up':'mdi-chevron-down'"></i>
      </span>
    </button>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg overflow-hidden"
    >
      <li
        v-for="(option, idx) in options"
        :key="idx"
        @click="select(option)"
        class="px-4 py-2 hover:bg-pink-100 dark:hover:bg-gray-600 cursor-pointer "
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  value: string | null,
  options: any[]
}>()

const isOpen = ref(false)

const dropdownRef = ref<HTMLElement | null>(null)

const emit = defineEmits<{
    (e: 'select', value: any): void
}>();

const select = (selected: any) => {
  emit('select', selected.value);
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
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


<style scoped>
ul {
  transition: all 0.2s ease-in-out;
}
</style>
