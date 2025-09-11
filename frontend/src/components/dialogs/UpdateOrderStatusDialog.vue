<template>
    <div>
        <div v-if="isDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
        </div>
        <Transition name="slide">
            <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-end z-20"
                @click.self="closeUpdateDialog">
                <div class="bg-white dark:bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-xl mx-2">
                    <h1 class="text-lg md:text-xl font-semibold mb-4">
                        Update Status
                    </h1>
                    <div class="mb-4 font-medium text-gray-500 dark:text-gray-400 cursor-default">
                        <div class="flex justify-between">
                            <p><span>Order No.: </span>{{ selected?.data.order_number }}</p>
                            <p><span>Date: </span>{{ selected?.data.placed_at ? formatToDate(selected?.data.placed_at) : '-' }}</p>
                        </div>
                    </div>
                    <select v-model="selectedStatus"
                        class="w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 rounded">
                        <option value="" disabled>Select Option</option>
                        <option v-for="(item, i) in statusOptions" :key="i" :value="item.value">{{ item.label }}
                        </option>
                    </select>
                    <div class="flex gap-2 text-sm md:text-base mt-4">
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors"
                            @click="updateStatus">
                            Update
                        </button>
                        <button
                            class="border  border-gray-400 text-gray-500 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                            @click="closeUpdateDialog">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>


<script setup lang="ts">
import { useOrder } from '@/composables/useOrder'
import { formatToDate } from '@/lib/formatDate';
import { onBeforeUnmount, onMounted } from 'vue';

const {
    isDialogOpen,
    selected,
    selectedStatus,
    statusOptions,
    updateStatus,
    closeUpdateDialog
} = useOrder()

const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    closeUpdateDialog()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.slide-enter-active {
    animation: slide-in-right 0.4s ease-out forwards;
}

.slide-leave-active {
    animation: slide-out-right 0.3s ease-in forwards;
}

@keyframes slide-in-right {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0%);
        opacity: 1;
    }
}

@keyframes slide-out-right {
    0% {
        transform: translateX(0%);
        opacity: 1;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>