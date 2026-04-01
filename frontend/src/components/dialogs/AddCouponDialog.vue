<template>
  <div>
    <div v-if="addDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10"></div>
    <Transition name="slide">
      <div
        v-if="addDialogOpen"
        class="fixed inset-0 flex items-center justify-end z-20"
        @click.self="closeAddDialog"
      >
        <div
          class="bg-white dark:bg-gray-700 w-full max-w-4xl p-8 rounded-lg shadow-xl overflow-y-auto"
        >
          <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{{ selectedCoupon ? 'Edit' : 'Add' }} Coupon</h1>
          <form class="space-y-6" @submit.prevent="selectedCoupon ? update() : save()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Code</label
                >
                <input
                  type="text"
                  v-model="couponForm.code"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  placeholder="e.g., SUMMER15"
                />
              </div>
              <div class="col-span-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                  for="description"
                  >Description</label
                >
                <textarea
                  id="description"
                  rows="3"
                  v-model="couponForm.description"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Enter short description"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Discount Type</label
                >
                <select
                  v-model="couponForm.discountType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label
                  for="discountAmount"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >Discount {{ couponForm.discountType === 'percentage' ? '%' : 'Amount' }}</label
                >
                <input
                  id="discountAmount"
                  type="number"
                  v-model.number="couponForm.discountValue"
                  required
                  class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :placeholder="couponForm.discountType === 'percentage' ? 'e.g. 10%' : 'e.g. ₹100'"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Min Order Value (₹)</label
                >
                <input
                  type="number"
                  v-model.number="couponForm.minOrderValue"
                  required
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="e.g., 15 or 100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Max Discount Value (₹)</label
                >
                <input
                  type="number"
                  v-model.number="couponForm.maxDiscountValue"
                  required
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="e.g., 15 or 100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Usage Limit</label
                >
                <input
                  type="number"
                  v-model.number="couponForm.usageLimit"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Total uses (optional)"
                />
              </div>
                            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Per User Limit</label
                >
                <input
                  type="number"
                  v-model.number="couponForm.perUserLimit"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Total uses (optional)"
                />
              </div>
                <div>
                  <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Start
                    Date</label>
                    <VueDatePicker
                      v-model="couponForm.startAt"
                      :dark="isDark"
                      :enable-time-picker="true"
                      week-start="0"
                      auto-apply
                      :is-24="false"
                      time-picker-inline
                      :start-time="{ hours: 0, minutes: 0 }"
                      format="dd/MM/yyyy hh:mm aa"
                      placeholder="Select Start Date"
                  />
                </div>
                <!-- End Date -->
                <div>
                  <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">End
                    Date</label>
                    <VueDatePicker
                      v-model="couponForm.endAt"
                      :dark="isDark"
                      :enable-time-picker="true"
                      week-start="0"
                      auto-apply
                      :is-24="false"
                      time-picker-inline
                      :start-time="{ hours: 23, minutes: 59 }"
                      format="dd/MM/yyyy hh:mm aa"
                      placeholder="Select End Date"
                  />
                </div>
              <div >
                <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
                  >Usage Stats</label
                >
                <input
                  type="text"
                  :value="`Used ${couponForm.usedCount || 0} of ${couponForm.usageLimit || '∞'}`"
                  disabled
                  class="w-full px-3 py-2 border rounded bg-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                />
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-6">
              <button
                type="button"
                @click="closeAddDialog"
                class="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
              >
                {{ selectedCoupon ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useCoupon } from '@/composables/useCoupon'
import { useSetting } from '@/composables/useSetting';
import VueDatePicker from '@vuepic/vue-datepicker';

const {isDark} = useSetting()

const { 
  couponForm, 
  addDialogOpen,
  selectedCoupon,
  closeAddDialog,
  save,
  update,
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
