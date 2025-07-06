<template>
    <div class="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-600 cursor-pointer hover:bg-amber-50 dark:hover:bg-gray-500 border border-gray-300  transition">
        <div class="absolute top-2 right-2 bg-amber-50 hover:bg-amber-100 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full px-1 md:px-2 md:py-1 z-10 cursor-pointer">
            <span class="mdi mdi-heart-outline text-base md:text-xl text-amber-500 dark:text-gray-300"></span>
            <!-- <span class="mdi mdi-heart text-base md:text-xl text-amber-500 dark:text-gray-300"></span> -->
        </div>
        <img @click="gotTo"
        class="w-full lg:h-48 md:h-40 h-36 object-cover rounded-t-xl" src="/images/image.png" alt="Store Image">
        <div class="px-3 md:px-4 pt-2 pb-1" @click="gotTo">
            <div class="text-base font-medium mb-1 truncate">Product Name</div>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
               Category name
            </p>
        </div>
        <div class="px-4 pb-2 md:pb-3 flex justify-between items-center">
            <p class="font-medium text-base md:text-lg"  @click="gotTo">₹ 999</p>
            <button class="cursor-pointer bg-amber-100 dark:bg-gray-500 px-2 py-1 md:px-4 md:py-2 rounded-full hover:bg-amber-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 shadow-sm">
                <i class="mdi mdi-shopping-outline text-md md:text-xl"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

const props = withDefaults(defineProps<{
    id?: string | number,
}>(), {
    id: 1
});


const gotTo = () => {
    router.push({
        name: 'product-detail',
        params: {
            storeslug: 'example-slug',
            id: props.id
        }
    })
}
</script>