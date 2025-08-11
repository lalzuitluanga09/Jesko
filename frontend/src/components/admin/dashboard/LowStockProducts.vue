<template>
    <div class="bg-rose-50 dark:bg-gray-900 rounded-lg shadow p-3 flex flex-col border border-gray-300 ">
        <h2 class="text-base font-semibold mb-2 flex items-center text-rose-700 dark:text-rose-200"><span class="mdi mdi-alert-circle-outline text-lg mr-1"></span>Low Stock Products</h2>
        <div class="max-h-[12rem] overflow-y-auto flex">
            <table v-if="products.length" class="w-full mx-2 divide-y divide-gray-200 dark:divide-gray-500">
                <thead>
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-500">Product</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-500">Stock</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-gray-600 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-500">
                    <tr v-for="product in products" :key="product.id" class="hover:bg-rose-100 dark:hover:bg-gray-700">
                        <td class="px-4 py-2">{{ product.name }}</td>
                        <td class="px-4 py-2">{{ product.stock }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="text-gray-500 text-center">No low stock products.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
    id: number
    name: string
    stock: number
}

// Example data, replace with real API call as needed
const products = ref<Product[]>([
    { id: 1, name: 'Product A', stock: 3 },
    { id: 2, name: 'Product B', stock: 2 },
    { id: 3, name: 'Product C', stock: 1 },
    { id: 4, name: 'Product D', stock: 1 },
])
</script>

<script setup lang="ts">

</script>

<style scoped>

</style>