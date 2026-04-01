<template>
  <div :class="`w-full border border-${storeData.data?.theme}-300 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-sm dark:bg-bg-soft-dark relative`">


     <!-- Sale Badge -->
    <div class="absolute top-3 left-3 z-20" v-if="storeData.data?.active_sale">
      <div class="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-2xl border border-white/30 shadow-lg">
        <i class="mdi mdi-creation text-white text-sm opacity-90"></i>
        <h1 class="text-sm font-semibold text-white tracking-wide">
          {{ storeData.data.active_sale }}
        </h1>
      </div>
    </div>

    <!-- Cover -->
    <div :class="`h-20 sm:h-28 bg-${storeData.data?.theme}-200 dark:bg-${storeData.data?.theme}-600 relative`">
      <img
        v-if="storeData.data?.cover_image"
        :src="storageUrl(storeData.data.cover_image)"
        alt="Store Cover Image"
        class="absolute top-0 left-0 w-full h-20 sm:h-28 object-cover"
      />
    </div>

    <!-- Logo -->
    <div class="absolute top-14 left-4 sm:left-8 z-10">
      <img
        :src="storeData.data?.logo ? storageUrl(storeData.data.logo) : '/images/logo.png'"
        alt="Store Logo"
        :class="`w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-${storeData.data?.theme}-300 shadow-md object-cover`"
      />
    </div>

    <!-- Header -->
    <div class="pl-26 pr-8 sm:pl-40 sm:pr-12 pt-4 pb-4 sm:pb-6 flex flex-col gap-3">
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <!-- Store info -->
        <div class="flex-1 flex flex-col gap-1">
          <h1 :class="`text-${storeData.data?.theme || 'gray'}-500 text-lg sm:text-2xl font-semibold leading-tight line-clamp-2`">
            {{ storeData.data?.name }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-300 md:line-clamp-2 line-clamp-1">
            {{ storeData.data?.description }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Owner: {{ storeData.owner?.name }}
          </p>

          <!-- Mobile toggle -->
          <button
            class="sm:hidden text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-2"
            @click="mobileOpen = !mobileOpen"
          >
            <span>{{ mobileOpen ? 'Hide details' : 'Show details' }}</span>
            <i :class="mobileOpen ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"></i>
          </button>
        </div>

        <!-- Desktop stats + follow -->
        <div class="hidden sm:flex items-center gap-6">
          <div class="flex gap-6 items-center">
            <span class="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
              <i class="mdi mdi-account"></i>{{ storeData.data?.followers_count }}
            </span>
            <span class="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
              <i class="mdi mdi-package-variant-closed"></i>{{ storeData.data?.products_count }}
            </span>
          </div>

          <button v-if="auth.isAuthenticated && storeData.data?.id"
            @click.stop="handleFollow(storeData.data.id)"
            :class="`text-sm text-gray-600 dark:text-gray-300 cursor-pointer border border-${storeData.data?.theme}-400 px-3 py-1 rounded-full hover:bg-${storeData.data?.theme}-100 dark:hover:text-${storeData.data?.theme}-600 flex items-center gap-1`"
          >
            <span>{{ isFollowing ? 'Following' : 'Follow' }}</span>
            <i v-if="isFollowing" class="mdi mdi-check-all"></i>
            <i v-else class="mdi mdi-plus"></i>
          </button>
        </div>

        <!-- Desktop social -->
        <div class="hidden sm:flex items-center gap-3 text-xl">
          <span title="Instagram page" class="flex items-center mdi mdi-instagram text-pink-600 hover:text-pink-700 cursor-pointer bg-pink-100  hover:bg-pink-200 px-1 rounded-full">
            <span class="px-1 text-xs">Instagram</span>
          </span>
          <span title="facebook page" class="flex items-center mdi mdi-facebook text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-100 hover:bg-blue-200 px-1 rounded-full">
            <span class="px-1 text-xs">Facebook</span>
          </span>
          <span title="chat on whatsapp" class="flex items-center mdi mdi-whatsapp text-green-600 hover:text-green-700 cursor-pointer bg-green-100 hover:bg-green-200 px-1 rounded-full">
            <span class="px-1 text-xs">WhatsApp</span>
          </span>
        </div>
      </div>

      <!-- Mobile accordion -->
      <div
        v-show="mobileOpen"
        class="sm:hidden mt-3 border-t pt-3 -mx-4 pl-4 pr-4 space-y-3"
      >
        <div class="flex justify-between text-sm text-gray-700 dark:text-gray-200">
          <span class="flex items-center gap-1">
            <i class="mdi mdi-account"></i>{{ storeData.data?.followers_count }} Followers
          </span>
          <span class="flex items-center gap-1">
            <i class="mdi mdi-package-variant-closed"></i>{{ storeData.data?.products_count }} Products
          </span>
        </div>

        <button
          v-if="auth.isAuthenticated && storeData.data?.id"
          @click.stop="handleFollow(storeData.data.id)"
          :class="`w-full text-sm border border-${storeData.data?.theme}-400 py-2 rounded-full cursor-pointer flex justify-center items-center gap-1 hover:bg-${storeData.data?.theme}-100 dark:hover:text-${storeData.data?.theme}-600`"
        >
          <span>{{ isFollowing ? 'Following' : 'Follow' }}</span>
          <i v-if="isFollowing" class="mdi mdi-check-all"></i>
          <i v-else class="mdi mdi-plus"></i>
        </button>
        <div class="flex justify-center gap-4 text-xl">
          <span class="mdi mdi-instagram text-pink-600 cursor-pointer"></span>
          <span class="mdi mdi-facebook text-blue-600 cursor-pointer"></span>
          <span class="mdi mdi-whatsapp text-green-600 cursor-pointer"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/composables/useStore';
import { useUser } from '@/composables/useUser';
import { storageUrl } from '@/config';
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue'

const mobileOpen = ref(false)
const auth = useAuthStore()
const {
    follow,
    unfollow
} = useUser()

const handleFollow = (id: number) => {
    if(auth.userMeta.followings.includes(id)) {
        unfollow(id)
    } else {
        follow(id)
    }
}


const isFollowing = computed(() => {
  return storeData.value.data?.id ? auth.userMeta?.followings?.includes(storeData.value.data.id) : false
})

const {
  storeData
} = useStore()
</script>