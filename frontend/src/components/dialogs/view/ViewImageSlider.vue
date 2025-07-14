<template>
  <Transition name="bounce">
    <div
      v-show="isMagnifyImages"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      @click.self="close"
      @keydown.esc="close"
    >
      <div v-if="viewImages.length > 0"
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-7xl w-full max-h-[95vh] overflow-hidden flex items-center justify-center"
      >
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
          aria-label="Close"
        >
          <i class="mdi mdi-close text-xl"></i>
        </button>

        <!-- Image Carousel -->
        <Splide
          :options="sliderOptions"
          aria-label="Product Images"
          class="w-full h-full px-6 py-4 overflow-hidden"
        >
          <SplideSlide v-if="viewImages.length === 0">
            <img
              src="/images/product.png"
              alt="Product Image"
              class="mx-auto object-contain max-h-[90vh] w-auto"
            />
          </SplideSlide>
          <SplideSlide v-else v-for="image in viewImages" :key="image.id">
            <img
              :src="image.image_path ? storageUrl(image.image_path) : '/images/product.png'"
              alt="Product Image"
              class="mx-auto object-contain max-h-[90vh] w-auto"
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </Transition>
</template>



<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { onMounted, onBeforeUnmount } from 'vue'
import { storageUrl } from '@/config';

const {
    isMagnifyImages,
    viewImages
} = useProduct()

const sliderOptions = {
    type: 'slide',
    arrows: true, 
    perPage: 1,
    rewind: true,
 }


const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    isMagnifyImages.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const close = () => {
    viewImages.value = []
    isMagnifyImages.value = false
}
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
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
