<template>
    <div class="flex flex-col w-full max-w-6xl mx-auto py-4 md:py-8">
        <div class="w-full flex items-center justify-between ml-2 mb-4 md:mb-6">
            <h1 class="text-md md:text-lg lg:text-xl font-bold">{{ selectedCategory==''?"All Stores":selectedCategory }}</h1>
             <SelectBtn class="mr-4"/>
        </div>
        <Loading v-if="loading" class="mt-10"/>
        <div v-else class="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mx-2 md:mx-0">
            <StoreCard v-for="(item, index) in storeItems" :key="index"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import StoreCard from './cards/StoreCard.vue';
import { useStore } from '@/composables/useStore';
import Loading from './others/Loading.vue';
import SelectBtn from './buttons/SelectBtn.vue';

const { 
    selectedCategory,
    storeItems,
    loading,
} = useStore()



</script>

<style scoped>

</style>