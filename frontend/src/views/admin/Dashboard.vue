<template>
    <div class="bg-white dark:bg-gray-800 p-5 rounded-xl cursor-default">
    <div class="flex flex-wrap gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">

        <button @click="setFilter('today')"
            :class="[
                baseClass,
                dashboard.filter === 'today' ? activeClass : inactiveClass
            ]">
            Today
        </button>

        <button @click="setFilter('last_7_days')"
            :class="[
                baseClass,
                dashboard.filter === 'last_7_days' ? activeClass : inactiveClass
            ]">
            Last 7 Days
        </button>

        <button @click="setFilter('this_month')"
            :class="[
                baseClass,
                dashboard.filter === 'this_month' ? activeClass : inactiveClass
            ]">
            This Month
        </button>

        <button @click="setFilter('this_year')"
            :class="[
                baseClass,
                dashboard.filter === 'this_year' ? activeClass : inactiveClass
            ]">
            This Year
        </button>

    </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm md:text-base ">
            <!-- Total Sales Card -->
            <div
                class="relative bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 rounded-xl p-6 border border-gray-200 flex flex-col items-center overflow-hidden transition-transform">
                <div
                    class="absolute -top-6 -right-6 opacity-20 text-blue-300 dark:text-blue-700 text-8xl pointer-events-none select-none">
                    <i class="mdi mdi-cash-multiple"></i>
                </div>
                <span class="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-200 drop-shadow mb-2">
                    ₹{{ Number(dashboard.meta.total_sales).toLocaleString('en-IN', { maximumFractionDigits: 0 }) }}
                </span>
                <div class="flex items-center mt-1">
                    <i class="mdi mdi-cash-multiple mr-2 text-2xl md:text-3xl text-blue-600 dark:text-blue-300"></i>
                    <span class="text-base md:text-lg font-medium text-blue-900 dark:text-blue-100">Total Sales</span>
                </div>
            </div>
            <!-- Pending Orders Card -->
            <div
                class="relative bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700 rounded-xl p-6 border border-gray-200 flex flex-col items-center overflow-hidden transition-transform">
                <div
                    class="absolute -top-6 -right-6 opacity-20 text-yellow-300 dark:text-yellow-700 text-8xl pointer-events-none select-none">
                    <i class="mdi mdi-timer-sand"></i>
                </div>
                <span
                    class="text-3xl md:text-4xl font-extrabold text-yellow-700 dark:text-yellow-200 drop-shadow mb-2">{{
                        dashboard.meta.pending_orders }}</span>
                <div class="flex items-center mt-1">
                    <i class="mdi mdi-timer-sand mr-2 text-2xl md:text-3xl text-yellow-600 dark:text-yellow-300"></i>
                    <span class="text-base md:text-lg font-medium text-yellow-900 dark:text-yellow-100">Pending
                        Orders</span>
                </div>
            </div>
            <!-- Stock Value Card -->
            <div
                class="relative bg-gradient-to-br from-green-200 via-green-100 to-green-50 dark:from-green-900 dark:via-green-800 dark:to-green-700 rounded-xl p-6 border border-gray-200 flex flex-col items-center overflow-hidden transition-transform">
                <div
                    class="absolute -top-6 -right-6 opacity-20 text-green-300 dark:text-green-700 text-8xl pointer-events-none select-none">
                    <i class="mdi mdi-warehouse"></i>
                </div>
                <span class="text-3xl md:text-4xl font-extrabold text-green-700 dark:text-green-200 drop-shadow mb-2">
                    ₹{{ Number(dashboard.meta.current_stock_value).toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    }}
                </span>
                <div class="flex items-center mt-1">
                    <i class="mdi mdi-warehouse mr-2 text-2xl md:text-3xl text-green-600 dark:text-green-300"></i>
                    <span class="text-base md:text-lg font-medium text-green-900 dark:text-green-100">Stock Value</span>
                </div>
            </div>
            <!-- Total Products Card -->
            <div
                class="relative bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 dark:from-purple-900 dark:via-purple-800 dark:to-purple-700 rounded-xl p-6 border border-gray-200 flex flex-col items-center overflow-hidden transition-transform">
                <div
                    class="absolute -top-6 -right-6 opacity-20 text-purple-300 dark:text-purple-700 text-8xl pointer-events-none select-none">
                    <i class="mdi mdi-package-variant-closed"></i>
                </div>
                <span
                    class="text-3xl md:text-4xl font-extrabold text-purple-700 dark:text-purple-200 drop-shadow mb-2">{{
                        dashboard.meta.total_products }}</span>
                <div class="flex items-center mt-1">
                    <i
                        class="mdi mdi-package-variant-closed mr-2 text-2xl md:text-3xl text-purple-600 dark:text-purple-300"></i>
                    <span class="text-base md:text-lg font-medium text-purple-900 dark:text-purple-100">Total
                        Products</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div class="lg:col-span-2 bg-sky-50 dark:bg-gray-900 rounded-lg border border-gray-200 p-2">
                <div class="flex justify-between items-center px-2">
                    <h2 class="text-lg font-semibold mb-4 text-sky-700 dark:text-sky-200">
                        <i class="mdi mdi-finance text-lg mr-1"></i>Sales Chart
                    </h2>
                </div>
                <SalesChart />

            </div>
            <div class="bg-cyan-50 dark:bg-gray-900 rounded-lg p-4 flex flex-col border border-gray-200">
                <h2 class="text-lg font-semibold mb-4 text-cyan-700 dark:text-cyan-200 text-center">
                    <i class="mdi mdi-sitemap text-lg mr-1"></i>Sales by Category
                </h2>
                <PieChart />
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <RecentOrders class="col-span-2" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3">
                <TopProducts />
                <LowStockProducts />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LowStockProducts from '@/components/admin/dashboard/LowStockProducts.vue';
import PieChart from '@/components/admin/dashboard/PieChart.vue';
import RecentOrders from '@/components/admin/dashboard/RecentOrders.vue';
import SalesChart from '@/components/admin/dashboard/SalesChart.vue';
import TopProducts from '@/components/admin/dashboard/TopProducts.vue';
import { useAdmin } from '@/composables/useAdmin';
import { useDashboard } from '@/stores/dashboard';
import { watch } from 'vue';

const dashboard = useDashboard()

const { storeSlug } = useAdmin()

watch(storeSlug, async (newSlug) => {
    if (newSlug) {
        await dashboard.fetchData()
    }
},
    { immediate: true }
)

const baseClass = 'px-2 py-1 rounded-lg cursor-pointer shadow-md border transition';

const activeClass = 'bg-blue-500 text-white border-blue-500 hover:bg-blue-700';

const inactiveClass = 'bg-white/30 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700';

const setFilter = (value: string) => {
    dashboard.filter = value;
    dashboard.fetchData(value);
};


</script>