<template>
    <nav class="fixed bottom-0 left-0 w-full bg-white/40 dark:bg-gray-700/80 backdrop-blur-xs flex justify-around items-center py-2 z-50 border-t">
      <RouterLink class="py-2 px-4 flex-1 text-center" to="/"><i class="mdi mdi-home-outline text-2xl"/></RouterLink>
      <RouterLink class="py-2 px-4 flex-1 text-center" :to="{ name: 'explore' }"><i class="mdi mdi-compass-outline text-2xl"/></RouterLink>
      <RouterLink class="py-2 px-4 flex-1 text-center" :to="{ name: 'marketplace' }"><i class="mdi mdi-storefront-outline text-2xl"/></RouterLink>
      <RouterLink class="py-2 px-4 flex-1 text-center" :to="{ name: 'cart' }"><i class="mdi mdi-shopping-outline text-2xl"/></RouterLink>
      <RouterLink class="py-2 px-4 flex-1 text-center" :to="{ name: 'account' }"><i class="mdi mdi-account-circle-outline text-2xl"/></RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'


</script>

<style scoped>
  nav a.router-link-exact-active {
    color: palevioletred;
    border-bottom: 1px solid palevioletred;
  }

</style>