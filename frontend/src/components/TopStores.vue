<template>
    <div class="mt-10 rounded-2xl md:rounded-3xl relative bg-bg-soft dark:bg-bg-soft-dark shadow">
        <h2 class="absolute -top-5 left-5 px-3 py-0.5 rounded-xl md:rounded-3xl bg-bg-soft shadow text-gray-700 text-md lg:text-lg font-extrabold">
            Top Stores
        </h2>
        <div class="lg:mx-8 lg:mt-10 md:mx-4 mx-2 pt-10">
            <Splide :options="bannerOptions" aria-label="Top Stores">
              <div v-if="loadTopStore" class="flex w-full items-center justify-center min-h-42">
                <Loading />
              </div>
                <SplideSlide v-for="(item, idx) in topStores" :key="idx" class="px-2" v-else>
                    <div class="pb-10">
                        <StoreCard :store="item"/>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StoreCard from './cards/StoreCard.vue';
import { useStore } from '@/composables/useStore';

import { Splide, SplideSlide } from '@splidejs/vue-splide';
import Loading from './others/Loading.vue';

const bannerOptions = ref({ 
    type: 'slide',
    arrows: false, 
    perPage: 5,
    perMove: 1,
    rewind: true,
    rewindByDrag: true,
    autoplay: true,
    interval: 3000,
    pause: false,
    speed: 400,
});

const {
  loadTopStore,
  topStores,
} = useStore()

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