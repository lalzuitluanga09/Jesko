<template>
    <div class="px-4 pt-2 pb-4  border border-gray-300 rounded-2xl">
    <p class="text-gray-500 text-xs md:text-sm ml-2 mb-2">Showing 4 of 4 results</p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <ProductCard v-for="n in 16" :key="n" :id="n"/>
    </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '../cards/ProductCard.vue';


</script>

<style scoped>

</style>