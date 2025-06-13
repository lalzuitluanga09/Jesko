<template>
    <nav class="flex-1 flex justify-center">
      <RouterLink class="py-2 px-4" to="/">Home</RouterLink>
      <RouterLink class="py-2 px-4 ml-4" :to="{ name: 'explore' }">Explore</RouterLink>
      <RouterLink class="py-2 px-4 ml-4" :to="{ name: 'marketplace' }">Marketplace</RouterLink>
      <RouterLink class="py-2 px-4 ml-4" :to="{ name: 'account' }">Account</RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<style scoped>

@media screen and (min-width: 480px) {
  nav a.router-link-exact-active {
    color: black;
    font-weight: 500;
    border-bottom: 3px solid black;
  }

  nav a.router-link-exact-active:hover {
    color: black;
    background-color: whitesmoke;
    border-bottom: 3px solid black;

  }

  nav a:hover {
    background-color: whitesmoke;
    color: black;
    border-bottom: 3px solid white;
    border-radius: 4px;
  }
}

</style>