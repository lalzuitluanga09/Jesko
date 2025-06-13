<template>
    <div v-if="loading">
        <DataLoader />
    </div>
    <div v-else>
        <div class="max-w-5xl mx-auto p-2 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 rounded-lg">
            <div class="flex items-center rounded overflow-clip">
                <ImageSlider />
            </div>
            <div class="flex flex-col justify-between">
                <div class="relative">
                    <button
                        class="absolute right-2 md:right-0 cursor-pointer top-3 text-xl text-pink-500 bg-pink-100 hover:bg-pink-200 border border-pink-300 px-1 rounded-lg">
                        <span class="mdi mdi-share-variant"></span>
                    </button>
                    <h1 class="text-xl md:text-3xl font-bold my-2">Product Name</h1>
                    <p class="mb-2 text-sm md:text-base text-pink-600 dark:text-pink-400 truncate cursor-pointer"
                        >
                        Seller: Seller Name
                    </p>
                    <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">Category: Categories</p>
                    <div class="mb-4">
                        <span class="text-2xl font-semibold text-pink-600 dark:text-pink-500">₹99.99</span>
                        <span class="ml-2 text-sm text-gray-400 line-through">₹129.99</span>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 font-medium">Condition</label>
                        <span class="px-3 py-1 border border-gray-400 rounded-xl cursor-default">Used</span>
                    </div>
                    <div class="py-4 flex flex-col border-y border-y-gray-300">
                        <label class="block mb-2 font-medium">Description</label>
                        <div class="flex flex-wrap gap-2">
                            <span class="text-gray-500 text-sm pb-2">
                                Description of the product
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
        <OtherItems title="Similar Items"/>
    </div>
</template>

<script setup lang="ts">
import OtherItems from '@/components/marketplace/OtherItems.vue';
import DataLoader from '@/components/others/DataLoader.vue';
import ImageSlider from '@/components/product/ImageSlider.vue';
import { useMarket } from '@/composables/useMarket';
import { onMounted } from 'vue';

const {
    loading,
} = useMarket()

onMounted(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    loading.value = true
    if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
        loading.value = false
    }, 500)
})

</script>

<style scoped></style>