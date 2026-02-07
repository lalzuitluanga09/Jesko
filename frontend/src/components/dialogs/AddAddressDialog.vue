<template>
    <Transition name="bounce">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
            @click.self="closeDialog">
            <div
                class="bg-white/80 dark:bg-gray-700/80 w-full max-w-md mx-2 rounded-lg shadow-lg p-4 md:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
                    <span>{{ isEditing ? 'Edit Address' : 'Add New Address' }}</span>
                </h2>
                <form @submit.prevent="isEditing ? update(formData.id) : save()">
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Label</label>
                            <input type="text" placeholder="e.g. Home, Work" v-model="formData.label"
                                class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Name *</label>
                            <input type="text" placeholder="e.g. John Doe" v-model="formData.name" required
                                class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Phone *</label>
                            <input type="text" placeholder="e.g. 1234567890" v-model="formData.phone" required
                                inputmode="numeric" pattern="[0-9]*" maxlength="10"
                                @input="formData.phone = ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10)"      
                                class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Address *</label>
                            <textarea rows="3" placeholder="Street, Area, City" v-model="formData.address" required
                                class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Landmark (Optional)</label>
                            <input type="text" placeholder="e.g. Home, Work" v-model="formData.landmark"
                                class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Postal Code</label>
                                <input type="text" placeholder="e.g. 796001" v-model="formData.postal_code"
                                     inputmode="numeric" pattern="[0-9]*" maxlength="6"
                                    @input="formData.postal_code = ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 6)"
                                    class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">Town / City</label>
                                <input type="text" placeholder="e.g. Aizawl" v-model="formData.city"
                                    class="mt-1 w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">District</label>
                            <select v-model="formData.districtId"
                                class="mt-1 px-4 py-2 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                                <option :value="null">Select Option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex mt-6"
                        :class="isEditing ? 'justify-between' : 'justify-end'">
                        <button v-if="isEditing" @click="deleteAddress(formData.id)" title="Delete Address"
                            type="button"
                            class="px-4 py-1 text-sm text-red-600 dark:text-red-400 border border-red-300 rounded-md hover:bg-red-200 dark:hover:bg-gray-600 cursor-pointer">
                            <Loading v-if="isDeleting" class="inline-block mr-2" />
                            <span v-else class="mdi mdi-trash-can text-lg md:text-xl"></span>
                        </button>
                        <div class="flex gap-3">
                            <button
                                type="button"
                                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-400 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                @click="closeDialog">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 text-sm text-white bg-primary hover:bg-primary-hover rounded-md cursor-pointer">
                                <Loading v-if="loading" class="inline-block mr-2" />
                                <span v-else>{{ isEditing ? 'Update' : 'Submit' }}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useAddress } from '@/composables/useAddress'
import Loading from '../others/Loading.vue';

const { 
    isEditing,
    isDeleting,
    loading,
    isOpen,
    formData,
    save,
    update,
    closeDialog,
    deleteAddress
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
