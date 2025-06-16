<template>
    <LoginMessage title="Your Favourite items show here" v-if="!isAuthenticated"/>
    <div v-else class="flex flex-col gap-4 w-full px-2 py-6">
        <h1 class="text-lg md:text-2xl font-bold text-center">My Favourites</h1>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">Total Stores: 8</p>
            <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 md:mx-0">
                <ProductCard v-for="i in 8" :key="i"/>
            </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue';
import LoginMessage from '@/components/LoginMessage.vue';
import { useAuth } from '@/composables/useAuth';

const { isAuthenticated } = useAuth()


</script>

<style scoped>

</style>