<template>
  <div class="flex flex-col w-full max-w-4xl mx-auto px-2 py-6">
    <h1 class="text-lg md:text-xl font-bold text-center pb-6">Notifications</h1>
    <div class="space-y-2 max-h-[60vh] overflow-y-auto">
      <!-- Notification Item -->
      <div class="border border-gray-200 rounded-lg p-4 hover:bg-amber-50 dark:hover:bg-gray-600 cursor-pointer shadow-sm">
        <h2 class="text-sm font-semibold text-pink-600">Order Update</h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Your order #12345 has been shipped and will arrive soon.
        </p>
        <span class="text-xs text-gray-400">Store: Store Name</span>
      </div>

      <div class="border border-gray-200 rounded-lg p-4 hover:bg-amber-50 dark:hover:bg-gray-600 cursor-pointer shadow-sm">
        <h2 class="text-sm font-semibold text-blue-600">New Follower</h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
          John’s Store has started following you.
        </p>
        <span class="text-xs text-gray-400">Store: Store Name</span>
      </div>

      <div v-for="i in 8" :key="i" class="border border-gray-200 rounded-lg p-4 hover:bg-amber-50 dark:hover:bg-gray-600 cursor-pointer shadow-sm">
        <h2 class="text-sm font-semibold text-green-600">Promotion</h2>
        <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Get 20% off on your next purchase. Use code WELCOME20.
        </p>
        <span class="text-xs text-gray-400">Store: Store Name</span>
      </div>
    </div>

    <!-- Clear All Button -->
    <div class="mt-8 text-center">
      <button class="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

</script>

<style scoped>

</style>