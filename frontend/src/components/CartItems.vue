<template>
    <div class="mt-8 relative flex flex-col px-2 py-4 md:px-4 md:py-6 border border-gray-300  rounded-2xl">
        <h1
            class="absolute -top-4 left-5 px-2 -y-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 text-base md:text-lg font-medium">
            Puiipuii Gooods
        </h1>
        <div class="flex flex-col gap-1">
            <transition-group name="fade-slide" tag="div" class="space-y-4">
                <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
            </transition-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import CartItem from './cards/CartItem.vue';
import { useCart } from '@/composables/useCart';


const { cartItems } = useCart()


</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-20px) scale(0.98);
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateX(0) scale(1);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0) scale(1);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px) scale(0.98);
}
</style>