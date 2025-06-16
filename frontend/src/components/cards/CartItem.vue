<template>
    <div class="flex items-center p-4 dark:bg-gray-600 hover:bg-amber-50 dark:hover:bg-gray-500 rounded-xl border border-gray-200 shadow-sm gap-4 cursor-pointer">
        <img src="/images/product.png" alt="Product" class="w-20 h-20 object-cover rounded-lg border border-gray-100" @click="handleClick"/>
        <div class="flex-1 min-w-0" @click="handleClick">
            <h3 class="text-base font-semibold truncate"> {{ item.name }}</h3>
            <p class="text-sm text-gray-400 truncate">Category</p>
            <h1 class="text-lg font-bold py-1">$19.99</h1>
        </div>
        <div class="flex flex-col items-end gap-2 ml-4">
            <button class="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-200 px-1 rounded-4xl transition-colors"
                @click="remove" title="Remove item">
                <span class="mdi mdi-trash-can text-2xl"></span>
            </button>
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
                <button class="p-0.5 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-base sm:text-lg"
                    @click="decrement" :disabled="quantity <= 1">
                    <span class="mdi mdi-minus"></span>
                </button>
                <span class="mx-2 w-4 text-center select-none text-sm md:text-base sm:mx-3 ">{{ quantity }}</span>
                <button class="p-0.5 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-base sm:text-lg"
                    @click="increment">
                    <span class="mdi mdi-plus"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { useCart } from '@/composables/useCart';

interface CartItem {
    id: string;
    name: string;
}

const { cartItems } = useCart()

const props = defineProps<{
    item: CartItem 
}>();

const quantity = ref(1)

function increment() {
    quantity.value++
}

function decrement() {
    if (quantity.value > 1) quantity.value--
}


const remove = () => {
  const index = cartItems.value.findIndex(item => item.id === props.item.id)
  if (index !== -1) cartItems.value.splice(index, 1)
}

const handleClick = () => {
    router.push('/')
}

</script>

<style scoped></style>