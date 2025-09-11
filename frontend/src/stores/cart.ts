import { api } from '@/lib/axios'
import type { Cart } from '@/types/cart'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNotify } from '@/composables/useNotify'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
    const {
        notifyError,
        notifySuccess
    } = useNotify()

    const auth = useAuthStore()

    const cart = ref<Cart | null>(null)

    const loading = ref<boolean>(false)

    const itemCount = computed(() => {
        if (!cart.value?.items?.length) return 0;

        return cart.value.items.reduce((total, storeGroup) => {
            return total + (storeGroup.items?.reduce((sum, item) => sum + item.quantity, 0) || 0)
        }, 0);
    });

    const subTotal = computed(() =>
        cart.value?.items?.reduce((storeSum, storeGroup) => {
            return storeSum + storeGroup.items.reduce((itemSum, item) => {
                return itemSum + item.quantity * item.price_at_addition
            }, 0)
        }, 0) || 0
    )

    // const bogoDiscount = computed(() => {
    //     if (!cart.value) return 0;

    //     return cart.value.items.reduce((storeSum, storeGroup) => {
    //         return storeSum + storeGroup.items.reduce((itemSum, item) => {
    //         const bogo = item.discount?.type === 'bogo' ? item.discount.bogo : null;
    //         if (!bogo) return itemSum;

    //         const { bogoX, bogoY } = bogo;
    //         if (!bogoX || !bogoY) return itemSum;

    //         const freeItems = Math.floor(item.quantity / bogoX) * bogoY;

    //         return itemSum + freeItems * item.price_at_addition;
    //         }, 0);
    //     }, 0);
    // });

    const discountTotal = computed(() =>
        cart.value?.items?.reduce((storeSum, storeGroup) => {
            return storeSum + storeGroup.items.reduce((itemSum, item) => {
            if (item.discount && item.discount.type !== 'bogo' && item.discount_price) {
                const discountPerItem = item.price_at_addition - item.discount_price;
                return itemSum + discountPerItem * item.quantity;
            }
            return itemSum;
            }, 0);
        }, 0) || 0
    );

    // const discountTotal = computed(() => otherDiscount.value );

    const total = computed(() => subTotal.value - discountTotal.value)

    const getStoreIds = () =>{
        return cart.value?.items.map(group => group.store_id)
    }

    const getCartItems = async () => {
        loading.value = true
        try {
            const res = await api.get('/cart')
            cart.value = res.data
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const addToCart = async (id: number, quantity: number = 1) => {
        if(loading.value) return
        loading.value = true
        try {
            await api.post('/cart', {
                product_id: id,
                quantity: quantity,
            })
            auth.userMeta.cart_items.push(id)
            notifySuccess('Item added to cart')
        } catch (error) {
            notifyError('Failed to add to cart:')
            console.error( error)
        } finally {
            loading.value = false
        }
    }


    const removeItem = async (id: number) => {
        if(loading.value) return
        loading.value = true
        try {
            await api.delete(`/cart/${id}`)
            notifySuccess('Item removed from cart')
            if(cart.value) {
                cart.value.items = cart.value.items
                    .map(group => {
                        const filteredItems = group.items.filter(item => item.product_id !== id)
                        return {
                        ...group,
                        items: filteredItems
                        }
                    })
                    .filter(group => group.items.length > 0)
            }
            auth.userMeta.cart_items =  auth.userMeta.cart_items.filter(item => item != id)
        } catch (error) {
            notifyError('Failed to remove item:')
            console.error( error)
        } finally {
            loading.value = false
        }
    }

    // if (cart.value === null) getCartItems()

    return {
        cart,
        subTotal,
        discountTotal,
        total,
        itemCount,
        loading,
        getStoreIds,
        getCartItems,
        addToCart,
        removeItem
    }
})
