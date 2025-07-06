<template>
    <nav class="fixed bottom-0 left-0 w-full bg-white/40 dark:bg-gray-700/80 backdrop-blur-xs flex justify-around items-center py-2 z-50 border-t">
      <RouterLink @click="switchTab('home')" class="py-2 px-4 flex-1 text-center" :to="{ name: 'home'}"><i class="mdi mdi-home-outline text-2xl"/></RouterLink>
      <RouterLink @click="switchTab('explore')" class="py-2 px-4 flex-1 text-center" :to="{ name: 'explore' }"><i class="mdi mdi-compass-outline text-2xl"/></RouterLink>
      <RouterLink @click="switchTab('marketplace')" class="py-2 px-4 flex-1 text-center" :to="{ name: 'marketplace' }"><i class="mdi mdi-storefront-outline text-2xl"/></RouterLink>
      <RouterLink @click="switchTab('cart')" class="py-2 px-4 flex-1 text-center" :to="{ name: 'cart' }"><i class="mdi mdi-shopping-outline text-2xl"/></RouterLink>
      <RouterLink @click="switchTab('account')" class="py-2 px-4 flex-1 text-center" :to="{ name: 'account' }"><i class="mdi mdi-account-circle-outline text-2xl"/></RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useTabRoutes } from '@/composables/useTabRoutes';
import { ref } from 'vue';

const router = useRouter()
const currentTab = ref('')

const { saveRoute, getRoute } = useTabRoutes()

function switchTab(tabName: string) {
  // Save route if leaving marketplace or account
  if (currentTab.value === 'marketplace' || currentTab.value === 'account') {
    saveRoute(currentTab.value)
  }

  currentTab.value = tabName

  if (tabName === 'marketplace' || tabName === 'account') {
    const targetRoute = getRoute(tabName)
    router.push(targetRoute)
  } else {
    return;
  }
}
</script>


<style scoped>
  nav a.router-link-exact-active {
    color: palevioletred;
    border-bottom: 1px solid palevioletred;
  }

</style>