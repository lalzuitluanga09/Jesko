<template>
    <Transition name="bounce">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
            @click.self="closeDialog">
            <div class="bg-white/90 dark:bg-gray-700/90 w-full max-w-md mx-2 rounded-lg shadow-lg p-4 md:p-6 space-y-4">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">Add New Address</h2>

                <!-- Address Form -->
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Label</label>
                        <input type="text" placeholder="e.g. Home, Work"
                            class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Address</label>
                        <textarea rows="3" placeholder="Street, Area, City"
                            class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Phone</label>
                        <input type="text" placeholder="+91 9876543210"
                            class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-3 pt-4">
                    <button class="px-4 py-2 text-sm text-gray-700 dark:text-gray-400 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        @click="closeDialog">
                        Cancel
                    </button>
                    <button class="px-4 py-2 text-sm text-white bg-pink-600 hover:bg-pink-700 rounded-md">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>




<script setup lang="ts">
import { useAddress } from '@/composables/useAddress';

const {
    isOpen,
    closeDialog
} = useAddress()

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
