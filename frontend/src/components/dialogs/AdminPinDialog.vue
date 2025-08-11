<template>
    <div v-if="isPinDialogOpen"
            class="fixed inset-x-0 bottom-0 flex items-end justify-center bg-black/20 z-20 min-h-screen">
    </div>
    <Transition name="bounce">
        <div v-if="isPinDialogOpen"
            class="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50 text-sm"
            @click.self="isPinDialogOpen = false">
            <div 
                class="relative max-w-xs bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div class="flex justify-center mb-4">
                    <img class="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
                        :src="item.logo ? storageUrl(item.logo) : '/images/logo.png'" alt="Store Logo" />
                </div>

                <div class="text-center">
                    <h2 class="text-lg md:text-xl font-semibold mb-4 line-clamp-2">{{ item.name }}</h2>

                    <div class="relative transition-all mb-3">
                        <input
                        :type="isPasswordVisible ? 'text' : 'password'"
                        inputmode="numeric"
                        pattern="\d*"
                        placeholder="Enter PIN"
                        ref="inputRef"
                        required
                        v-model="pin"
                        @input="pin = pin.replace(/\D/g, '')"
                        @keydown.enter.stop="handleSubmit"
                        class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <button  @click="isPasswordVisible = !isPasswordVisible"
                            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-black dark:hover:text-white">
                            <span v-if="!isPasswordVisible" class="mdi mdi-eye"></span>
                            <span v-else class="mdi mdi-eye-off"></span>
                        </button>
                    </div>
                    <button @click="handleSubmit"
                        class="w-full py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                    >
                    <Loading v-if="loading"/>
                    <span v-else>
                        Submit <span class="mdi mdi-arrow-right ml-2"></span>
                    </span>
                    
                    </button>
                </div>
                <button class="absolute top-2 right-3 px-1 cursor-pointer hover:text-red-500 hover:bg-red-100 rounded-full" @click="isPinDialogOpen = false">
                    <span class="mdi mdi-close text-xl"></span>
                </button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from 'vue'
import { useStore } from '@/composables/useStore'
import { useAuthStore } from '@/stores/auth'
import { useAdmin } from '@/composables/useAdmin'
import { useNotify } from '@/composables/useNotify'
import Loading from '../others/Loading.vue'
import router from '@/router';
import { storageUrl } from '@/config'


interface Store {
    id: number | null,
    name: string,
    slug: string,
    logo: string
}

const props = defineProps<{
    item: Store
}>();

const { isPinDialogOpen } = useStore()
const { isPinVerify, checkPin } = useAdmin()
const { notifyError } = useNotify()

const auth = useAuthStore()

const pin = ref<string>('')
const loading = ref(false)
const isPasswordVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

watch(isPinDialogOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(() => {
      inputRef.value?.focus()
    }, 100)
  }
})

const handleSubmit = async () => {
  if (!pin.value.trim()) {
    notifyError('Please Enter Pin')
    return
  }
  if (props.item?.id) {
    loading.value = true
    await checkPin(pin.value, props.item.id)
    loading.value = false
    if(isPinVerify.value) {
        isPinDialogOpen.value = false
        router.push({
            name: 'dashboard',
            params: {
                storeslug: props.item.slug,
            },
        })
    }
  }
}

const handleKeydown = (e: any) => {
    if (e.key === 'Escape') {
        isPinDialogOpen.value = false
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
    animation: fade-out 0.2s;
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

@keyframes fade-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.5);
    }
}
</style>
