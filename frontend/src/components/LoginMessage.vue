<template>
    <div class="w-full min-h-[600px] flex items-center justify-center px-4">
  <div class="p-8 flex flex-col items-center gap-4 max-w-md w-full transition-all">
    <h2 class="text-3xl font-bold text-center">
      {{ title }}
    </h2>
    <p class="text-gray-600 dark:text-gray-400 text-center">
      You need to sign in to view this page.
    </p>
    <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
      Don't have an account? Please log in to continue, or register to create a new one.
    </p>

    <div class="flex flex-col gap-4 mt-4 w-full">
      <div class="flex flex-col sm:flex-row md:justify-center gap-4 w-full">
        <SimpleBtn title="Login" type="primary" @click="auth.openDialog" />
        <SimpleBtn title="Register" type="outline" @click="auth.openRegisterDialog" />
      </div>
    </div>
  </div>
</div>
    <LoginDialog />

</template>

<script setup lang="ts">
import SimpleBtn from './buttons/SimpleBtn.vue';
import LoginDialog from './dialogs/LoginDialog.vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  title: string,
}>();

const auth = useAuthStore()


</script>
