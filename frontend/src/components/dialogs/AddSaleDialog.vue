<template>
  <div>
    <div v-if="addDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
    </div>
    <Transition name="slide">
      <div v-if="addDialogOpen" class="fixed inset-0 flex items-center justify-end z-20" @click.self="closeAddDialog">
        <div class="bg-white dark:bg-gray-700 w-full max-w-4xl p-8 rounded-lg shadow-lg">
          <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{{ selectedSale ? 'Edit Sale' : 'New Sale' }}</h1>
          <form class="space-y-6" @submit.prevent="selectedSale ? update() : save()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Sale
                  Name</label>
                <input id="name" type="text" v-model="saleForm.name" required
                  class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="e.g. Summer Sale" />
              </div>
              <!-- Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Type</label>
                <select id="type" v-model="saleForm.type" required
                  class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  <option value="flash">Flash</option>
                  <option value="special">Special</option>
                  <option value="clearance">Clearance</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>
              <!-- Description -->
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                  for="description">Description</label>
                <textarea id="description" rows="3" v-model="saleForm.description"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Enter short description"></textarea>
              </div>
              <!-- Start Date -->
              <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Start
                  Date</label>
                  <VueDatePicker
                    v-model="saleForm.startDate"
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
                    v-model="saleForm.endDate"
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
              <!-- Discount Type -->
              <div>
                <label for="discountType"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Discount Type</label>
                <select id="discountType" v-model="saleForm.discountType" required
                  class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="bogo">Buy X Get Y</option>
                </select>
              </div>
              <div v-if="saleForm.discountType === 'bogo'" class="flex gap-2 items-center">
                <div>
                    <label for="bogoX" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Buy X</label>
                    <input id="bogoX" type="number" min="1" v-model="saleForm.bogoX"
                      class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="X" />
                </div>
                <div>
                    <label for="bogoX" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Get Y</label>
                  <input id="bogoY" type="number" min="1" v-model="saleForm.bogoY"
                    class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Y" />
                </div>
              </div>
              <!-- Discount Amount -->
              <div v-else>
                <label for="discountAmount"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Discount {{ saleForm.discountType === 'percentage' ? '%' : 'Amount' }}</label>
                <input id="discountAmount" type="text" v-model="saleForm.discountValue" required
                  class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  :placeholder="saleForm.discountType === 'percentage' ? 'e.g. 10%' : 'e.g. ₹100'" />
              </div>
              <!-- Apply To -->
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Apply Discount To</label>
                <div class="flex flex-wrap gap-2 text-sm">
                  <label class="flex items-center cursor-pointer group">
                    <input type="radio" value="all" v-model="saleForm.applyTo" class="peer sr-only" />
                    <span class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 font-medium transition-all duration-200
                        peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                         hover:border-blue-600 dark:hover:bg-gray-700">
                      All Products
                    </span>
                  </label>
                  <label class="flex items-center cursor-pointer group">
                    <input type="radio" value="individual" v-model="saleForm.applyTo" class="peer sr-only" />
                    <span class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 font-medium transition-all duration-200
                        peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                         hover:border-blue-600 dark:hover:bg-gray-700">
                      Individual Products
                    </span>
                  </label>
                  <label class="flex items-center cursor-pointer group">
                    <input type="radio" value="categories" v-model="saleForm.applyTo" class="peer sr-only" />
                    <span class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 font-medium transition-all duration-200
                        peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                         hover:border-blue-600 dark:hover:bg-gray-700">
                      Categories
                    </span>
                  </label>
                </div>
              </div>
              <div v-if="saleForm.applyTo === 'all'" class="md:col-span-2">
                <label for="selectedProducts"
                  class="block text-sm font-medium text-green-500 dark:text-green-300 mb-2">
                  <span class="mdi mdi-check-all"></span> Discount will be applied to all products.
                </label>
              </div>
              <div v-if="saleForm.applyTo === 'individual'" class="md:col-span-2">
                <label for="selectedProducts"
                  class="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Select Products</label>
                <VueSelect :options="allProducts" v-model="saleForm.selectedProducts" multiple
                  :reduce="(product: { id: number }) => product.id" label="name" />
              </div>
              <div v-if="saleForm.applyTo === 'categories'" class="md:col-span-2">
                <label for="selectedCategories"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Select Categories</label>
                <VueSelect :options="allCategories" v-model="saleForm.selectedCategories" multiple
                  :reduce="(category: { id: number }) => category.id" label="name" />
              </div>
              <div class="flex items-center pt-1">
                <input
                  id="isDraft"
                  type="checkbox"
                  v-model="isDraft"
                  class="sr-only"
                />

                <label
                  for="isDraft"
                  :class="[
                    'flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium cursor-pointer transition-all duration-200',
                    isDraft
                      ? 'bg-blue-100 text-blue-600 ring-1 ring-blue-200 dark:bg-blue-800/60 dark:text-white'
                      : 'ring-1 ring-gray-300 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-blue-900'
                  ]"
                >
                  <i
                    :class="[
                      'mdi text-lg',
                      isDraft ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'
                    ]"
                  ></i>

                  Save as Draft
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-6">
              <button type="button" @click="closeAddDialog"
                class="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition">
                Cancel
              </button>
              <button type="submit"
                class="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold cursor-pointer">
                {{ selectedSale ? 'Update' : 'Create' }}
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
import VueDatePicker from '@vuepic/vue-datepicker';
import { useSetting } from '@/composables/useSetting';
import VueSelect from "vue-select"
import { computed } from 'vue';

const {
  allProducts,
  allCategories,
  saleForm,
  selectedSale,
  addDialogOpen,
  closeAddDialog,
  save,
  update
} = useSale()

const { isDark } = useSetting()

const isDraft = computed({
  get: () => saleForm.value.status === 'draft',
  set: (val) => {
    saleForm.value.status = val ? 'draft' : 'active'
  }
})

</script>

<style scoped>
:deep() {
  --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: white;
  --vs-selected-color: black;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}

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