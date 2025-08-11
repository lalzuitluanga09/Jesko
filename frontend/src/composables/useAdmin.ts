import {adminApi, api} from '@/lib/axios';
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
          currentStore.value = res.data.store
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

    const getCurrentStore = async () => {
      try {
        const res = await adminApi.get(`/${storeSlug.value}/current-store`);
          currentStore.value = res.data
          isPinVerify.value = true
      } catch (error) {
        notifyError('Error fetching data')
      }
    }
 

  return {
    storeSlug,
    isPinVerify,
    currentStore,
    checkPin,
    logout,
    getCurrentStore
  }
}
