<template>
  <div class="h-screen w-68 bg-white dark:bg-gray-800 flex flex-col">
    <div class="flex items-center justify-between ">
      <div class="p-4 text-gray-800 dark:text-white">
        <h1 class="text-xl font-bold line">Store Name</h1>
        <p class="text-sm text-gray-500 font-semibold pt-2">Admin Panel</p>
      </div>
      <div :class="`text-${isDark ? 'white' : 'black'} pl-2`">
        <i :class="`mdi mdi-weather-${isDark ? 'sunny' : 'night'} text-2xl hover:text-yellow-400 mr-4`" @click="toggleDark"></i>
      </div>
    </div>
    <div class="border-t border-gray-300 dark:border-gray-500 mx-4"></div>
    <nav class="flex flex-col gap-4 py-3 px-4">
      <div v-for="group in menuGroups" :key="group.title">
        <div class="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2 ml-2">
          {{ group.title }}
        </div>
        <div class="flex flex-col gap-1 ml-4 mr-10">
          <RouterLink
            v-for="item in group.items"
            :key="item.name"
            :to="{ name: item.route }"
            class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 px-2 py-1 rounded-lg"
            active-class="bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:text-white"
          >
            <span :class="item.icon" class="text-sm md:text-lg"></span>
            <span>{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>
    <div class="flex-1"></div>
    <RouterLink
      :to="{ name: 'account' }"
      class="flex items-center space-x-2 mx-5 mb-6 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 px-3 py-2 rounded-lg "
    >
      <span class="mdi mdi-arrow-left text-xl mr-2"></span> Go Back to home
    </RouterLink>
  </div>
</template>

<script setup>
import { useSetting } from '@/composables/useSetting';

const {
  isDark,
  toggleDark
} = useSetting()

const menuGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', route: 'dashboard', icon: 'mdi mdi-home' },
      { name: 'Reports', route: 'reports', icon: 'mdi mdi-chart-bar' },
    ]
  },
  {
    title: 'Product Management',
    items: [
      { name: 'Products', route: 'products', icon: 'mdi mdi-package-variant-closed' },
      { name: 'Categories', route: 'category', icon: 'mdi mdi-shape-outline' },
      { name: 'Tags', route: 'tag', icon: 'mdi mdi-tag-outline' },
      { name: 'Coupons', route: 'coupons', icon: 'mdi mdi-ticket-percent' },
      { name: 'Sales', route: 'sales', icon: 'mdi mdi-sale' },
    ]
  },
  {
    title: 'Order & Payment',
    items: [
      { name: 'Orders', route: 'orders-list', icon: 'mdi mdi-list-box-outline' },
      { name: 'Payments', route: 'payment', icon: 'mdi mdi-cash' },
    ]
  },
  {
    title: 'User & Settings',
    items: [
      { name: 'Customers', route: 'customer', icon: 'mdi mdi-account-multiple-outline' },
      { name: 'Settings', route: 'setting', icon: 'mdi mdi-cog-outline' },
    ]
  }
];
</script>

<style scoped>
/* Optional: scrollbar styling */
nav::-webkit-scrollbar {
  width: 6px;
}
nav::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 10px;
}
</style>
