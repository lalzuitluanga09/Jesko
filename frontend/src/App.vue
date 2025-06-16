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
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
import { useSetting } from './composables/useSetting';
import Footer from './components/Footer.vue';

const { checkScreenWidth } = useSetting()

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);
</script>

<style>

body {
  margin: 0 2%;
}

/* @media screen and (min-width: 1280px) {
  body {
    margin: 0 5%;
  }
}

@media screen and (min-width: 1440px) {
  body {
    margin: 0 10%;
  }
} */

</style>
