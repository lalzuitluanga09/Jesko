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
      <span :class="`mdi mdi-weather-${isDark ? 'sunny' : 'night'} text-2xl hover:text-yellow-400 cursor-pointer`" @click="toggleDark"></span>
      <div v-if="auth.isAuthenticated" class="flex gap-4">
        <RouterLink :to="{ name: 'favourite' }" ><i class="mdi mdi-heart-outline text-2xl cursor-pointer hover:text-red-700"></i></RouterLink>
        <RouterLink v-if="!isMobile" :to="{ name: 'cart' }" ><i class="mdi mdi-shopping-outline text-2xl cursor-pointer hover:text-blue-700"></i></RouterLink>
        <RouterLink :to="{ name: 'notification' }" ><i class="mdi mdi-bell-outline text-2xl cursor-pointer hover:text-red-700"></i></RouterLink>
      </div>
      <div v-else>
        <button @click="auth.openDialog" class="bg-pink-500 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-pink-400 cursor-pointer">
          Sign in <span class="mdi mdi-arrow-right-circle text-lg"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSetting } from '@/composables/useSetting';
import DesktopNav from './navbars/DesktopNav.vue';
import MobileNav from './navbars/MobileNav.vue';
import { useAuthStore } from '@/stores/auth';

const {
  isDark,
  toggleDark,
  isMobile,
} =useSetting()

const auth = useAuthStore()

</script>

<style scoped>

</style>