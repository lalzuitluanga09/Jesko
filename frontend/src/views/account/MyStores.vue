<template>
    <div class="flex flex-col items-center justify-center max-w-5xl mx-auto p-2 md:p-4 cursor-default">
        <h1 class="text-lg md:text-2xl font-bold mb-6 text-center ">My Stores</h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            <!-- // Store Cards // -->
            <div v-for="item in auth.userStores" :key="item.id" @click="goTo(item.store.slug)"
                :class="`border border-${item.store.theme}-300 rounded-2xl hover:bg-${item.store.theme}-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4 text-center cursor-pointer`">
                <img :src="item.store.logo ? storageUrl(item.store.logo) : '/images/logo.png'" alt="Store Logo"
                    :class="`w-24 h-24 md:w-26 md:h-26 rounded-full bg-white object-cover border-4 border-${item.store.theme}-300 dark:border-${item.store.theme}-500 shadow-sm`" />
                <h2 :class="`text-sm md:text-base font-semibold py-4 line-clamp-2 text-${item.store.theme}-500`">{{ item.store.name }}</h2>
                <button @click.stop="openDialog(item.store)"
                    :class="`mt-auto px-3 py-1 md:px-4 md:py-2 cursor-pointer bg-${item.store.theme}-500 text-white font-medium text-sm rounded-lg transition-colors w-full`">
                    Go to Dashboard
                    <span class="mdi mdi-arrow-right ml-2"></span>
                </button>
            </div>
        </div>
    </div>
   <AdminPinDialog :item="selectedStore" />
</template>


<script setup lang="ts">
import AdminPinDialog from '@/components/dialogs/AdminPinDialog.vue'
import { useStore } from '@/composables/useStore'
import { storageUrl } from '@/config'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const {
    openPinDialog
} = useStore()

const auth = useAuthStore()

interface Store {
    id: number | null,
    name: string,
    slug: string,
    logo: string,
    theme: string
}

const selectedStore = ref<Store> ({
        id: null,
        name: '',
        slug: '',
        logo: '',
        theme: ''
    })

const goTo = (slug: string) => {
    router.push({
        name: 'store',
        params: {
            slug: slug,
        }
    })
}

const openDialog = (store: Store) => {
        selectedStore.value = store
        openPinDialog()
    }

</script>
