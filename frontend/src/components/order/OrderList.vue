<template>
  <div v-for="order in myOrders" :key="order.data.id" @click="openDialog(order); updateOrderStatus()"
    class="rounded-2xl p-4 mb-3 shadow hover:scale-105 transition cursor-pointer border border-gray-200 dark:border-gray-600 dark:bg-gray-800">
    <div class="flex gap-4 items-center">
      <!-- Product / Store Image -->
      <img src="/images/product.png" alt="product"
        class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border" />

      <div class="flex flex-col gap-2 w-full">
        <!-- Order Meta -->
        <div class="flex justify-between text-xs md:text-sm text-gray-500 dark:text-gray-400">
          <p>#{{ order.data.order_number }}</p>
          <p>{{ formatToDatetime(order.data.placed_at) }}</p>
        </div>

        <!-- Products -->
        <div class="flex items-center justify-between">
          <h2 class="text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 line-clamp-1 mr-4">
            {{order.orderItems.map(item => item.product_name).join(', ')}}
          </h2>
          <div class="flex ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
            <span class="mdi mdi-package-variant-closed pr-0.5"></span>{{ order.orderItems.length }}
          </div>
        </div>

        <!-- Store -->
        <p class="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          From <span class="font-medium">{{ order.store.name }}</span>
        </p>

        <!-- Status -->
         <div >
            <p :class="[
            'inline-block text-xs px-2 py-1 rounded-lg capitalize',
            order.data.status === 'pending'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-green-100 text-green-700'
          ]">
            {{ order.data.status }}
          </p>
         </div>
      </div>
    </div>
  </div>


  <!-- Pagination -->
  <div v-if="pagination.last_page > 1" class="mt-6 flex justify-center items-center space-x-2">
    <button @click="getOrders(pagination.current_page - 1)" :disabled="pagination.current_page === 1"
      class="px-3 py-1 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
      Prev
    </button>
    <span>Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
    <button @click="getOrders(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page"
      class="px-3 py-1 border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
      Next
    </button>
  </div>

  <OrderDetailDialog />

</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import OrderDetailDialog from '../dialogs/OrderDetailDialog.vue';
import { formatToDatetime } from '@/lib/formatDate';

const {
  myOrders,
  pagination,
  openDialog,
  getOrders,
  updateOrderStatus,
} = useOrder()

</script>

<style scoped></style>