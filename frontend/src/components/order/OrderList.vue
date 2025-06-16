<template>
  <div v-for="order in paginatedOrders" :key="order.id" @click="openDialog"
    class="border border-gray-400 rounded-xl p-2 md:p-4 mb-2 ">
    <div class="flex items-center gap-2 md:gap-4">
      <img :src="order.thumbnail" alt="product" class="w-18 h-20 md:w-24 md:h-24 object-cover rounded-md" />
      <div class="flex flex-col gap-0.5 md:gap-2 w-full">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Delivery by {{ order.date }}
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h2 class="text-base md:text-lg font-medium line-clamp-2">
              {{ order.productName }}
            </h2>
            <span class="px-1 md:px-2 bg-gray-400 text-white text-xs md:text-sm rounded-full ml-1">2</span>
          </div>
          <div>
              <span class="mdi mdi-chevron-right text-2xl"></span>
          </div>
        </div>
        <div>
          <p v-if="order.status == 'pending'"
            class="inline-block text-sm text-orange-700 capitalize px-2 py-1 bg-orange-100 rounded-lg">
            {{ order.status }}
          </p>
          <p v-else class="inline-block text-sm text-green-700 capitalize px-2 py-1 bg-green-100 rounded-lg">
            {{ order.status }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <!-- <div class="mt-6 flex justify-center items-center space-x-2">
    <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border rounded-md">
      Prev
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded-md">
      Next
    </button>
  </div> -->

  <OrderDetailDialog />

</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import OrderDetailDialog from '../dialogs/OrderDetailDialog.vue';

const {
  openDialog,
  paginatedOrders,
  currentPage,
  totalPages
} = useOrder()

</script>

<style scoped></style>