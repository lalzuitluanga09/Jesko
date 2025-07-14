import {api} from '@/lib/axios';
import type { Store } from '@/types/store'
import { ref } from 'vue'
import { useNotify } from './useNotify';

const {
    notifyError,
    notifySuccess
} = useNotify()

const currentStore = ref<Store>()
const isPinVerify = ref<boolean>(false)
const storeSlug = ref<string | string []>('')

export function useAdmin() {

    const checkPin = async (pin: string, storeId: number) => {
      try {
          const res = await api.post('/admin/check-pin', {
            'pin': pin, 
            'store_id': storeId 
          })
          currentStore.value = res.data
          isPinVerify.value = true
          notifySuccess('Access granted')
      } catch (error) {
          notifyError('Invalid PIN')
        }
    }

    const logout = async() => {
          try {
          await api.get('/admin/forget-session')
          currentStore.value = undefined
          isPinVerify.value = false
          notifySuccess('Logout Successfully')
      } catch (error) {
          notifyError('Error!')
        }
    }

  return {
    storeSlug,
    isPinVerify,
    currentStore,
    checkPin,
    logout
  }
}
