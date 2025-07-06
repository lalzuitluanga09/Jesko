import { ref } from 'vue'

const visible = ref<boolean>(false)
const duration = 3000
const type = ref<string>('')
const message = ref<string>('')

export function useNotify() {
    const close = () => {
        visible.value = false
    }

    const notifySuccess = (text: string) => {
        type.value = 'success';
        message.value = text
        visible.value = true
        setTimeout(close, duration)
    }
    const notifyError = (text: string) => {
        type.value = 'error';
        message.value = text
        visible.value = true
        setTimeout(close, duration)
    }
    const notifyWarning = (text: string) => {
        type.value = 'warning';
        message.value = text
        visible.value = true
        setTimeout(close, duration)
    }

  return {
    visible,
    type,
    message,
    close,
    notifySuccess,
    notifyError,
    notifyWarning,
  }
}
