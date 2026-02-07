<template>
  <LoginMessage title="Welcome to Your Account" v-if="!auth.isAuthenticated"/>
   <div v-else>
       <div class="flex justify-center">
          <h1 class="text-xl font-bold py-4">My Account</h1>
      </div>
      <ProfileImage />
      <div class="flex flex-col w-full max-w-2xl justify-center mx-auto mt-10 px-4 md:px-0 border border-gray-200 dark:border-bg-soft-dark rounded-xl overflow-hidden">
        <SettingLink title="Orders" icon="mdi mdi-list-box-outline" to="orders"  :badge="auth.userMeta.pendingOrders"/>
        <SettingLink title="Followings" icon="mdi mdi-store-check-outline" to="following"/>
        <SettingLink title="Profile" icon="mdi mdi-account-outline" to="profile"/>
        <SettingLink title="Addresses" icon="mdi mdi-map-marker-outline" to="address"/>
        <!-- <SettingLink title="Marketplace" icon="mdi mdi-storefront-outline" to="marketplace"/> -->
        <SettingLink title="My Stores" icon="mdi mdi-store-cog-outline" to="myStores" v-if="auth.isStoreUser"/>
        <SettingLink title="Logout" icon="mdi mdi-location-exit" to="logout"/>
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
