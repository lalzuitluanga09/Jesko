<template>
  <div class="h-6 rounded-b-xl bg-primary flex justify-center items-center">
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
      <span :class="`mdi mdi-weather-${isDark ? 'sunny' : 'night'} text-2xl hover:text-accent cursor-pointer`" @click="toggleDark"></span>
      <div v-if="auth.isAuthenticated" class="flex items-center gap-4">
        <RouterLink :to="{ name: 'favourite' }" ><i title="Wistlist" class="mdi mdi-heart-outline text-2xl cursor-pointer hover:text-primary-hover"></i></RouterLink>
        <RouterLink v-if="!isMobile" :to="{ name: 'cart' }" ><i title="Cart" class="mdi mdi-shopping-outline text-2xl cursor-pointer hover:text-primary-hover"></i></RouterLink>
        <!-- <RouterLink v-if="!isMobile" :to="{ name: 'account' }" ><i title="Account" class="mdi mdi-account-circle text-2xl cursor-pointer hover:text-primary-hover"></i> </RouterLink> -->
        <RouterLink v-if="!isMobile" title="account" :to="{ name: 'account' }" class="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <div class="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-800 dark:text-gray-100">
            {{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U' }}
          </div>
          <div class="hidden md:flex flex-col leading-tight">
            <span class="text-sm font-medium">{{ auth.user?.name || 'Account' }}</span>
          </div>
          <i class="mdi mdi-chevron-down ml-1 text-lg hidden md:inline"></i>
        </RouterLink>
        <!-- <RouterLink :to="{ name: 'notification' }" ><i class="mdi mdi-bell-outline text-2xl cursor-pointer hover:text-red-700"></i></RouterLink> -->
      </div>
      <div v-else>
        <button @click="auth.openDialog" class="bg-primary text-white px-3 py-1.5 text-sm md:text-base rounded-lg hover:bg-primary-hover cursor-pointer">
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