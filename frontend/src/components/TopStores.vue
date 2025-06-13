<template>
    <div class="mt-10 rounded-2xl md:rounded-4xl relative bg-gray-100 dark:bg-gray-500 shadow">
        <h1 class="absolute -top-5 left-5 px-2 py-0.5 md:px-4 md:py-1   rounded-xl md:rounded-3xl bg-gray-100 shadow text-gray-700 text-base lg:text-xl font-extrabold">
            Top Stores
        </h1>
        <div class="lg:mx-8 lg:mt-10 md:mx-4 mx-2 pt-10">
            <Splide :options="bannerOptions" aria-label="Top Stores">
                <SplideSlide v-for="n in 8" :key="n" class="px-2">
                    <div class="pb-10">
                        <StoreCard />
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StoreCard from './cards/StoreCard.vue';

import { Splide, SplideSlide } from '@splidejs/vue-splide';

const bannerOptions = ref({ 
    type: 'slide',
    arrows: false, 
    perPage: 4,
    perMove: 1,
    rewind: true,
    rewindByDrag: true,
    autoplay: true,
    interval: 3000,
    pause: false,
    speed: 400,
});

const isMobile = ref(false);

const checkScreenWidth = () => {
  if (window.innerWidth <= 480) {
    bannerOptions.value.perPage = 2;
  } 
  else if (window.innerWidth <= 1024) {
    bannerOptions.value.perPage = 3;
  }
  else {
    bannerOptions.value.perPage = 4;
  }
};

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);


</script>