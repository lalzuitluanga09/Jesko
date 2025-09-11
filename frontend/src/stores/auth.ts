import { defineStore } from 'pinia'
import { ref } from 'vue'
import {api} from '@/lib/axios'
import { useNotify } from '@/composables/useNotify'
import { type UserStore, type User,type UserMeta } from '@/types/user'
import { useMeta } from './meta'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const userMeta = ref<UserMeta>({
    followings: [],
    cart_items: [],
    wishlists:  [],
    pendingOrders: 0
})

  const meta = useMeta()

  const isAuthenticated = ref<boolean>(false)
  const loading = ref<boolean>(false)

  const isOpen = ref<boolean>(false)
  const isLogin = ref<boolean>(true)

  const isStoreUser = ref<boolean>(false)
  const userStores =ref<UserStore []>([])

  const formData = ref<{
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string,
    date_of_birth?: Date,
    gender?: string
    profile_image?: File | null
    delete_profile_image?: boolean
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    date_of_birth: undefined,
    gender: undefined,
    profile_image: null,
    delete_profile_image: false
  })

  const { notifySuccess, notifyError } = useNotify()

  const login = async () => {
    if (loading.value) return
    loading.value = true

    await api.get('sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000'
    })

    try {
      const res = await api.post('/login', formData.value)
      user.value = res.data.user
      isAuthenticated.value = true
      userStores.value = res.data.userStores
      isStoreUser.value = userStores.value.length > 0
      meta.getMeta()
      closeDialog()
      getUserMeta()
      notifySuccess('Login Successfully')
    } catch (error) {
      notifyError('Incorrect Credentials')
      console.error(error)
    } finally {
      loading.value = false
      resetData()
    }
  }

  const register = async () => {
    await api.get('sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000'
    })
    loading.value = true
    try {
      const res = await api.post('/register', formData.value)
      user.value = res.data.user
      isAuthenticated.value = true
      closeDialog()
      notifySuccess('Registered Successfully')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
      resetData()
    }
  }

const logout = async () => {
  loading.value = true
  try {
    await api.post('/logout')
    resetData()
    notifySuccess('Logout Successfully')
  } catch (error) {
    console.error(error)
  } finally {
    user.value = null
    isAuthenticated.value = false
    isStoreUser.value = false
    userStores.value = []
    loading.value = false 
  }
}

  const checkAuth = async () => {
    try {
      const res = await api.get('/user')
      user.value = res.data.user
      if(user.value) {
        user.value.profile_image = res.data.profile_image
        user.value.date_of_birth = res.data.date_of_birth
        user.value.gender = res.data.gender
      }
      userStores.value = res.data.userStores;
      isStoreUser.value = userStores.value.length > 0;
      isAuthenticated.value = true
      getUserMeta()
    } catch (error) {
      console.error(error)
    }
  }

  const getUserMeta = async () => {
    try {
      const res = await api.get('/user-meta')
      userMeta.value.followings = res.data.followings
      userMeta.value.cart_items = res.data.cart_items
      userMeta.value.wishlists = res.data.wishlists
      userMeta.value.pendingOrders = res.data.pendingOrders
    } catch (error) {
      console.error(error)
    }
  }


  const openDialog = () => {
    isOpen.value = true
  }

  const closeDialog = () => {
    isOpen.value = false
    isLogin.value = true
  }

  const toggleMode = () => {
    isLogin.value = !isLogin.value
  }

  const openRegisterDialog = () => {
    isLogin.value = false
    openDialog()
  }

  const resetData = () => {
    formData.value = {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      // date_of_birth: undefined,
      // gender: undefined,
      profile_image: null,
      delete_profile_image: false
    }
  }

    const updateProfile = async () => {
      loading.value = true
      const form = new FormData()
      form.append('name', formData.value.name)
      form.append('email', formData.value.email)
      form.append('phone', formData.value.phone)
      if (formData.value.password) {
        form.append('password', formData.value.password)
        form.append('password_confirmation', formData.value.password_confirmation)
      }
      if (formData.value.date_of_birth) {
        form.append('date_of_birth', formData.value.date_of_birth.toString())
      }
      if (formData.value.gender) {
        form.append('gender', formData.value.gender)
      }
      if (formData.value.profile_image) {
        form.append('profile_image', formData.value.profile_image)
      }
      if (formData.value.delete_profile_image) {
        form.append('delete_profile_image', 'true')
      }
      try {
        await api.post('/user', form);
        notifySuccess('Updated Successfully')
        checkAuth()
        resetData()
      } catch (error) {
        notifyError('Unable to update')
        console.log(error)
      } finally {
        loading.value = false
      }
    }

  const initFormData = () => {
    formData.value.name = user.value?.name || ''
    formData.value.email = user.value?.email || ''
    formData.value.phone = user.value?.phone ? user.value.phone.toString() : ''
    formData.value.date_of_birth = user.value?.date_of_birth
    formData.value.gender = user.value?.gender || undefined
  }

  return {
    user,
    userMeta,
    userStores,
    isAuthenticated,
    isStoreUser,
    loading,
    isLogin,
    isOpen,
    formData,
    login,
    register,
    logout,
    checkAuth,
    getUserMeta,
    openDialog,
    closeDialog,
    toggleMode,
    openRegisterDialog,
    resetData,
    updateProfile,
    initFormData
  }
})
