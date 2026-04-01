import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/lib/axios'
import { useNotify } from '@/composables/useNotify'
import { useAuthStore } from './auth'
import type { Product } from '@/types/product'

export const useWishlist = defineStore('wishlist', () => {

    const {
        notifyError,
        notifySuccess
    } = useNotify()

    const auth = useAuthStore()


    const loading = ref<boolean>(false)
    const wishlist = ref<Product[]>([])


    const getWishlist = async () => {
        loading.value = true
        try {
            const res = await api.get('/wishlist')
            wishlist.value = res.data
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const addToWishlist = async (id: number) => {
        if (loading.value) return
        loading.value = true
        try {
            await api.post('/wishlist', {
                product_id: id,
            })
            auth.userMeta.wishlists.push(id)
            notifySuccess('Item added to wishlist')
        } catch (error) {
            notifyError('Failed to add to wishlist:')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const removeItem = async (id: number) => {
        if (loading.value) return
        loading.value = true
        try {
            await api.delete(`/wishlist/${id}`)
            notifySuccess('Item removed from wishlist')
            if (wishlist.value) {
                wishlist.value = wishlist.value.filter(item => item.id != id)
            }
            auth.userMeta.wishlists = auth.userMeta.wishlists.filter(item => item != id)
        } catch (error) {
            notifyError('Failed to remove item:')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        wishlist,
        getWishlist,
        addToWishlist,
        removeItem

    }
})
