<template>
    <LoginMessage title="Your cart items show here" v-if="!auth.isAuthenticated"/>
    <div v-else class="flex flex-col w-full max-w-4xl mx-auto">
        <div class="text-2xl font-bold flex justify-center py-2 md:py-4">My Cart</div>
        <div v-if="cart.itemCount == 0" class="flex flex-col items-center justify-center py-12 rounded-xl my-8">
            <span class="mdi mdi-cart-outline text-4xl py-4"></span>
            <div class="text-xl font-semibold mb-2">Your cart is empty</div>
            <div class="text-gray-500 mb-4">Looks like you haven’t added anything to your cart yet.</div>
            <SimpleBtn title="Exlore" type="primary" @click="$router.push({ name: 'explore' })" />
        </div>
        <div v-else>
            <CartItems v-for="item in cart.cart?.items" :key="item.store_id" :item="item" />

            <div class="flex flex-col justify-center mt-4 border border-gray-200 rounded-xl">
                <div class="text-lg font-semibold flex justify-center py-2">Order Summary</div>
                <div class="flex flex-row justify-between items-start md:items-center p-4">
                    <div class="mb-2 md:mb-0">
                        <div class="text-sm md:text-base text-gray-500 dark:text-gray-300">Subtotal (4 items):</div>
                        <div class="text-sm md:text-base text-gray-500 dark:text-gray-300">Discount:</div>
                        <div class="text-sm md:text-base text-gray-500 dark:text-gray-300">Tax:</div>
                        <div class="text-base md:text-lg font-medium mt-2">Total:</div>
                    </div>
                    <div class="flex flex-col items-end">
                        <div class="text-sm md:text-base font-bold text-green-700 dark:text-green-500 mb-1">$120.00</div>
                        <div class="text-sm md:text-base text-red-600 dark:text-red-400">-$10.00</div>
                        <div class="text-sm md:text-base text-gray-700 dark:text-gray-400">+$8.80</div>
                        <div class="text-base md:text-lg font-bold text-green-800 dark:text-green-600 mt-2">$118.80</div>
                    </div>
                </div>
                <SimpleBtn title="Checkout" type="primary"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SimpleBtn from '@/components/buttons/SimpleBtn.vue';
import CartItems from '@/components/CartItems.vue';
import LoginMessage from '@/components/LoginMessage.vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { onMounted, ref } from 'vue';

const auth = useAuthStore()
const cart = useCartStore()

onMounted(async() => {
    await cart.getCartItems()
})


</script>

<style scoped></style>