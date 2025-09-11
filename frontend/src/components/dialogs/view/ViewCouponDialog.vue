<template>
    <Transition name="bounce">
        <div v-show="isView" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeViewDialog">
            <div class="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-xl mx-4 border border-gray-200 dark:border-gray-700">
                <h2 class="text-xl ml-14 font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <span
                        class="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                        {{ selectedCoupon?.status?.toUpperCase() || 'UNKNOWN' }}
                    </span>
                    <span>Coupon Details</span>
                </h2>
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Code:</span>
                        <span class="font-mono font-bold text-base text-gray-900 dark:text-gray-100 break-all">{{ selectedCoupon?.code }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Type:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.discountType }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Value:</span>
                        <span class="text-gray-900 dark:text-gray-100">
                            <span v-if="selectedCoupon?.discountType === 'percentage'">
                                {{ Math.ceil(selectedCoupon?.discountValue) }}%
                            </span>
                            <span v-else-if="selectedCoupon?.discountType === 'fixed'">
                                ₹ {{ selectedCoupon?.discountValue }}
                            </span>
                        </span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Min Order Value:</span>
                        <span class="text-gray-900 dark:text-gray-100">₹ {{ selectedCoupon?.minOrderValue }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Max Discount Value:</span>
                        <span class="text-gray-900 dark:text-gray-100">₹ {{ selectedCoupon?.maxDiscountValue }}</span>
                    </div>
                    
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Usage Limit:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.usageLimit }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Per User Limit:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.perUserLimit }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Usage Stats:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.usedCount }} / {{ selectedCoupon?.usageLimit }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Starts At:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.startAt ? formatToDatetime(selectedCoupon?.startAt) : '' }}</span>
                    </div>
                    <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span class="text-gray-500 dark:text-gray-400 font-medium">Ends At:</span>
                        <span class="text-gray-900 dark:text-gray-100">{{ selectedCoupon?.endAt ? formatToDatetime(selectedCoupon?.endAt) : '' }}</span>
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
import { useCoupon } from '@/composables/useCoupon';
import { formatToDatetime } from '@/lib/formatDate';

const {
    isView,
    selectedCoupon,
    closeViewDialog,
} = useCoupon();
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
