<template>
  <header class="w-full max-w-7xl mx-auto">
    <Navbar />
  </header>
  <main class="w-full max-w-7xl mx-auto">
    <RouterView />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

</script>

<style scoped>

</style>