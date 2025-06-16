<template>
    <Transition name="bounce">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
            @click.self="closeDialog">
            <div
                class="bg-white/80 dark:bg-gray-700/80 w-full max-w-2xl p-4 md:p-6 rounded-xl shadow-md space-y-4 mx-2">
                <div class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 md:text-base">
                    <div>Order ID: <span class="font-medium text-gray-800 dark:text-gray-200">#ORD123456</span></div>
                    <div>Order Date: <span class="text-gray-800 dark:text-gray-200">June 15, 2025</span></div>
                </div>

                <div class="flex justify-between text-sm md:text-base text-gray-600 dark:text-gray-400">
                    <div>Order from: <span class="font-medium text-gray-800 dark:text-gray-200">Store Name</span></div>
                    <div>No. of Items: <span class="font-medium text-gray-800 dark:text-gray-200">1</span></div>
                </div>

                <div class="flex flex-col gap-2 max-h-72 overflow-y-auto">
                    <div v-for="n in 5" :key="n"
                        class="flex space-x-4 items-center border border-gray-400 p-2 rounded-xl">
                        <img src="/images/product.png" alt="Product" class="w-20 h-20 rounded object-cover" />
                        <div class=" w-full flex items-center justify-between">
                            <div class="flex-1">
                                <h3 class="font-medium text-base md:text-lg">Item Name</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Qty: 2</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">₹499.00</p>
                            </div>
                            <div>
                                <span class="mdi mdi-chevron-right text-2xl"></span>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    class="flex items-center justify-between font-medium text-gray-500 dark:text-gray-300 py-2 md:py-6">
                    <div class="flex items-center space-x-2 text-xs sm:text-base">
                        <div class="w-2 h-2 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
                        <span>Processing</span>
                    </div>
                    <div class="w-5 h-0.5 bg-gray-300 flex-1 mx-1"></div>
                    <div class="flex items-center space-x-2 text-xs sm:text-base">
                        <div class="w-2 h-2 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
                        <span>Confirmed</span>
                    </div>
                    <div class="w-5 h-0.5 bg-gray-300 flex-1 mx-1"></div>
                    <div class="flex items-center space-x-2 text-xs sm:text-base">
                        <div class="w-2 h-2 md:w-4 md:h-4 rounded-full bg-blue-200"></div>
                        <span>Out for Delivery</span>
                    </div>
                    <div class="w-5 h-0.5 bg-gray-300 flex-1 mx-1"></div>
                    <div class="flex items-center space-x-2 text-sm sm:text-lg">
                        <div class="w-2 h-2 md:w-4 md:h-4 rounded-full bg-gray-200"></div>
                        <span>Delivered</span>
                    </div>
                </div>

                <div class="pt-4 border-t text-sm md:text-base text-gray-600 dark:text-gray-300 flex items-center">
                    <span class="font-medium">Payment Mode:</span>
                    <span
                        class="bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md ml-2">Cash
                        on Delivery</span>
                </div>


                <div class="border-t pt-4 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1">
                    <div class="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹1897.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping</span>
                        <span>₹50.00</span>
                    </div>
                    <div class="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>₹1947.00</span>
                    </div>
                </div>

                <div class="text-right space-x-1">
                    <button
                        class="px-4 py-2 text-sm border border-gray-400 rounded hover:bg-pink-100 dark:hover:bg-gray-600"
                        @click="closeDialog">
                        Close
                    </button>
                    <button class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                        Request Cancellation
                    </button>
                </div>
            </div>

        </div>
    </Transition>
</template>



<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
const {
    isOpen,
    closeDialog
} = useOrder()

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
