<template>
    <div class="flex flex-col gap-4 w-full px-2 py-6">
        <h1 class="text-lg md:text-2xl font-bold text-center">My wishlists</h1>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">Total Items: {{ wishlist.wishlist.length }}</p>
            <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 md:mx-0">
                <ProductCard v-for="item in wishlist.wishlist" :key="item.id" :item="item" :slug="item.store_slug" :theme="item.theme"/>
            </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue';
import { useWishlist } from '@/stores/wishlist';
import { onMounted } from 'vue';

const wishlist = useWishlist()

onMounted(async() => {
    await wishlist.getWishlist()
})

</script>

<style scoped>

</style>