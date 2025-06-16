<template>
  <div class="max-w-2xl mx-auto px-2 py-6">
    <h1 class="text-lg md:text-2xl font-bold text-center mb-6">My Addresses</h1>

    <div class="flex items-center justify-between mb-4 p-4 border border-pink-500 rounded-xl bg-pink-50 dark:bg-gray-600">
        <div class="flex flex-col text-sm md:text-base">
            <h2 class="font-semibold text-pink-700 dark:text-pink-500 mb-1">Home (Default)</h2>
            <p class="text-gray-700 dark:text-gray-300 line-clamp-2">123 Main Street, Darchawii, Tripura - 799289</p>
            <p class="text-gray-500 dark:text-gray-400">Phone: +91 9876543210</p>
             <!-- <button class="w-max inline-block px-4 py-1 text-pink-700 dark:text-pink-500 bg-pink-200 rounded-2xl mt-2 cursor-pointer">
                Set as default
            </button> -->
        </div>
        <button class="px-2 py-1 bg-pink-200 dark:bg-pink-500 rounded-2xl cursor-pointer">
            <span class="mdi mdi-pencil"></span>
        </button>
    </div>


    <div class="flex items-center justify-between mb-4 p-4 border border-gray-500 rounded-xl">
        <div class="flex flex-col text-sm md:text-base">
            <h2 class="font-semibold mb-1">Work</h2>
            <p class="text-gray-700 dark:text-gray-300 line-clamp-2">123 Main Street, Darchawii, Tripura - 799289</p>
            <p class="text-gray-500 dark:text-gray-400">Phone: +91 9876543210</p>
             <button class="w-max inline-block px-4 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-400 rounded-2xl mt-2 cursor-pointer">
                Set as default
            </button>
        </div>
        <button class="px-2 py-1 bg-pink-200 dark:bg-pink-500 rounded-2xl cursor-pointer">
            <span class="mdi mdi-pencil"></span>
        </button>
    </div>

    <!-- Add Address Button -->
    <div class="text-center">
      <button @click="openDialog"
        class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md shadow-md transition"
      >
        + Add New Address
      </button>
    </div>
  </div>
  <AddAddressDialog />
</template>


<script setup lang="ts">
import AddAddressDialog from '@/components/dialogs/AddAddressDialog.vue';
import { useAddress } from '@/composables/useAddress';

const { openDialog } = useAddress()

</script>

<style scoped>

</style>