import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref(null)
const token = ref(localStorage.getItem('auth_token') || '')
const isAuthenticated = ref(!!token.value)
const loading = ref<boolean>(false)

const isOpen = ref(false)
const isLogin = ref(true)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const router = useRouter()

if (token.value) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
}

const login = async () => {
  if(!loading)
    return
  loading.value = true
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', formData.value)

    token.value = res.data.token
    user.value = res.data.user
    isAuthenticated.value = true

    localStorage.setItem('auth_token', token.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    closeDialog()
  } catch(error) {
    console.log(error)
  }
  loading.value = false
}

const logout = async () => {
  if(!loading)
    return
  loading.value = true
  try {
    await axios.post('http://127.0.0.1:8000/api/logout')
    token.value = ''
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_token')
    delete axios.defaults.headers.common['Authorization']
    resetData()
  } catch(error) {
    console.log(error)
  }
  loading.value = false
}

const fetchUser = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/user')
  user.value = res.data
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

const resetData = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
}

const openRegisterDialog = () => {
  isLogin.value = false
  openDialog()
}

export function useAuth() {
  return {
    isLogin,
    isOpen,
    user,
    token,
    isAuthenticated,
    formData,
    loading,
    login,
    logout,
    fetchUser,
    openDialog,
    openRegisterDialog,
    closeDialog,
    toggleMode,
    resetData
  }
}
