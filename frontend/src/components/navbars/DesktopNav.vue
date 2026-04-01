<template>
  <nav class="flex-1 flex justify-center items-center relative">
  <RouterLink class="p-2" to="/">Home</RouterLink>
  <RouterLink class="p-2 ml-4" to="/explore">Explore</RouterLink>
  <RouterLink v-if="auth.isAuthenticated" class="p-2 ml-4" :to="{ name: 'followings' }">Followings</RouterLink>
  <!-- <RouterLink class="p-2 ml-4" to="/marketplace">Marketplace</RouterLink> -->

  <div class="relative ml-4 group z-10">
    <!-- Hover container -->
    <div class="p-2 flex items-center gap-1 cursor-pointer">
      More
      <i class="mdi mdi-chevron-down text-sm"></i>
    </div>
    <!-- Dropdown -->
    <div
      class="absolute left-0 top-full w-28 bg-white dark:bg-bg-soft-dark
            border border-gray-200 dark:border-gray-700 rounded-lg shadow-md
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-opacity duration-150"
    >
      <RouterLink class="block p-2 text-sm hover:bg-primary/10 rounded-t-lg" to="/about"> About </RouterLink>
      <RouterLink class="block p-2 text-sm hover:bg-primary/10 rounded-b-lg" to="/policy" > Policy </RouterLink>
    </div>
  </div>
</nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const auth = useAuthStore()

</script>

<style scoped>

@media screen and (min-width: 480px) {
  nav a.router-link-exact-active {
    color: var(--color-primary);
    font-weight: 500;
    border-bottom: 3px solid var(--color-primary);
  }

  nav a.router-link-exact-active:hover {
    color: var(--color-primary); 
    border-bottom: 3px solid var(--color-primary);

  }

  nav a:hover {
    color: var(--color-primary);
    border-bottom: 3px solid var(--color-primary);
    border-radius: 4px;
  }
}

</style>