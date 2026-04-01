<template>
    <div class="bg-purple-50 dark:bg-gray-900 rounded-lg shadow p-3 border border-gray-300">
        <h2 class="text-base font-semibold mb-3 flex items-center text-purple-800 dark:text-purple-200">
            <span class="mdi mdi-package-variant-closed text-lg mr-1"></span>
            Top Selling Products
        </h2>

        <div v-if="dashboard.topSellingProducts.length > 0" class="max-h-[11rem] overflow-y-auto space-y-3">

            <div
                v-for="(item, index) in dashboard.topSellingProducts"
                :key="item.id"
                class="flex items-center gap-2 px-2 py-1 rounded hover:bg-purple-100 dark:hover:bg-gray-800 transition"
            >

                <!-- Rank -->
                <span class="text-xs w-5 text-gray-400 shrink-0">
                    {{ index + 1 }}
                </span>

                <!-- Name -->
                <span class="flex-1 min-w-0 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ item.name }}
                </span>

                <!-- Bar -->
                <div class="flex-[2] h-3 bg-purple-200 dark:bg-gray-700 rounded">
                    <div
                        class="h-3 rounded transition-all duration-500 ease-out"
                        :class="index === 0 ? 'bg-purple-500' : 'bg-purple-400'"
                        :style="{
                            width: Math.max(
                                10,
                                (Number(item.total_sold) / maxSold) * 100
                            ) + '%'
                        }"
                    ></div>
                </div>

                <!-- Sold -->
                <span class="text-xs text-gray-600 dark:text-gray-400 text-right shrink-0">
                    {{ Number(item.total_sold) }}
                </span>

                <!-- Revenue -->
                <span class="text-xs text-gray-700 dark:text-gray-300 text-right shrink-0">
                    ₹{{ (Number(item.total_sold) * Number(item.price)).toLocaleString('en-IN') }}
                </span>

            </div>
        </div>

        <div v-else class="text-gray-500 px-4 py-6 text-center">
            No top selling products.
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboard } from '@/stores/dashboard'

const dashboard = useDashboard()

const maxSold = computed(() =>
    Math.max(
        ...dashboard.topSellingProducts.map(p => Number(p.total_sold)),
        1
    )
)
</script>