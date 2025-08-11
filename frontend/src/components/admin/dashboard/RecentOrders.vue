<template>
    <div class="bg-teal-50 dark:bg-gray-900 border border-gray-300 rounded-xl px-4 pt-2 pb-4 ">
        <h3 class="text-lg font-semibold mb-2 text-teal-700 dark:text-teal-200"><span class="mdi mdi-list-box-outline mr-1"></span>Recent Orders</h3>
        <div class="max-h-[12rem] overflow-y-auto rounded-lg">
            <table class="bg-white dark:bg-gray-900 min-w-full text-sm border border-gray-300">
                <thead>
                    <tr class="bg-teal-100 dark:bg-gray-800">
                        <th v-for="header in headers" :key="header" class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-500">
                            {{ header }}
                        </th>
                        <th class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-500">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in items" :key="idx" class="text-gray-600 border-b dark:text-gray-400 border-b-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700">
                        <td v-for="key in itemKeys" :key="key" class="px-4 py-2">
                            {{ item[key] }}
                        </td>
                        <td class="px-4 py-2">
                            <span
                                :class="{
                                    'text-yellow-600': item.status === 'Pending',
                                    'text-green-600': item.status === 'Completed' || item.status === 'Delivered',
                                }"
                                class="font-medium"
                            >
                                {{ item['status'] }}
                            </span>
                        </td>
                    </tr>
                    <tr v-if="items.length === 0">
                        <td :colspan="headers.length" class="px-4 py-2 text-center text-gray-400 dark:text-gray-600">No data available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headers = ['Order ID', 'Customer', 'Amount']
const itemKeys = ['orderId', 'customer', 'amount'] 
type OrderItem = { [key: string]: string }

const items = ref<OrderItem[]>([
    { orderId: 'A001', customer: 'Alice', amount: '$120', status: 'Cancelled' },
    { orderId: 'A002', customer: 'Bob', amount: '$80', status: 'Pending' },
    { orderId: 'A003', customer: 'Charlie', amount: '$150', status: 'Delivered' },
    { orderId: 'A003', customer: 'Charlie', amount: '$150', status: 'Delivered' },
])
</script>

<style scoped>
</style>