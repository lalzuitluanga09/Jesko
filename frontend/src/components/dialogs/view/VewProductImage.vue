<template>
  <Transition name="bounce">
    <div
      v-if="isMagnify"
      class="fixed inset-0 h-screen z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      @click.self="isMagnify = false"
      @keydown.prevent.escape="isMagnify = false"
    >
      <div class="relative border border-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow max-w-[90vw] max-h-[90vh] p-2 cursor-default">
        <div
          class="absolute top-2 right-2 z-10 px-2 py-1 rounded-full cursor-pointer bg-black/60 text-white hover:bg-black"
          @click="isMagnify = false"
        >
          <i class="mdi mdi-close text-lg"></i>
        </div>

        <img
          :src="previewImageUrl"
          alt="Main Image Preview"
          class="max-h-[80vh] max-w-full object-contain rounded-md"
        />
      </div>
    </div>
  </Transition>
</template>


<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';
import { onMounted, onBeforeUnmount } from 'vue'

const {
    isMagnify,
    previewImageUrl
} = useProduct()


const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    isMagnify.value = false
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
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
