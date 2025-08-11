<template>
  <div class="flex flex-col max-w-md mx-auto px-4">
    <h1 class="text-lg md:text-xl font-bold text-center mb-4">My Profile</h1>

    <ProfileImage />

    <div class="space-y-4 mt-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
        <input type="text"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          v-model="auth.formData.name" :placeholder="auth.user?.name" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Date of birth</label>
          <input type="date" placeholder="YYYY-MM-DD"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            v-model="auth.formData.date_of_birth" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Gender</label>
          <select v-model="auth.formData.gender"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            style="padding: 0.7rem 0.5rem">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
        <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="10"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          v-model="auth.formData.phone" :placeholder="auth.user?.phone?.toString()" @input="
            auth.formData.phone = ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10)
            " />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
        <input type="email" v-model="auth.formData.email"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          :placeholder="auth.user?.email" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">New Password</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="auth.formData.password"
            class="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400 focus:outline-none">
            <span v-if="!showPassword" class="mdi mdi-eye"></span>
            <span v-else class="mdi mdi-eye-off"></span>
          </button>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Confirm New Password</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="auth.formData.password_confirmation"
            class="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400 focus:outline-none">
            <span v-if="!showPassword" class="mdi mdi-eye"></span>
            <span v-else class="mdi mdi-eye-off"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <SimpleBtn type="primary" title="Save Changes" @click="auth.updateProfile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileImage from '@/components/account/ProfileImage.vue'
import SimpleBtn from '@/components/buttons/SimpleBtn.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const showPassword = ref(false)

const auth = useAuthStore()

onMounted(() => {
  auth.initFormData()
})

</script>
