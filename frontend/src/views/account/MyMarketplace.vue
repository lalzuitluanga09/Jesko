<template>
    <div class="flex flex-col p-2 md:p-4 cursor-default">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-lg md:text-2xl font-bold">My Listing</h1>
            <button @click="openDialog" class="text-white bg-pink-500 dark:bg-pink-600 hover:bg-pink-600 hover:dark:bg-pink-500 px-4 py-1 rounded-md shadow text-sm md:text-lg cursor-pointer"><span class="mdi mdi-plus mr-0.5"></span>Create</button>
        </div>
        <div class="flex mb-2">
            <p class="text-xs md:text-sm">Showing 4 items</p>
        </div>
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">

            <div v-for="item in userItems" :key="item.id" @click="openEdit(item.id)"
                class="w-full max-w-sm overflow-hidden rounded bg-white/70 dark:bg-gray-600 cursor-pointer hover:bg-amber-50 dark:hover:bg-gray-500 border border-gray-300 hover:shadow-md transition">
                <img class="w-full lg:h-48 md:h-40 h-36 object-cover rounded" :src="item.image_url ? storageUrl(item.image_url) : '/images/product.png'" alt="Item Image">
                <div class="px-3 md:px-4 py-2 space-y-1 flex flex-col items-center justify-center">
                    <h1 class="text-sm md:text-base truncate text-gray-700 dark:text-gray-300">{{ item.title }}</h1>
                    <p class="font-medium text-base md:text-lg ">₹ {{ item.price }}</p>
                </div>
            </div>
        </div>
    </div>
    <AddItemDialog />
</template>

<script setup lang="ts">
import AddItemDialog from '@/components/dialogs/marketplace/AddItemDialog.vue';
import { useMarket } from '@/composables/useMarket';
import { storageUrl } from '@/config';
import { onMounted } from 'vue';


const {
    userItems,
    openDialog,
    getUserItems,
    openEdit
} = useMarket()

onMounted(() => {
    getUserItems()
})


</script>