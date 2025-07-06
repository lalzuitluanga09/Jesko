<template>
    <div class="flex flex-col justify-between">
        <div class="relative">
            <button
                class="absolute right-12 md:right-10 cursor-pointer top-3 text-xl text-pink-500 bg-pink-100 hover:bg-pink-200 border border-pink-300 px-1 rounded-lg">
                <span class="mdi mdi-heart"></span>
            </button>
            <button
                class="absolute right-2 md:right-0 cursor-pointer top-3 text-xl text-pink-500 bg-pink-100 hover:bg-pink-200 border border-pink-300 px-1 rounded-lg">
                <span class="mdi mdi-share-variant"></span>
            </button>
            <h1 class="text-xl md:text-3xl font-bold my-2">Product Name</h1>
            <p class="mb-2 text-sm md:text-base text-pink-600 dark:text-pink-400 truncate cursor-pointer" @click="goToStore">
                Seller: Store Name
            </p>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4">Category: Categories</p>
            <div class="mb-4">
                <span class="text-2xl font-semibold text-pink-600 dark:text-pink-500">₹99.99</span>
                <span class="ml-2 text-sm text-gray-400 line-through">₹129.99</span>
            </div>
            <div class="mb-4">
                <label class="block mb-2 font-medium">Size</label>
                <div class="flex flex-wrap gap-2">
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">S</span>
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">L</span>
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">Xl</span>
                </div>
            </div>
            <div class="mb-4">
                <label class="block mb-2 font-medium">Color</label>
                <div class="flex flex-wrap gap-2">
                    <span
                        class="p-3 border border-gray-400 rounded-full bg-red-500 hover:bg-red-700 cursor-pointer"></span>
                    <span
                        class="p-3 border border-gray-400 rounded-full bg-blue-500 hover:bg-blue-700 cursor-pointer"></span>
                    <span
                        class="p-3 border border-gray-400 rounded-full bg-green-500 hover:bg-green-700 cursor-pointer"></span>
                </div>
            </div>
            <div class="mb-4">
                <label class="block mb-2 font-medium">Variant</label>
                <div class="flex flex-wrap gap-2">
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">variant
                        #1</span>
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">variant
                        #2</span>
                    <span
                        class="px-3 py-1 border border-gray-400 rounded-xl hover:bg-amber-50 dark:hover:bg-gray-500 cursor-pointer">variant
                        #3</span>
                </div>
            </div>
            <div
                class="mb-4 md:mb-0 flex flex-col md:flex-row md:justify-between md:items-center gap-4 fixed md:static left-0 right-0 z-20 bottom-0 bg-white/50 backdrop-blur-md dark:bg-gray-700/50 px-4 py-2 md:px-2 border-t border-t-gray-300 md:border-0 shadow md:shadow-none">
                <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-2 w-full md:w-auto">
                    <div class="flex flex-col w-full md:w-auto">
                        <label class="block mb-2 font-medium">Quantity</label>
                        <div class="flex items-center rounded w-fit">
                            <button
                                class="text-lg border border-gray-400 rounded-lg text-gray-500 cursor-pointer hover:bg-pink-100 hover:text-pink-600 px-3"
                                @click="quantity > 1 && quantity--" type="button">-</button>
                            <input disabled v-model.number="quantity" class="w-8 md:w-12 text-center bg-transparent" />
                            <button
                                class="text-lg border border-gray-400 rounded-lg text-gray-500 cursor-pointer hover:bg-pink-100 hover:text-pink-600 px-3"
                                @click="quantity++" type="button">+</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-4 mb-12 md:mb-0">
                    <button
                        class="w-full md:w-auto px-5 py-2 border border-gray-500 rounded-xl font-semibold shadow hover:text-white hover:bg-pink-600 transition-colors flex items-center justify-center gap-3 cursor-pointer">
                        <span class="mdi mdi-shopping-outline"></span>
                        Add to Cart
                    </button>
                    <button
                        class="w-full md:w-auto bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-700 transition-colors flex items-center justify-center gap-3 cursor-pointer">
                        <span class="mdi mdi-cart-arrow-right"></span>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';


const quantity = ref<number>(1)

const goToStore = () => {
    router.push({
        name: 'store',
        params: {
            slug: 'store-slug-1',
        }
    })
}

</script>

<style scoped>

</style>