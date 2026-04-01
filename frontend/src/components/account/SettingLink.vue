<template>
    <div @click="goTo"
        class="flex justify-between items-center gap-2 border-gray-100 dark:border-bg-soft-dark border-2 px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors cursor-pointer">
        <div class="flex gap-4 items-center">
            <i :class="icon" class="text-xl text-gray-500"></i>
            <span class="text-base font-medium text-gray-800 dark:text-white/50">{{ title }}</span>
            <span v-if="badge !== undefined" class="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
                {{ badge }}
            </span>
        </div>
        <i class="mdi mdi-arrow-right text-xl text-gray-500"></i>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
    title: string,
    icon: string,
    badge?: string | number,
    to: string
}>();

const auth = useAuthStore()

const routeMap: Record<string, string | (() => void)> = {
  logout: () => auth.logout(),
  orders: 'orders',
  profile: 'profile',
  address: 'addresses',
  following: 'followings',
  myStores: 'my-stores',
  marketplace: 'my-marketplace'
}

const goTo = () => {
  const target = routeMap[props.to]

  if (typeof target === 'function') {
    target()
  } else if (typeof target === 'string') {
    router.push({ name: target }).catch(err => {
      console.error("Navigation error:", err);
    })
  } else {
    router.push(props.to)
  }
}

</script>

<style scoped>

</style>