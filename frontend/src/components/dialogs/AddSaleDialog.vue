<template>
  <div>
    <div v-if="addDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
    </div>
    <Transition name="slide">
      <div v-if="addDialogOpen" class="fixed inset-0 flex items-center justify-end z-20" @click.self="closeAddDialog">
        <div class="bg-white dark:bg-gray-700 w-full max-w-4xl p-8 rounded-lg shadow-lg">
          <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">New Sale</h1>
        <form class="space-y-6" @submit.prevent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Sale Name</label>
                    <input
                        id="name"
                        type="text"
                        v-model="sale.name"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="e.g. Summer Sale"
                    />
                </div>
                <!-- Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Status</label>
                    <select
                        id="status"
                        v-model="sale.status"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <!-- Start Date -->
                <div>
                    <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        v-model="sale.startDate"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <!-- End Date -->
                <div>
                    <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        v-model="sale.endDate"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <!-- Discount Type -->
                <div>
                    <label for="discountType" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Discount Type</label>
                    <select
                        id="discountType"
                        v-model="sale.discountType"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                    </select>
                </div>
                <!-- Discount Amount -->
                <div>
                    <label for="discountAmount" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Discount Amount</label>
                    <input
                        id="discountAmount"
                        type="text"
                        v-model="sale.discountAmount"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="e.g. 10% or $10"
                    />
                </div>
                <!-- Target -->
                <div class="md:col-span-2">
                    <label for="target" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Target</label>
                    <select
                        id="target"
                        v-model="sale.target"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="All Products">All Products</option>
                        <option value="Selected Products">Selected Products</option>
                        <option value="Categories">Categories</option>
                    </select>
                </div>
                <div v-if="sale.target === 'Selected Products'" class="md:col-span-2">
                    <label for="selectedProducts" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Select Products</label>
                    <VueSelect :options="options" v-model="selected" multiple/>
                </div>
                <div v-if="sale.target === 'Categories'" class="md:col-span-2">
                    <label for="selectedCategories" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Select Categories</label>
                    <VueSelect :options="options" v-model="selected" multiple/>
                </div>
            </div>
            <div class="flex justify-end gap-3 pt-6">
                <button type="button" @click="closeAddDialog"
                    class="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    Cancel
                </button>
                <button type="submit"
                    class="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold">
                    Create Sale
                </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup lang="ts">
import { useSale } from '@/composables/useSale';
import { ref } from 'vue';
import VueSelect from "vue-select"

const options = [ 'Car', 'Bike', 'Clothes', 'Electronics', 'Furniture' ]
const selected = ref<string[]>([])

const {
    sale,
  addDialogOpen,
  closeAddDialog
} = useSale()


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