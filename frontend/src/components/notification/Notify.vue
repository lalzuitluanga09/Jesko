<template>
    <transition name="notify-slide-fade">
        <div
            v-if="visible"
            :class="[
                'fixed left-1/2 bottom-6 transform -translate-x-1/2  p-2  rounded-md shadow-md  z-100 text-xs md:text-sm',
                typeClasses[type] || typeClasses.success
            ]"
            role="alert"
        >
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span v-if="type === 'success'">
                        <i class="mdi mdi-check text-base md:text-lg"></i>
                    </span>
                    <span v-else-if="type === 'warning'">
                        <i class="mdi mdi-alert text-base md:text-lg"></i>
                    </span>
                    <span v-else-if="type === 'error'" >
                        <i class="mdi mdi-alert-circle-outline text-base md:text-lg"></i>
                    </span>
                    <span class="font-semibold line-clamp-2 leading-tight pr-4">
                        {{ message }}
                    </span>
                </div>
                <button
                    @click="close"
                    class="text-gray-300 cursor-pointer hover:text-gray-700 focus:outline-none rounded-full p-1 transition-colors"
                    aria-label="Close"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useNotify } from '@/composables/useNotify'

const {
    visible,
    type,
    message,
    close
} = useNotify()

const typeClasses = {
    success: 'bg-green-500 border border-green-300 text-white dark:bg-green-700 dark:border-white600 dark:text-green-300',
    warning: 'bg-amber-500 border border-amber-300 text-white dark:bg-amber-700 dark:border-amber-600 dark:text-amber-300',
    error: 'bg-rose-500 border border-rose-300 text-white dark:bg-rose-700 dark:border-rose-600 dark:text-rose-300'
}
</script>


<style scoped>
.notify-slide-fade-enter-active,
.notify-slide-fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.notify-slide-fade-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.notify-slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.notify-slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.notify-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
</style>