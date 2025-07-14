import { api } from '@/lib/axios'
import { type Store } from '@/types/store'
import { ref } from 'vue'
import { useNotify } from './useNotify'
import { useAuthStore } from '@/stores/auth'

const followedStores = ref<Store []>([])
const loading = ref<boolean>(false)

const {
    notifyError,
    notifySuccess
} = useNotify()

export function useUser() {
    const auth = useAuthStore()
    
        const getFollowedStores = async () => {
          loading.value = true
          try {
            const res = await api.get('/followed-stores');
            followedStores.value = res.data
          } catch (error) {
            console.log(error)
          } finally {
            loading.value = false
          }
        }

          const follow = async (storeId: number) => {
            loading.value = true
            try {
              await api.post(`/store/${storeId}/follow`);
              auth.userMeta.followings.push(storeId)
              notifySuccess('Store followed')
            } catch (error) {
              notifyError('Error following')
            } finally {
              loading.value = false
            }
          }

        const unfollow = async (storeId: number) => {
            loading.value = true
            try {
              await api.delete(`/store/${storeId}/unfollow`);
              auth.userMeta.followings = auth.userMeta.followings.filter(item => item !== storeId);
              followedStores.value = followedStores.value.filter(item => item.id != storeId)
              notifySuccess('Unfollowed')
            } catch (error) {
              notifyError('Error unfollowing')
            } finally {
              loading.value = false
            }
          }

  return {
    loading,
    followedStores,
    getFollowedStores,
    follow,
    unfollow
  }
}
