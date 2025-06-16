<template>
  <div class="flex flex-col max-w-md mx-auto px-4">
    <h1 class="text-lg md:text-xl font-bold text-center mb-4">My Profile</h1>

    <ProfileImage />

    <div class="space-y-4 mt-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
        <input
          type="text"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
        <input
          type="text"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          placeholder="+91 9876543210"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
        <input
          type="email"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          placeholder="email@example.com"
        />
      </div>
        <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">New Password</label>
            <div class="relative">
            <input
                :type="showPassword ? 'text' : 'password'"
                class="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
            >
                {{ showPassword ? 'Hide' : 'Show' }}
            </button>
            </div>
        </div>
                <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-400">Confirm New Password</label>
            <div class="relative">
            <input
                :type="showPassword ? 'text' : 'password'"
                class="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
            >
                {{ showPassword ? 'Hide' : 'Show' }}
            </button>
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-6">
        <SimpleBtn type="primary" title="Update"/>
    </div>
  </div>
</template>


<script setup lang="ts">
import ProfileImage from '@/components/account/ProfileImage.vue';
import SimpleBtn from '@/components/buttons/SimpleBtn.vue';
import { ref } from 'vue';

const showPassword = ref(false)


</script>

<style scoped>

</style>