<template>
  <div class="w-full border border-gray-300 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-700 relative">
    <div class="h-20 sm:h-28 bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
      Map Placeholder or Banner
    </div>

    <div class="absolute top-10 left-4 sm:left-8 z-10">
      <img
        :src="storeData.data?.logo ? storageUrl(storeData.data.logo) : '/images/logo.png'"
        alt="Store Logo"
        class="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
      />
    </div>

    <div class="pl-28 pr-4 sm:pl-40 sm:pr-8 pt-4 pb-4 sm:pb-6 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
      <div class="flex-1 flex flex-col gap-1">
        <h1 class="text-lg sm:text-2xl font-semibold leading-tight line-clamp-2">{{ storeData.data?.name }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-300">{{ storeData.data?.description }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-300">Owner: {{ storeData.owner?.name }}</p>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-4">
        <div class="flex gap-3 sm:gap-6 items-center">
          <span class="flex items-center gap-1 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
            <i class="mdi mdi-account"></i>{{ storeData.data?.followers_count }}
          </span>
          <span class="flex items-center gap-1 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
            <i class="mdi mdi-package-variant-closed"></i>{{ storeData.data?.products_count }}
          </span>
        </div>
        <button class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 border border-gray-400 dark:border-gray-500 px-3 py-1 rounded-full hover:bg-pink-100 hover:text-pink-700 flex items-center gap-1">
          <span>Follow</span>
          <i class="mdi mdi-plus"></i>
        </button>
      </div>

      <div class="flex items-center gap-3 text-xl mt-2 sm:mt-0">
        <span title="Instagram" class="mdi mdi-instagram text-pink-600 hover:text-pink-700 cursor-pointer bg-gray-200 hover:bg-pink-200 px-1 rounded-full"></span>
        <span title="Facebook" class="mdi mdi-facebook text-blue-600 hover:text-blue-700 cursor-pointer bg-gray-200 hover:bg-blue-200 px-1 rounded-full"></span>
        <span title="WhatsApp" class="mdi mdi-whatsapp text-green-600 hover:text-green-700 cursor-pointer bg-gray-200 hover:bg-green-200 px-1 rounded-full"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/useStore';
import { storageUrl } from '@/config';

const {
  storeData
} = useStore()
</script>