<template>
    <div @click="gotTo" 
        class="w-full max-w-sm overflow-hidden rounded bg-white/70 dark:bg-gray-600 cursor-pointer hover:bg-amber-50 dark:hover:bg-gray-500 border border-gray-300 hover:shadow-md hover:-translate-y-1  transition">
        <img class="w-full lg:h-48 md:h-40 h-36 object-cover rounded" src="/images/product.png" alt="Store Image">
        <div class="px-3 md:px-4 py-1 md:py-2">
            <div class="text-base md:text-lg mb-1 line-clamp-2">Item Name</div>
            <p class="font-medium text-md md:text-xl ">₹999</p>
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
        name: 'item-detail',
        params: {
            id: props.id
        }
    })
}

</script>