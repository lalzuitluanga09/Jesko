<template>
    <div @click="gotTo" 
        class="w-full max-w-sm overflow-hidden rounded bg-white/70 dark:bg-gray-600 cursor-pointer hover:bg-amber-50 dark:hover:bg-gray-500 border border-gray-300 hover:shadow-md transition">
        <img class="w-full lg:h-48 md:h-40 h-36 object-cover rounded" :src="item.image_url ? storageUrl(item.image_url) : '/images/product.png'" alt="Item Image">
        <div class="px-3 md:px-4 py-2 space-y-1 flex flex-col justify-center items-center">
            <h1 class="text-sm md:text-base truncate text-gray-700 dark:text-gray-300">{{ item.title }}</h1>
            <p class="font-medium text-base md:text-lg ">₹ {{ toNumber(item.price) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storageUrl } from '@/config';
import router from '@/router';
import { type MarketplaceItem } from '@/types/marketplace_product'
import { toNumber } from 'lodash-es';
import { useMarket } from '@/composables/useMarket';


const props = defineProps<{
    item: MarketplaceItem
}>();

const {
    fetchItem
} = useMarket()

const gotTo = async () => {
    await fetchItem(props.item.id)
    router.push({
        name: 'item-detail',
        params: {
            id: props.item.id
        }
    })
}

</script>