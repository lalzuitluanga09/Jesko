<template>
  <div class="flex flex-col w-full max-w-4xl mx-auto px-2">
    <!-- Filters -->
     <OrderHeader />
     <OrderList />
  </div>
</template>

<script setup lang="ts">
import OrderHeader from '@/components/order/OrderHeader.vue';
import OrderList from '@/components/order/OrderList.vue';


</script>

<style scoped>
</style>
