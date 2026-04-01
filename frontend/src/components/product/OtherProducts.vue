<template>
    <div class="max-w-5xl mx-2 md:mx-auto mt-12">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard v-for="item in products" :key="item.id" :slug="item.store_slug" :item="item" :theme="theme"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product';
import ProductCard from '../cards/ProductCard.vue';

defineProps<{
  title: string,
  products: Product [],
  theme?: string
}>();

</script>

<style scoped>

</style>