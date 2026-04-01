<template>
    <Transition name="bounce">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
            @click.self="closeDialog">
            <div
                class="bg-white dark:bg-gray-900 w-full max-w-2xl p-4 md:p-8 rounded-2xl shadow-2xl space-y-6 mx-2 border border-gray-200 dark:border-gray-800 transition-all duration-300"
            >
                <!-- Header -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                        <div class="text-xs md:text-sm text-gray-500 dark:text-gray-400">Order ID</div>
                        <div class="font-bold text-sm md:text-base text-gray-900 dark:text-white tracking-wide">
                            #{{ selectedOrder?.data.order_number }}
                        </div>
                    </div>
                    <div>
                        <div class="text-xs md:text-sm text-gray-500 dark:text-gray-400">Order Date</div>
                        <div class="text-sm md:text-base text-gray-700 dark:text-gray-200">
                            {{ selectedOrder?.data.placed_at ? formatToDatetime(selectedOrder?.data.placed_at) : '-' }}
                        </div>
                    </div>
                </div>

                <!-- Store & Items -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm md:text-base">
                    <div>
                        <span class="text-gray-500 dark:text-gray-400">Order from: </span>
                        <span
                            @click="router.push({name: 'store', params: { slug: selectedOrder?.store.slug }})"
                            class="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer transition"
                        >
                            {{ selectedOrder?.store.name }}
                        </span>
                    </div>
                    <div>
                        <span class="text-gray-500 dark:text-gray-400">No. of Items: </span>
                        <span class="font-semibold text-gray-900 dark:text-white">{{ selectedOrder?.orderItems.length }}</span>
                    </div>
                </div>

                <!-- Items List -->
                <div class="flex flex-col gap-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                    <div
                        v-for="item in selectedOrder?.orderItems"
                        :key="item.id"
                        @click="gotTo(item.id)"
                        class="flex items-center gap-4 border border-gray-200 dark:border-gray-700 p-3 rounded-xl cursor-pointer bg-gray-100 dark:bg-gray-800"
                    >
                        <img src="/images/product.png" alt="Product" class="w-20 h-20 rounded-lg object-cover border border-gray-300 dark:border-gray-700" />
                        <div class="flex-1 w-full flex items-center justify-between gap-2">
                            <div class="flex-1 text-left space-y-1">
                                <h3 class="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">{{ item.product_name }}</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                                <p class="text-xs md:text-sm text-gray-700 dark:text-gray-200 font-medium">₹{{ item.unit_price }}</p>
                            </div>
                            <div>
                                <span class="mdi mdi-chevron-right text-2xl text-gray-400"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Progress -->
                <div
                class="flex flex-wrap items-center justify-between font-medium text-gray-500 dark:text-gray-300 py-2 md:py-6 gap-2"
                >
                <template v-for="(step, index) in steps" :key="step.key">
                    <div class="flex items-center space-x-1 text-xs sm:text-base">
                    <span 
                        :class="[
                        'text-xl',
                        orderStatus.includes(step.key) ? 'mdi mdi-check-all text-green-600' : 'mdi mdi-circle-outline'
                        ]"
                    ></span>
                    <span>{{ step.label }}</span>
                    </div>
                    <!-- Divider except last -->
                    <div 
                    v-if="index < steps.length - 1" 
                    class="w-6 h-0.5 bg-gray-300 dark:bg-gray-700 flex-1 mx-1"
                    ></div>
                </template>
                </div>


                <!-- Payment Mode -->
                <div class="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm md:text-base text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span class="font-semibold">Payment Mode:</span>
                    <span
                        class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-3 py-1 rounded-md ml-2 font-medium"
                    >
                        {{ selectedOrder?.payment.payment_mode }}
                    </span>
                </div>

                <!-- Price Summary -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2">
                    <div class="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{{ selectedOrder?.data.subtotal }}</span>
                    </div>
                    <div class="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span> - ₹{{ (selectedOrder?.data.discount ?? 0) + (selectedOrder?.data.coupon_discount ?? 0) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping</span>
                        <span>₹50.00</span>
                    </div>
                    <div class="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span>₹{{ selectedOrder?.data.total }}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row justify-end items-center gap-2 pt-4">
                    <button
                        class="px-5 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        @click="closeDialog"
                    >
                        Close
                    </button>
                    <button
                        class="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition"
                    >
                        Request Cancellation
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import { useStore } from '@/composables/useStore';
import { formatToDatetime } from '@/lib/formatDate';
import router from '@/router';

const {
    isOpen,
    selectedOrder,
    steps,
    orderStatus,
    closeDialog,
} = useOrder()

const { getProductData } = useStore()

const gotTo = (id: number) => {
  getProductData(id)
    router.push({
        name: 'product-detail',
        params: {
            storeslug: selectedOrder.value?.store.slug,
            id: id
        },
    })
}

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
