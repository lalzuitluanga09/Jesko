<template>
  <LoginMessage title="Welcome to Your Account" v-if="!auth.isAuthenticated"/>
   <div v-else>
       <div class="flex justify-center">
          <h1 class="text-xl font-bold py-4">My Account</h1>
      </div>
      <ProfileImage />
      <div class="flex flex-col gap-1 w-full max-w-2xl justify-center mx-auto mt-10 px-4 md:px-0">
        <SettingLink title="Orders" icon="mdi mdi-list-box-outline" to="orders"  badge="12"/>
        <SettingLink title="Followings" icon="mdi mdi-storefront-outline" to="following"/>
        <SettingLink title="Profile" icon="mdi mdi-account-outline" to="profile"/>
        <SettingLink title="Addresses" icon="mdi mdi-map-marker-outline" to="address"/>
        <SettingLink title="Logout" icon="mdi mdi-location-exit" to="logout"/>
      </div>
      <div class="text-center mt-12">
        <RouterLink :to="{name:'dashboard'}" class="bg-blue-100 dark:text-blue-700 px-4 py-2 rounded-2xl hover:bg-blue-200 hover:text-blue-800 transition-colors">
          <span class="mdi mdi-shield-home text-xl"></span>
          Go to Admin Panel 
        </RouterLink>
      </div>
   </div>
</template>

<script setup lang="ts">
import ProfileImage from '@/components/account/ProfileImage.vue';
import SettingLink from '@/components/account/SettingLink.vue';
import LoginMessage from '@/components/LoginMessage.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

</script>
