<template>
    <div class="flex flex-col justify-center items-center gap-5">
        <h1 class="text-xl font-bold">My Orders</h1>

        <div class="w-full mb-6 flex flex-col sm:flex-row gap-2 items-center justify-center">

            <div class="relative w-full sm:w-1/2">
                <input type="search"
                    v-model="search"
                    class="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                    placeholder="Search by Product name or Order ID" />
                <button type="submit"
                    class="absolute top-0 end-0 p-2.5 text-sm flex items-center font-medium h-full text-gray-500 rounded-e-lg border border-gray-400 dark:border-gray-500 hover:bg-pink-100 dark:hover:bg-gray-600">
                    <span class="mdi mdi-magnify text-2xl"></span>
                </button>
            </div>


            <div class="flex gap-2 text-sm text-gray-700 dark:text-gray-300 mt-2 md:mt-0">
                <button
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-400 rounded-xl hover:bg-pink-100 dark:hover:bg-gray-700 cursor-pointer">
                    All
                </button>
                <button
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-400 rounded-xl hover:bg-pink-100 dark:hover:bg-gray-700 cursor-pointer">
                    In Progress
                </button>
                <button
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-400 rounded-xl hover:bg-pink-100 dark:hover:bg-gray-700 cursor-pointer">
                    Delivered
                </button>
                <button
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-400 rounded-xl hover:bg-pink-100 dark:hover:bg-gray-700 cursor-pointer">
                    Cancelled
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';

const {
    search,
    status
} = useOrder()

</script>

<style scoped></style>