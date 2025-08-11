<template>
    <div class="relative">
        <Splide :options="sliderOptions" aria-label="Product Images">
            <SplideSlide v-if="images.length === 0" class="cursor-grab">
                <img src="/images/product.png" alt="Product Image" class="rounded w-full object-cover" />
            </SplideSlide>
            <SplideSlide v-else v-for="(image, idx) in images" :key="idx" class="cursor-grab">
                <img :src="storageUrl(image.image_url)" alt="Item Image" class="rounded w-full object-cover" />
            </SplideSlide>
        </Splide>
        <div v-if="images.length !== 0"
            class="absolute bottom-2 right-2 z-10 px-2 py-1 rounded-full cursor-pointer bg-black/40 text-white hover:bg-black/60"
            @click="viewImages()">
            <i class="mdi mdi-fullscreen text-lg"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storageUrl } from '@/config'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { type ItemImage } from '@/types/marketplace_product'
import { useMarket } from '@/composables/useMarket';

const sliderOptions = {
    type: 'slide',
    arrows: false,
    perPage: 1,
    rewind: true,
    autoplay: true,
    pause: false,
    interval: 3000,
    speed: 400
}

const {
    viewImages,
} = useMarket()

const props = defineProps<{
    images: ItemImage[]
}>();
</script>

<style scoped></style>