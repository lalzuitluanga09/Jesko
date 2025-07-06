<template>
    <Transition name="bounce">
        <div v-if="isView" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeViewDialog">
            <div class="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-xl mx-4 border border-gray-200 dark:border-gray-700">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center tracking-wide">
                    Sale Details
                </h2>
                <div v-if="selected" class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Name:</span>
                        <span class="font-semibold text-gray-900 dark:text-gray-100">{{ selected.name }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Start Date:</span>
                        <span class="text-gray-700 dark:text-gray-200">{{ selected['start date'] }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">End Date:</span>
                        <span class="text-gray-700 dark:text-gray-200">{{ selected['end date'] }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Discount Type:</span>
                        <span class="inline-block px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold">
                            {{ selected['discount type'] }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Amount:</span>
                        <span class="text-green-600 dark:text-green-400 font-semibold">{{ selected.amount }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Status:</span>
                        <span :class="[
                                'capitalize font-semibold px-2 py-1 rounded text-xs',
                                selected.status === 'active'
                                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                            ]">
                            {{ selected.status }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Target:</span>
                        <span class="text-gray-700 dark:text-gray-200">{{ selected.target }}</span>
                    </div>
                </div>
                <div class="flex justify-center mt-6">
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
import { useSale } from '@/composables/useSale';

const {
    isView,
    selected,
    closeViewDialog,
} = useSale();
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
