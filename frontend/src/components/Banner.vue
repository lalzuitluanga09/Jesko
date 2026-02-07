<template>
    <div class="rounded-2xl md:rounded-3xl overflow-hidden md:mt-6">
        <Splide :options="bannerOptions" aria-label="My Favorite Images">
            <SplideSlide
                v-for="(color, idx) in ['#FFCDD2', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#F8BBD0']"
                :key="color"
            >
                <div
                    class="w-full h-[200px] md:h-[300px] lg:h-[400px] p-4"
                    :style="{ backgroundColor: color }"
                ></div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const bannerOptions = {
    type: 'fade',
    arrows: false, 
    // perPage: 1,
    rewind: true,
    autoplay: true,
    pause: false,
    interval: 3000,
    speed: 400
 }


</script>

<style scoped>

</style>