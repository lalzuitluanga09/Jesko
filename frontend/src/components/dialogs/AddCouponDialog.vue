<template>
  <div>
    <div v-if="addDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
    </div>
    <Transition name="slide">
      <div v-if="addDialogOpen" class="fixed inset-0 flex items-center justify-end z-20" @click.self="closeAddDialog">
        <div class="bg-white dark:bg-gray-700 w-full max-w-5xl p-8 rounded-lg shadow-xl overflow-y-auto">
          <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Add Coupon</h1>
        <form class="space-y-6" @submit.prevent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Coupon Code -->
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Code</label>
                    <input type="text" v-model="coupon.code" required
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" placeholder="e.g., SUMMER15" />
                </div>
                <!-- Type -->
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Type</label>
                    <select v-model="coupon.type" required
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
                <!-- Value -->
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Value</label>
                    <input type="number" v-model.number="coupon.value" required min="1"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" placeholder="e.g., 15 or 100" />
                </div>
                <!-- Usage Limit -->
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Usage Limit</label>
                    <input type="number" v-model.number="coupon.usageLimit" min="1"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" placeholder="Total uses (optional)" />
                </div>
                <!-- Validity -->
                <div class="flex gap-2">
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Start Date</label>
                        <input type="date" v-model="coupon.startDate"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">End Date</label>
                        <input type="date" v-model="coupon.endDate"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" />
                    </div>
                </div>
                <!-- Status -->
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Status</label>
                    <select v-model="coupon.status"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Applies To</label>
                    <select
                        id="target"
                        v-model="coupon.appliesTo"
                        required
                        class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="All Products">All Products</option>
                        <option value="Selected Products">Selected Products</option>
                        <option value="Categories">Categories</option>
                    </select>
                    <!-- <VueSelect v-model="coupon.appliesTo" :options="options" multiple placeholder="Select products/categories/all" /> -->
                </div>
                <div v-if="coupon.appliesTo === 'Selected Products'">
                    <label for="selectedProducts" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Select Products</label>
                    <VueSelect :options="options" v-model="selected" multiple/>
                </div>
                <div v-if="coupon.appliesTo === 'Categories'">
                    <label for="categories" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Select Category</label>
                    <VueSelect :options="options" v-model="selected" multiple/>
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Usage Stats</label>
                    <input type="text" :value="`Used ${coupon.used || 0} of ${coupon.usageLimit || '∞'}`" disabled
                        class="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400" />
                </div>
            </div>
            <div class="flex justify-end gap-3 pt-6">
                <button type="button" @click="closeAddDialog"
                    class="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    Cancel
                </button>
                <button type="submit"
                    class="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold">
                    Create Coupon
                </button>
            </div>
        </form>
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import VueSelect from "vue-select"
import { useCoupon } from '@/composables/useCoupon';

const options = [ 'Car', 'Bike', 'Clothes', 'Electronics', 'Furniture' ]
const selected = ref<string[]>([])

const {
    coupon,
  addDialogOpen,
  closeAddDialog
} = useCoupon()


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