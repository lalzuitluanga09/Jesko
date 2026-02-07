<template>
    <div class="flex flex-col w-full max-w-6xl mx-auto">
        <div class="text-2xl font-bold flex justify-center py-2 md:py-4">My Cart</div>
        <div v-if="cart.itemCount == 0" class="flex flex-col items-center justify-center py-12 rounded-xl my-8">
            <span class="mdi mdi-cart-outline text-4xl py-4"></span>
            <div class="text-xl font-semibold mb-2">Your cart is empty</div>
            <div class="text-gray-500 mb-4">Looks like you haven’t added anything to your cart yet.</div>
            <SimpleBtn title="Exlore" type="primary" @click="$router.push({ name: 'explore' })" />
        </div>
        <div v-else class="md:grid md:grid-cols-5 gap-4">
            <div class="col-span-3">
                <CartItems v-for="item in cart.cart?.items" :key="item.store_id" :item="item" />
            </div>

            <div class="col-span-2 mt-8 md:h-fit md:sticky md:top-2">
                <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                    <h2 class="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">
                        Summary
                    </h2>

                    <div class="space-y-3">
                        <div class="flex justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <span>Sub-total</span>
                            <span class="font-semibold text-gray-800 dark:text-gray-100">₹{{ cart.subTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm md:text-base">
                            <span class="text-gray-600 dark:text-gray-300">Discount</span>
                            <span class="text-green-600 dark:text-green-400 font-medium">- ₹{{ cart.discountTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm md:text-base">
                            <span class="text-gray-600 dark:text-gray-300">Tax</span>
                            <span class="text-gray-700 dark:text-gray-400">+ ₹ 0</span>
                        </div>
                        <hr class="border-gray-300 dark:border-gray-600 my-2" />
                        <div class="flex justify-between items-center text-lg font-bold">
                            <span class="text-gray-800 dark:text-gray-100">Total</span>
                            <span class="text-pink-600 dark:text-pink-500">₹{{ cart.total.toFixed(2) }}</span>
                        </div>
                    </div>
                    <SimpleBtn title="Checkout" type="primary" class="w-full py-2 mt-2"
                            @click="$router.push({ name: 'checkout' })" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SimpleBtn from '@/components/buttons/SimpleBtn.vue';
import CartItems from '@/components/CartItems.vue';
import { useCartStore } from '@/stores/cart';
import { onMounted } from 'vue';

const cart = useCartStore()

onMounted(async () => {
    await cart.getCartItems()
})

</script>
