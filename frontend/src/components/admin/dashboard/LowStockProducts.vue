<template>
    <div class="bg-rose-50 dark:bg-gray-900 rounded-lg shadow p-3 flex flex-col border border-gray-300 ">
        <h2 class="text-base font-semibold mb-2 flex items-center text-rose-700 dark:text-rose-200"><span class="mdi mdi-alert-circle-outline text-lg mr-1"></span>Low Stock Products</h2>
        <div class="max-h-[12rem] overflow-y-auto flex">
            <table v-if="dashboard.lowStockProducts.length > 0" class="w-full mx-2 divide-y divide-gray-200 dark:divide-gray-500">
                <thead>
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-500">Product</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-500">Stock</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-gray-600 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-500">
                    <tr v-for="product in dashboard.lowStockProducts" :key="product.id" class="hover:bg-rose-100 dark:hover:bg-gray-700">
                        <td class="px-4 py-2">{{ product.name }}</td>
                        <td class="px-4 py-2">{{ product.stock }}</td>
                    </tr>
                </tbody>
            </table>
            <table v-else class="w-full mx-2">
                <tbody>
                    <tr>
                        <td class="px-4 py-6 text-center text-gray-500 dark:text-gray-600">No low stock products.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDashboard } from '@/stores/dashboard';

const dashboard = useDashboard()

</script>