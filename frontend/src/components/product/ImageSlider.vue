<template>
        <Splide :options="sliderOptions" aria-label="Product Images">
            <SplideSlide v-for="n in 4" :key="n" >
                <img src="/images/product.png" alt="Product Image" class="rounded w-full object-cover" />
            </SplideSlide>
        </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';

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


</script>

<style scoped>

</style>