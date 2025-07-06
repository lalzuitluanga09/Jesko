<template>
  <div>
    <div v-if="isDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10"></div>
    <Transition name="slide">
      <div
        v-if="isDialogOpen"
        class="fixed inset-0 flex items-center justify-end z-20"
        @click.self="closeAddDialog"
      >
        <div class="bg-white dark:bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-xl mx-2">
          <h1 class="text-lg md:text-xl font-semibold mb-6">Add Tag</h1>
          <input
            ref="inputRef"
            type="text"
            v-model="inputData"
            placeholder="Category Name"
            class="w-full p-2 border border-gray-300 rounded mb-4 text-sm md:text-bases"
            @keydown.enter.prevent="() => (editId === 0 ? save() : update())"
          />
          <div class="flex gap-2 text-sm md:text-base">
            <button
              v-if="editId === 0"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors"
              @click="save"
            >
              Save
            </button>
            <button
              v-else
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors"
              @click="update"
            >
              Update
            </button>
            <button
              class="border border-gray-400 text-gray-500 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
              @click="closeAddDialog"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useTag } from '@/composables/useTag'
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
const { isDialogOpen, inputData, editId, save, update, closeAddDialog } = useTag()

const inputRef = ref<HTMLInputElement | null>(null)

watch(isDialogOpen, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})

const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    isDialogOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in-right 0.4s ease-out forwards;
}
.slide-leave-active {
  animation: slide-out-right 0.3s ease-in forwards;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
