<template>
    <div
        @click="gotTo"
        class="w-full max-w-sm rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-amber-50 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1  transition mx-auto">
        <div class="mx-1 mt-1 md:mx-2 md:mt-2">
            <img class="w-full lg:h-48 md:h-40 h-32 object-cover rounded-t-xl md:rounded-t-2xl" src="/images/logo.png"
            alt="Store Image" />
        </div>
        <div class="px-3 md:px-4 pb-2 md:pb-3 pt-2 ">
            <div class="font-medium text-base md:text-lg mb-1 line-clamp-2">
                Store Name 
            </div>
            <p class="text-gray-500 dark:text-white/50 text-sm line-clamp-2" v-if="!isMobile">
                Store description goes here in short.
            </p>
        </div>
        <div class="px-3 md:px-4 md:pt-2 mb-2 md:pb-4  flex justify-between items-center">
            <div class="flex items-center gap-1 text-xs md:text-sm">
                <i class="mdi mdi-account text-xs md:text-base" />
                <span>123</span>
                <i class="mdi mdi-star-four-points text-xs md:text-base md:ml-1" />
                <span>4.5</span>
            </div>
            <button v-if="isAuthenticated"
                class="bg-amber-100 px-2 md:px-3 py-1 md:py-1.5 ml-2 rounded-full hover:bg-amber-200 transition-colors duration-200 flex items-center gap-1 text-xs md:text-sm">
                Follow <i class="mdi mdi-plus text-xs md:text-sm" />
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useSetting } from '@/composables/useSetting';
import { useAuth } from '@/composables/useAuth';
import router from '@/router';

const  { isMobile } = useSetting()
const { isAuthenticated } = useAuth()

const gotTo = () => {
    router.push({
        name: 'store',
        params: {
            slug: 'store-slug-1',
        }
    })
}

</script>