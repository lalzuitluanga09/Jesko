<template>
    <div class="flex flex-col w-full max-w-6xl mx-auto py-4 md:py-8">
        <div class="w-1/4 flex flex-col items-start pr-8 mb-4 md:mb-6 ml-2 md:ml-0">
            <h1 class="text-md md:text-lg lg:text-xl font-bold">Categories</h1>
        </div>
        <div class="flex-1 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 mx-auto">
            <StoreCategoryCard title="Fashion"/>
            <StoreCategoryCard title="Electronics"/>
            <StoreCategoryCard title="Toys"/>
            <StoreCategoryCard title="Cosmetics"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import StoreCategoryCard from './cards/StoreCategoryCard.vue';

</script>

<style scoped>

</style>