<template>
    <div class="flex flex-col w-full max-w-6xl mx-auto py-4 md:py-8">
        <div class="w-1/4 flex items-start pr-8 mb-4 ml-2 md:ml-0">
            <h1 class="text-md md:text-lg lg:text-xl font-bold">Categories</h1>
        </div>
        <div class="flex-1">
            <Splide :options="sliderOptions" aria-label="Product Images">
                <SplideSlide v-for="item in meta.storeCategories" :key="item.id" >
                    <StoreCategoryCard :item="item"/>
                </SplideSlide>
            </Splide>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMeta } from '@/stores/meta';
import StoreCategoryCard from './cards/StoreCategoryCard.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const meta = useMeta()

const sliderOptions = {
    arrows: false,
    rewind: false,
    rewindByDrag: false,
    autoWidth: true,
    autoHeight: true,
    pagination: false,
    //isNavigation: true,
 }

</script>

<style scoped>

</style>