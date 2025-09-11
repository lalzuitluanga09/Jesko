<template>
    <Transition name="bounce">
        <div v-if="confirmDialogOpen"
            class="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
            <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div
                    class="bg-white dark:bg-gray-800/80 w-full max-w-md mx-2 rounded-2xl shadow-2xl overflow-y-auto border border-gray-200 dark:border-gray-700 text-center">
                    <div v-if="!isOrderConfirmed" class="p-4 space-y-4">
                        <section class="rounded-xl p-6 border border-gray-300 dark:border-gray-700">
                            <h2 class="text-lg font-semibold text-pink-600 flex items-center justify-center gap-2">
                                <span class="mdi mdi-check-circle text-pink-600 text-xl"></span>
                                Confirm & Pay
                            </h2>
                            <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                Please confirm your order and proceed with payment.
                            </p>
                            <div class="mt-4 space-y-2">
                                <h2 class="text-2xl font-bold">₹{{ cart.total }}</h2>
                                <p class="text-sm text-gray-600 dark:text-gray-300">Payment Method:
                                    <span class="font-semibold">{{ paymentMode == 'cod' ? 'Cash on Delivery' : (paymentMode == 'upi' ? 'UPI' : 'Card') }}</span></p>
                                <p class="text-sm text-gray-600 dark:text-gray-300">Total Items: <span
                                        class="font-semibold">{{ auth.userMeta.cart_items.length }}</span></p>
                            </div>
                        </section>

                        <div class="flex gap-2 text-sm">
                            <button @click="confirmDialogOpen = false"
                                class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                                Cancel
                            </button>
                            <button @click="placeOrder"
                                class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
                                Confirm Order
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="placingOrder" class="flex flex-col w-full items-center justify-center h-[30vh]">
                            <div role="status">
                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div v-else class="p-6 space-y-6 text-center">
                            <div
                                class="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm bg-white/80 dark:bg-gray-800/80">
                                <span class="mdi mdi-check-decagram text-green-600 text-5xl mb-3"></span>
                                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Order Confirmed Successfully!
                                </h3>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                    Thank you for your purchase. Your order is being processed.
                                </p>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-3 text-sm">
                                <button @click="goToCart()"
                                    class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                                    Back to Cart
                                </button>
                                <button @click="goToMyOrders()"
                                    class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
                                    Go to My Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const auth = useAuthStore()

const cart = useCartStore()

const {
    confirmDialogOpen,
    isOrderConfirmed,
    placingOrder,
    paymentMode,
    placeOrder,
    goToCart,
    goToMyOrders
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
