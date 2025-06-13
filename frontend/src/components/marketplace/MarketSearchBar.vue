<template>
    <div class="w-full flex items-center justify-center py-4 mx-2 md:mx-0">
        <div class="relative w-full">
            <input
                type="text"
                v-model="searchTerm"
                placeholder="Search item..."
                class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-sm transition"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i class="mdi mdi-magnify text-2xl"></i>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMarket } from '@/composables/useMarket';

const { searchTerm } = useMarket()

</script>

<style scoped>
</style>