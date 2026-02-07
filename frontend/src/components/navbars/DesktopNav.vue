<template>
  <nav class="flex-1 flex justify-center">
    <RouterLink class="py-2 px-4" to="/">Home</RouterLink>
    <RouterLink class="py-2 px-4 ml-4" to="/explore">Explore</RouterLink>
    <!-- <RouterLink class="py-2 px-4 ml-4" to="/marketplace">Marketplace</RouterLink> -->
    <!-- <RouterLink class="py-2 px-4 ml-4" to="/account">Account</RouterLink> -->
    <RouterLink class="py-2 px-4 ml-4" to="/about">About</RouterLink>
    <RouterLink class="py-2 px-4 ml-4" to="/policy">Policy</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<style scoped>

@media screen and (min-width: 480px) {
  nav a.router-link-exact-active {
    color: #FF4D67;
    font-weight: 500;
    border-bottom: 3px solid #FF4D67;
  }

  nav a.router-link-exact-active:hover {
    color: #FF4D67; 
    border-bottom: 3px solid #FF4D67;

  }

  nav a:hover {
    color: #FF4D67;
    border-bottom: 3px solid #FF4D67;
    border-radius: 4px;
  }
}

</style>