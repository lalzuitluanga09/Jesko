<template>
  <Transition name="bounce">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-md z-50"
      @click.self="closeDialog"
    >
      <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 class="text-xl font-semibold mb-4">
          {{ isLogin ? 'Login' : 'Register' }}
        </h2>
  
        <form @submit.prevent="isLogin ? login() : logout()">
          <template v-if="!isLogin">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Name</label>
              <input v-model="formData.name" type="text" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Phone</label>
              <input v-model="formData.phone" type="tel" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 rounded px-3 py-2" required />
            </div>
          </template>
  
          <!-- Shared fields -->
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Email</label>
            <input v-model="formData.email" type="email" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 rounded px-3 py-2" required />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Password</label>
            <input v-model="formData.password" type="password" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 rounded px-3 py-2" required />
          </div>
  
          <div class="mb-4" v-if="!isLogin">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Confirm Password</label>
            <input v-model="formData.confirmPassword" type="password" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 rounded px-3 py-2" required />
          </div>
  
          <div class="flex justify-center items-center gap-4 mt-4">
            <SimpleBtn title="Cancel" type="outline" @click="closeDialog" />
            <SimpleBtn :title="isLogin ? 'Login' : 'Register'" type="primary" html-type="submit" :loading="loading"/>
          </div>
  
          <p class="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
            <button class="text-pink-600 dark:text-pink-400 ml-1 underline cursor-pointer hover:text-pink-700 dark:hover:text-pink-500" type="button" @click="toggleMode">
              {{ isLogin ? 'Register' : 'Login' }}
            </button>
          </p>
        </form>
      </div>
    </div>
</Transition>
</template>



<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import SimpleBtn from '../buttons/SimpleBtn.vue';

const {
    loading,
    formData,
    isOpen,
    isLogin,
    login,
    logout,
    toggleMode,
    closeDialog
} = useAuth()

</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
