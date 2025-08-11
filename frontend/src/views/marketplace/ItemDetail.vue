<template>
    <div v-if="loading">
        <DataLoader />
    </div>
    <div v-else>
        <div class="max-w-5xl mx-auto p-2 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 rounded-lg">
            <div class="flex items-center rounded overflow-clip">
                <MarketplaceImageSlider :images="itemData.images"/>
            </div>
            <div class="flex flex-col justify-between">
                <div class="relative">
                    <button
                        class="absolute right-2 md:right-0 cursor-pointer top-3 text-xl text-pink-500 bg-pink-100 hover:bg-pink-200 border border-pink-300 px-1 rounded-lg">
                        <span class="mdi mdi-share-variant"></span>
                    </button>
                    <h1 class="text-xl md:text-3xl font-bold my-2">{{ itemData.item?.title }}</h1>
                    <p class="mb-2 text-sm md:text-base text-pink-600 dark:text-pink-400 truncate cursor-pointer"
                        >
                        Seller: Seller Name
                    </p>
                    <p v-if="itemData.item?.category_id" class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">Category: 
                        {{ categories.filter(item => item.id == itemData.item?.category_id)[0]?.name }}
                    </p>
                    <div class="mb-4" v-if="itemData.item?.discounted_price">
                        <span class="text-2xl font-semibold text-pink-600 dark:text-pink-500">₹ {{ itemData.item?.discounted_price }}</span>
                        <span class="ml-2 text-sm text-gray-400 line-through">₹{{ itemData.item.price }}</span>
                    </div>
                    <div class="mb-4" v-else>
                        <span class="text-2xl font-semibold text-pink-600 dark:text-pink-500">₹ {{ itemData.item?.price }}</span>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 font-medium">Condition</label>
                        <span class="px-3 py-1 border border-gray-400 rounded-xl cursor-default">{{ itemData.item?.condition }}</span>
                    </div>
                    <div class="py-4 flex flex-col border-y border-y-gray-300" v-if="itemData.item?.description">
                        <label class="block mb-2 font-medium">Description</label>
                        <div class="flex flex-wrap gap-2">
                            <span class="text-gray-500 text-sm pb-2">
                                {{ itemData.item?.description }}
                            </span>
                        </div>
                    </div>
                    <div class="mb-16 md:pt-4 flex gap-4 md:static fixed left-0 right-0 bottom-0 bg-white dark:bg-gray-700 p-4 md:p-0 z-10 shadow md:shadow-none rounded-t-xl md:rounded-none">
                        <button
                            class="w-full md:w-fit bg-green-600 text-white px-8 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition cursor-pointer flex items-center justify-center gap-2">
                            <span class="mdi mdi-whatsapp text-2xl"></span>
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <OtherItems v-if="itemData.related_items.length > 0" title="Similar Items" :items="itemData.related_items"/>
    </div>
    <ViewMarketplaceImage />
</template>

<script setup lang="ts">
import ViewMarketplaceImage from '@/components/dialogs/marketplace/ViewMarketplaceImage.vue';
import MarketplaceImageSlider from '@/components/marketplace/MarketplaceImageSlider.vue';
import OtherItems from '@/components/marketplace/OtherItems.vue';
import DataLoader from '@/components/others/DataLoader.vue';
import { useMarket } from '@/composables/useMarket';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const {
    loading,
    categories,
    itemData,
    fetchItem,
} = useMarket()

onMounted(async() => {
    if(!itemData.value.item) {
        await fetchItem(Number(route.params.id))
    }
})
</script>

<style scoped></style>