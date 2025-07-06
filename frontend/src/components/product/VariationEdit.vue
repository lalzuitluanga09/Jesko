<template>
  <div v-if="productVariations.length" class="overflow-x-auto py-6 cursor-default">
    <div class="pb-2">
      <h1>Variations Data</h1>
    </div>
    <table class="min-w-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <thead>
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b"
          >
            {{ header }}
          </th>
          <th class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b">
            Price
          </th>
          <th class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b">
            Stock
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(variation, index) in productVariations"
          :key="variation.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td
            v-for="header in tableHeaders"
            :key="header"
            class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-100 border-b border-gray-300"
          >
            {{ variationDisplayValue(variation, header) }}
          </td>
          <td class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-100 border-b border-gray-300">
            ₹ <input
              type="number"
              class="w-24 px-2 py-1 border border-gray-300 rounded"
              v-model.number="updatedStocks[variation.id].price"
            />
          </td>
          <td class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-100 border-b border-gray-300">
            <input
              type="number"
              class="w-24 px-2 py-1 border border-gray-300 rounded"
              v-model.number="updatedStocks[variation.id].stock"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProduct } from '@/composables/useProduct'

const { productVariations, updatedStocks } = useProduct()

const tableHeaders = computed(() => {
  if (productVariations.value.length === 0) return []
  const first = productVariations.value[0]
  return [
    ...Object.keys(first.attributes || {}),
    // 'sku'
  ]
})

const variationDisplayValue = (variation: any, key: string) => {
  if (key in variation.attributes) return variation.attributes[key]
  return variation[key]
}

</script>
