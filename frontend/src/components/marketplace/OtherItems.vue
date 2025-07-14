<template>
    <div class="max-w-5xl mx-2 md:mx-auto mt-8 pt-6 border-t border-t-gray-300">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MarketProductCard v-for="item in items":key="item.id" :item="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MarketplaceItem } from '@/types/marketplace_product';
import MarketProductCard from './MarketProductCard.vue';

const props = defineProps<{
  title: string,
  items: MarketplaceItem []
}>();

</script>

<style scoped>

</style>