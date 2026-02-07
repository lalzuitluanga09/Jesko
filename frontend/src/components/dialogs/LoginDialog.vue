<template>
  <Transition name="bounce">
    <div
      v-if="auth.isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-md z-50"
      @click.self="auth.closeDialog"
    >
      <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-lg p-6 mx-4 md:mx-0 w-full max-w-sm">
        <h2 class="text-xl font-semibold mb-4">
          {{ auth.isLogin ? 'Login' : 'Register' }}
        </h2>
  
        <form @submit.prevent="auth.isLogin ? auth.login() : auth.register()">
          <template v-if="!auth.isLogin">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Name</label>
              <input v-model="auth.formData.name" type="text" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 dark:border-gray-400 rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Phone *</label>
              <input v-model="auth.formData.phone" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="10" @input="auth.formData.phone = ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10)" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 dark:border-gray-400 rounded px-3 py-2" required />
            </div>
          </template>
  
          <!-- Shared fields -->
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Email</label>
            <input v-model="auth.formData.email" type="email" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 dark:border-gray-400 rounded px-3 py-2" required />
          </div>
  
          <div class="relative mb-4">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Password</label>
            <input v-model="auth.formData.password" :type="isPasswordVisible ? 'text' : 'password'" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 dark:border-gray-400 rounded px-3 py-2" required />
            <div  @click.stop ="isPasswordVisible = !isPasswordVisible"
                class="absolute bottom-2 right-0 px-3 cursor-pointer flex items-center text-gray-400 hover:text-black dark:hover:text-white">
                    <span v-if="!isPasswordVisible" class="mdi mdi-eye"></span>
                    <span v-else class="mdi mdi-eye-off"></span>
            </div>
          </div>
  
          <div class="mb-4" v-if="!auth.isLogin">
            <label class="block text-gray-700 dark:text-gray-400 text-sm mb-2">Confirm Password</label>
            <input v-model="auth.formData.password_confirmation" :type="isPasswordVisible ? 'text' : 'password'" class="w-full border hover:bg-pink-50 dark:hover:bg-gray-600 border-gray-500 dark:border-gray-400 rounded px-3 py-2" required />
          </div>
  
          <div class="flex justify-center items-center gap-4 mt-4">
            <SimpleBtn title="Cancel" type="outline" @click="auth.closeDialog" />
            <SimpleBtn :title="auth.isLogin ? 'Login' : 'Register'" type="primary" html-type="submit" :loading="auth.loading"/>
          </div>
  
          <p class="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            {{ auth.isLogin ? "Don't have an account?" : "Already have an account?" }}
            <button class="text-primary ml-1 underline cursor-pointer hover:text-primary-hover" type="button" @click="auth.toggleMode">
              {{ auth.isLogin ? 'Register' : 'Login' }}
            </button>
          </p>
        </form>
      </div>
    </div>
</Transition>
</template>



<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import SimpleBtn from '../buttons/SimpleBtn.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()
const isPasswordVisible = ref<boolean>(false)

const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    auth.closeDialog()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

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
