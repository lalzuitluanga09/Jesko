<template>
  <div ref="dropdownRef" class="relative inline-block min-w-42 text-sm text-gray-600 dark:text-gray-200">
    <span v-if="name" class="absolute -top-2 left-2 bg-white px-1 text-gray-400 text-xs dark:bg-gray-800 rounded-xl">{{ title }}</span>
    <button
      class="items-center w-full dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-500"
      @click="isOpen = !isOpen"
    >
      {{ name ? name : title }}
      <span class="float-right">
        <i class="mdi" :class="isOpen?'mdi-chevron-up':'mdi-chevron-down'"></i>
      </span>
    </button>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg overflow-hidden"
    >
      <li
        v-for="(option , idx) in options"
        :key="idx"
        @click="selectItem(option)"
        class="px-4 py-2 hover:bg-sky-100 dark:hover:bg-gray-600 cursor-pointer"
      >
        {{ option.label || option.name }}
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  title: string
  value?: string
  options: any[]
}>()

const name = ref<string>('')

const isOpen = ref(false)

const dropdownRef = ref<HTMLElement | null>(null)

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

const emit = defineEmits<{
    (e: 'select', value: any): void
}>();

const select = (value: any) => {
  emit('select', value);
  isOpen.value = false
}

const selectItem = (item: any) => {
  select(item.value || item.id)
  name.value = item.label || item.name
}

const reset = () => {
  name.value = ''
}

defineExpose({
  reset,
})

</script>


<style scoped>
/* Optional: smooth dropdown */
ul {
  transition: all 0.2s ease-in-out;
}
</style>
