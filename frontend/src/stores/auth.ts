import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/lib/axios'
import { useNotify } from '@/composables/useNotify'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  const isOpen = ref(false)
  const isLogin = ref(true)

  const formData = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
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
      closeDialog()
      notifySuccess('Login Successfully')
    } catch (error) {
      notifyError('Incorrect Credentials')
      console.error(error)
    }

    loading.value = false
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
    }
    loading.value = false
  }

  const logout = async () => {
    loading.value = true
    try {
      await api.post('/logout')
      user.value = null
      isAuthenticated.value = false
      resetData()
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  const checkAuth = async () => {
    try {
      const res = await api.get('/user')
      user.value = res.data
      isAuthenticated.value = true
    } catch (error) {
      console.error(error)
      router.push({ name: 'account' })
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
      password_confirmation: ''
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    isLogin,
    isOpen,
    formData,
    login,
    register,
    logout,
    checkAuth,
    openDialog,
    closeDialog,
    toggleMode,
    openRegisterDialog,
    resetData
  }
})
