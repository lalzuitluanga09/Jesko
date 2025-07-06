<template>
        <div class="bg-purple-50 dark:bg-gray-900 rounded-lg shadow p-3 border border-gray-300">
            <h2 class="text-base font-semibold mb-3 flex items-center text-purple-800 dark:text-purple-200"><span class="mdi mdi-package-variant-closed text-lg mr-1"></span>Top Selling Products</h2>
            <div class="space-y-4">
                <div
                    v-for="item in items"
                    :key="item.productName"
                    class="flex items-center space-x-3 hover:bg-purple-100 dark:hover:bg-gray-800 px-2"
                >
                    <span class="w-24 text-sm font-medium text-gray-700 dark:text-gray-400 truncate">{{ item.productName }}</span>
                    <div class="flex-1 h-5 bg-purple-200 dark:bg-gray-700 rounded relative">
                        <div
                            class="h-5 bg-purple-400 rounded transition-all duration-300"
                            :style="{ width: `${item.quantitySold * 10}px`, maxWidth: '100%' }"
                        ></div>
                    </div>
                    <span class="w-12 text-xs text-gray-700 dark:text-gray-300 text-right">{{ item.price }}</span>
                    <span class="w-16 text-xs text-gray-700 dark:text-gray-300 text-right">Sold: {{ item.quantitySold }}</span>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
        { productName: 'Product A asdfasf', price: '$120', quantitySold: 10 },
        { productName: 'Product B', price: '$80', quantitySold: 5 },
        { productName: 'Product C', price: '$150', quantitySold: 8 },
        { productName: 'Product D', price: '$100', quantitySold: 12 },
])
</script>

<style scoped>
</style>