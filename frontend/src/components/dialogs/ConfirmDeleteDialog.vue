<template>
    <Transition name="bounce">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeDialog">
            <div
                class="flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-2xl shadow-xl space-y-5 mx-4 border border-gray-200 dark:border-gray-700">
                <i class="mdi mdi-delete-alert text-6xl text-red-500 mb-2"></i>
                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">Confirm Deletion</h2>
                <p class="text-gray-500 text-center">
                    Are you sure you want to delete this item? <br>This action cannot be undone.
                </p>
                <div class="flex justify-center w-full space-x-3 pt-2">
                    <button
                        class="px-5 py-2 text-sm cursor-pointer font-medium border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        @click="closeDialog">
                        Cancel
                    </button>
                    <button
                        class="px-5 py-2 text-sm cursor-pointer font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
                        @click="deleteItem"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>



<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';


const props = defineProps<{
    isOpen: boolean
}>();

const closeDialog = () => {
    emit('update:isOpen', false)
}

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void
    (e: 'deleteItem'): void
}>();

const deleteItem = () => {
    emit('deleteItem')
}

const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    closeDialog()
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
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: fade-out 0.2s;
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

@keyframes fade-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.5);
    }
}

</style>
