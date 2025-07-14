<template>
    <Transition name="bounce">
        <div v-show="isView" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeViewDialog">
            <div
                class="flex flex-col bg-white dark:bg-gray-800 w-full max-w-lg p-8 rounded-2xl shadow-lg mx-4 border border-gray-200 dark:border-gray-700">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center tracking-tight">
                    <span class="inline-flex items-center gap-2">
                        <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Order Details
                    </span>
                </h2>
                <div class="space-y-4 mb-6">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Order ID:</span>
                        <span class="font-semibold text-blue-600 dark:text-blue-400">{{ selected?.id || '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Date:</span>
                        <span class="text-gray-800 dark:text-gray-100">{{ selected?.date || '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Customer:</span>
                        <span class="text-gray-800 dark:text-gray-100">{{ selected?.customer || '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Payment Method:</span>
                        <span class="inline-flex items-center gap-1 text-gray-800 dark:text-gray-100">
                            <svg v-if="selected?.paymentMethod === 'Credit Card'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <rect x="2" y="7" width="20" height="10" rx="2" />
                                <path d="M2 11h20" />
                            </svg>
                            {{ selected?.paymentMethod || '—' }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Total:</span>
                        <span class="font-semibold text-green-600 dark:text-green-400">
                            {{ selected?.total ? '$' + selected.total : '—' }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 dark:text-gray-400">Items:</span>
                        <ul v-if="Array.isArray(selected?.items)" class="pl-4 list-disc text-gray-800 dark:text-gray-100">
                            <li v-for="(item, idx) in selected.items" :key="idx">
                                {{ item.name }} <span class="text-gray-500">x{{ item.quantity }}</span>
                            </li>
                        </ul>
                        <span v-else class="text-gray-800 dark:text-gray-100">{{ selected?.items || '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Status:</span>
                        <span
                            :class="{
                                'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': selected?.status === 'Completed',
                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': selected?.status === 'Pending',
                                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': selected?.status === 'Cancelled',
                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': !['Completed','Pending','Cancelled'].includes(selected?.status)
                            }"
                            class="px-3 py-1 rounded-full text-sm font-medium transition"
                        >
                            {{ selected?.status || '—' }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-center pt-2">
                    <button
                        class="px-6 py-2 text-base font-medium border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        @click="closeViewDialog">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';

const {
    isView,
    selected,
    closeViewDialog,
} = useOrder();
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
