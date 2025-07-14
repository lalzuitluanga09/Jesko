<template>
  <div class="flex h-screen relative overflow-hidden">
    <div
      :class="[
        'fixed inset-y-0 left-0 w-68 z-30 transform transition-transform duration-300 ease-in-out',
        showSidebar ? 'translate-x-0' : '-translate-x-full',
        'md:relative md:translate-x-0 md:z-0'
      ]"
    >
      <AdminNav />
    </div>

    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-black/10 z-20 md:hidden"
      @click="toggleSidebar"
    ></div>

    <div class="flex-1 flex flex-col w-full">
      <div class="flex items-center justify-between p-4 shadow bg-white dark:bg-gray-800 md:hidden">
        <button @click="toggleSidebar" class="text-gray-700 dark:text-white text-2xl">
          <span class="mdi mdi-menu"></span>
        </button>
        <h1>Admin Panel</h1>
        <h1>Test</h1>
      </div>
      <div class="flex-1 overflow-y-auto bg-gray-200 dark:bg-gray-700 p-2 md:p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminNav from '../components/AdminNav.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin';

const route = useRoute()

const { storeSlug } = useAdmin()


const showSidebar = ref(false);
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

onMounted(() => {
  storeSlug.value = route.params.storeslug
})

</script>

<style scoped>

</style>