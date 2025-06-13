<template>
    <div class="mt-10 rounded-2xl md:rounded-4xl relative bg-gray-100 dark:bg-gray-500">
        <h1 class="absolute -top-5 left-5 px-2 md:px-4 py-0.5 md:py-1 rounded-lg md:rounded-3xl bg-gray-100 shadow text-gray-700 text-base lg:text-xl font-extrabold">
            Puiipuii Gooods 
        </h1>
        <h1 class="absolute -top-4 right-5 md:right-10 px-2 md:px-4 py-0.5 md:py-1 rounded-lg md:rounded-3xl bg-gray-100 shadow text-gray-700 text-sm lg:text-lg font-medium">
            Chapcharkut Sale!!!
        </h1>
        <div class="lg:mx-8 lg:mt-10 md:mx-4 mx-2 pt-10">
            <Splide :options="bannerOptions" aria-label="Top Products">
                <SplideSlide v-for="n in 8" :key="n" class="px-1">
                    <div class="pb-10">
                        <ProductCard/>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
        <div class="flex justify-center py-4 md:py-6" v-if="!isMobile">
            <button class="px-2 py-1 md:px-4 md:py-2 bg-yellow-100 dark:bg-gray-600 rounded-2xl shadow text-sm md:text-md hover:bg-amber-200 dark:hover:bg-gray-700 showdow cursor-pointer">
                Visit Store <i class="mdi mdi-arrow-right"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from './cards/ProductCard.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { useSetting } from '@/composables/useSetting';
import { useSlider } from '@/composables/useSlider';

const { 
    isMobile,
} = useSetting()

const { bannerOptions } = useSlider()

</script>

<style scoped>

</style>