<template>
    <div class="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 relative flex flex-col px-2 py-4 md:px-4 md:py-6">
        <h1 @click="goTo"
            class="cursor-pointer absolute -top-4 left-5 px-2 -y-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-base md:text-lg font-medium">
            {{ item.store_name }}
        </h1>
        <div class="flex flex-col gap-1">
            <transition-group name="fade-slide" tag="div" class="space-y-2">
                <CartItem v-for="product in item.items" :key="product.id" :item="product" :slug="item.store_slug" @update:quantity="product.quantity = $event"/>
            </transition-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GroupedItems } from '@/types/cart';
import CartItem from './cards/CartItem.vue';
import router from '@/router';

const props = defineProps<{
    item: GroupedItems
}>();

const goTo = () => {
    router.push({
        name: 'store',
        params: {
            slug: props.item.store_slug,
        }
    })
}

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