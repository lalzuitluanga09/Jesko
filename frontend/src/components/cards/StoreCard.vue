<template>
    <div @click="goTo"
        :class="`relative h-fit cursor-pointer group w-full max-w-sm rounded-3xl dark:bg-gray-800 hover:bg-${store.theme}-50 dark:hover:bg-gray-700 border border-${store.theme}-200 dark:border-gray-600 shadow-lg transition-all duration-200`">
        <div
            :class="`flex justify-center items-center pt-6 pb-2 bg-gradient-to-b from-${store.theme}-50 to-transparent dark:from-gray-900 rounded-t-3xl`">
            <img :class="`h-24 w-24 md:h-32 md:w-32 object-cover rounded-full bg-white border-4 border-${store.theme}-200 dark:border-${store.theme}-500 shadow-lg transition-transform duration-200 group-hover:scale-105`"
                :src="store.logo ? storageUrl(store.logo) : '/images/logo.png'" alt="Store Image" />
        </div>
        <SaleBadge v-if="store.isNew" title="New" type="green" class="absolute top-4 left-0" />
        <StoreBadge v-if="store.active_sale" title="Ongoing Sale" type="red"
            class="absolute top-0 left-1/2 -translate-x-1/2" />

        <div class="px-5 pb-2 pt-2 text-center">
            <div
                :class="`font-semibold text-md md:text-lg mb-1 truncate text-${store.theme}-800 dark:text-${store.theme}-400`">
                {{ store.name }}
            </div>
            <div class="text-xs md:text-sm text-gray-500 dark:text-gray-300 truncate">
                {{ meta.storeCategories.find(cat => cat.id === store.category_id)?.name || 'No category selected.' }}
            </div>
        </div>
        <div
            :class="auth.isAuthenticated ? 'px-5 pb-4 flex justify-between items-center' : 'px-5 pb-4 flex justify-center items-center'">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                    <i :class="`mdi mdi-account text-${store.theme}-500 text-base md:text-lg`" />
                    <span class="font-medium text-gray-700 dark:text-gray-200">{{ store.followers_count }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <i :class="`mdi mdi-package-variant-closed text-${store.theme}-500 text-base md:text-lg`" />
                    <span class="font-medium text-gray-700 dark:text-gray-200">{{ store.products_count }}</span>
                </div>
            </div>
            <button v-if="auth.isAuthenticated" @click.stop="handleFollow(store.id)"
                :class="`bg-${store.theme}-100 dark:bg-${store.theme}-500 px-3 py-1 rounded-full hover:bg-${store.theme}-200 dark:hover:bg-${store.theme}-400 transition-colors duration-200 flex items-center gap-2 text-sm font-semibold shadow cursor-pointer`"
                :title="auth.userMeta.followings.includes(store.id) ? 'Unfollow' : 'Follow'">
                <span v-if="auth.userMeta.followings.includes(store.id)"
                    :class="`mdi mdi-storefront-check text-lg text-${store.theme}-600 dark:text-gray-100`"></span>
                <span v-else
                    :class="`mdi mdi-storefront-plus text-lg text-${store.theme}-600 dark:text-gray-100`"></span>
                <span :class="`hidden md:inline font-normal text-${store.theme}-600 dark:text-gray-100`">{{
                    auth.userMeta.followings.includes(store.id) ? 'Following' : 'Follow' }}</span>
            </button>
        </div>
        <div class="relative hidden md:block">
            <div
                class="absolute -translate-y-1/3 translate-x-4/5 bottom-full mb-3 z-20 w-72 p-4 rounded-xl shadow-xl bg-white/40 backdrop-blur-sm dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                <div class="font-bold text-lg mb-2 truncate">{{ store.name }}</div>
                <div class="flex items-center mb-1">
                    <span :class="`mdi mdi-account-circle-outline mr-2 text-${store.theme}-500`"></span>
                    <span class="font-medium italic text-gray-500 dark:text-gray-400">Owner:</span>
                    <span class="ml-1">{{ store.owner?.name || 'N/A' }}</span>
                </div>
                <!-- <div class="flex items-center mb-1">
                <span :class="`mdi mdi-account-multiple-outline mr-2 text-${store.theme}-500`"></span>
                <span class="font-medium italic text-gray-500 dark:text-gray-400">Followers:</span>
                <span class="ml-1">{{ store.followers_count }}</span>
            </div>
            <div class="flex items-center mb-1">
                <span :class="`mdi mdi-package-variant-closed mr-2 text-${store.theme}-500`"></span>
                <span class="font-medium italic text-gray-500 dark:text-gray-400">Products:</span>
                <span class="ml-1">{{ store.products_count }}</span>
            </div> -->
                <div class="flex items-center mb-1">
                    <span :class="`mdi mdi-map-marker mr-2 text-${store.theme}-500`"></span>
                    <span class="font-medium italic text-gray-500 dark:text-gray-400">Location:</span>
                    <span class="ml-1">{{ store.location?.name || 'N/A' }}</span>
                </div>
                <div class="mt-2 text-gray-700 dark:text-gray-300">
                    <span class="font-medium text-gray-500 dark:text-gray-400">Description:</span>
                    <span class="ml-1">{{ store.description || 'No description available.' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import type { Store } from '@/types/store';
import { useUser } from '@/composables/useUser';
import { storageUrl } from '@/config';
import SaleBadge from '../badge/SaleBadge.vue';
import StoreBadge from '../badge/StoreBadge.vue';
import { useMeta } from '@/stores/meta';

const props = defineProps<{
    store: Store
}>();

const auth = useAuthStore()
const meta = useMeta()

const {
    follow,
    unfollow
} = useUser()

const goTo = async () => {
    router.push({
        name: 'store',
        params: {
            slug: props.store.slug,
        }
    })
}

const handleFollow = (id: number) => {
    if (auth.userMeta.followings.includes(id)) {
        unfollow(id)
    } else {
        follow(id)
    }
}

</script>