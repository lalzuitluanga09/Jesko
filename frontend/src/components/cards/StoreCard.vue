<template>
    <div
        @click="goTo"
        class="w-full max-w-sm rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-amber-50 cursor-pointer border border-gray-300 shadow transition">
        <div class="mx-1 mt-1 md:mx-2 md:mt-2">
            <img class="w-full lg:h-48 md:h-40 h-32 object-cover rounded-t-xl md:rounded-t-2xl" src="/images/logo.png"
            alt="Store Image" />
        </div>
        <div class="px-3 md:px-4 pb-2 pt-2 ">
            <div class="font-medium text-base md:text-lg mb-1 truncate">
                {{ store.name }} 
            </div>
            <p class="text-gray-500 dark:text-white/50 text-sm pb-2 truncate" v-if="!isMobile">
                {{ store.description }}
            </p>
        </div>
        <div class="px-3 md:px-4 mb-2 flex justify-between items-center">
            <div class="flex items-center gap-1 text-xs md:text-sm">
                <i class="mdi mdi-account text-xs md:text-base" />
                <span>{{ store.followers_count }}</span>
                <!-- <i class="mdi mdi-star-four-points text-xs md:text-base md:ml-3" />
                <span>4.5</span> -->
                <i class="mdi mdi-package-variant-closed text-xs md:text-base md:ml-3" />
                <span>{{ store.products_count }}</span>
            </div>
                <button v-if="auth.isAuthenticated" @click.stop="handleFollow(store.id)"
                    class="dark:text-black bg-amber-100 px-2 md:px-3 py-1 md:py-1.5 ml-2 mb-2 rounded-full hover:bg-amber-200 transition-colors duration-200 flex items-center gap-1 text-xs md:text-sm cursor-pointer">
                    <span v-if="auth.userMeta.followings.includes(store.id)">
                        Unfollow <i class="mdi mdi-close text-xs md:text-sm" />
                    </span>
                    <span v-else>
                        Follow <i class="mdi mdi-plus text-xs md:text-sm" />
                    </span>
                </button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useSetting } from '@/composables/useSetting';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import type { Store } from '@/types/store';
import { useUser } from '@/composables/useUser';

const props = defineProps<{
    store: Store
}>();

const  { isMobile } = useSetting()
const auth = useAuthStore()
const {
    follow,
    unfollow
} = useUser()

const goTo = async() => {
    router.push({
        name: 'store',
        params: {
            slug: props.store.slug,
        }
    })
}

const handleFollow = (id: number) => {
    if(auth.userMeta.followings.includes(id)) {
        unfollow(id)
    } else {
        follow(id)
    }
}

</script>