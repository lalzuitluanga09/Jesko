<template>
  <div class="w-full border border-gray-300 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-600 relative">
    <div class="h-24 sm:h-32 bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-white text-shadow-2xs text-lg font-semibold">
      Map Placeholder
    </div>
    <div class="absolute top-8 right-4 sm:right-8 z-10">
      <img
        src="/images/logo.png"
        alt="Store Logo"
        class="w-28 h-28 sm:w-38 sm:h-38 rounded-full border-4 border-white shadow-md object-cover"
      />
    </div>
    <div class="px-4 pt-2 pb-4 sm:pt-4 sm:pb-6 sm:px-8 flex flex-row justify-between gap-6">
        <div class="flex flex-row items-center gap-12 sm:gap-24">
            <div class="flex flex-col max-w-1/2">
                <h1 class="text-lg sm:text-2xl font-semibold line-clamp-2 leading-tight">{{ storeData.data?.name }}</h1>
                <p class="text-sm md:text-base text-gray-500 dark:text-gray-400">Location</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Owner: {{ storeData.owner?.name }}</p>
            </div>
            <div class="flex items-center text-center my-auto">
                <div class="flex flex-col md:flex-row gap-1 md:gap-4">
                    <h2 class="font-bold">
                        <span class="mdi mdi-account">{{ storeData.data?.followers_count }}</span>
                    </h2>
                    <h2 class="font-bold">
                        <span class="mdi mdi-package-variant-closed">{{ storeData.data?.products_count }}</span>
                    </h2>
                    <!-- <p class="text-xs text-gray-500 dark:text-gray-400">Followers</p> -->
                    <button class="text-xs md:text-sm text-gray-500 dark:text-gray-400 border px-2 py-0.5 rounded-xl cursor-pointer hover:bg-pink-100 hover:text-pink-700">
                        <span >Follow</span>
                        <span class="mdi mdi-plus"></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-end gap-2 md:gap-4 text-xl mr-2 sm:mr-4">
            <span class="mdi mdi-instagram text-pink-600 hover:text-pink-700 cursor-pointer bg-gray-200 hover:bg-pink-200 px-1 rounded-full"></span>
            <span class="mdi mdi-facebook text-blue-700 hover:text-blue-800 cursor-pointer bg-gray-200 hover:bg-blue-200 px-1 rounded-full"></span>
            <span class="mdi mdi-whatsapp text-green-600 hover:text-green-700 cursor-pointer bg-gray-200 hover:bg-green-200 px-1 rounded-full"></span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/useStore';

const {
  storeData
} = useStore()
</script>