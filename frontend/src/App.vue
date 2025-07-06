<template>
  <RouterView />
  <Notify/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSetting } from './composables/useSetting';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Notify from './components/notification/Notify.vue';

const { checkScreenWidth } = useSetting()

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

const auth = useAuthStore()

onMounted(() => {
  auth.checkAuth()
})

</script>

<style>

@media screen and (max-width: 530px) {
  body {
    margin: 0 2%;
  }
}

</style>
