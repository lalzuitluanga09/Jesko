<template>
  <div class="h-6 rounded-b-xl bg-pink-400 flex justify-center items-center">
    <p class="text-xs text-gray-100 cursor-default">Welcome</p>
  </div>
  <div class="flex items-center justify-between px-4 py-6 md:py-8">
    <div class="flex items-center">
      <!-- <img src="" alt="Logo" class="h-10 w-10 mr-3" /> -->
      <RouterLink to="/">
        <span class="text-xl md:text-2xl font-bold">Jesko Shop</span>
      </RouterLink>
    </div>
    <DesktopNav v-if="!isMobile" />
    <MobileNav v-else />
    <div class="flex items-center gap-4">
      <i :class="`mdi mdi-weather-${mode} text-2xl hover:text-yellow-400`" @click="toggleDark"></i>
      <i class="mdi mdi-heart-outline text-2xl cursor-pointer hover:text-red-700"></i>
      <RouterLink v-if="!isMobile" :to="{ name: 'cart' }" ><i class="mdi mdi-shopping-outline text-2xl cursor-pointer hover:text-blue-700"></i></RouterLink>
      <i class="mdi mdi-bell-outline text-2xl cursor-pointer hover:text-red-700"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSetting } from '@/composables/useSetting';
import DesktopNav from './navbars/DesktopNav.vue';
import MobileNav from './navbars/MobileNav.vue';

const {
  mode,
  toggleDark,
  isMobile,
} =useSetting()

</script>

<style scoped>

</style>