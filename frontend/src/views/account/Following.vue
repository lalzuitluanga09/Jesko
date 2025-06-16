<template>
    <div class="flex flex-col gap-4 w-full px-2 py-6">
        <h1 class="text-lg md:text-2xl font-bold text-center">My Following</h1>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">Total Stores: 8</p>
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 md:mx-0">
            <StoreCard v-for="i in 8" :key="i" />
        </div>
    </div>
</template>


<script setup lang="ts">
import StoreCard from '@/components/cards/StoreCard.vue';


</script>

<style scoped>

</style>