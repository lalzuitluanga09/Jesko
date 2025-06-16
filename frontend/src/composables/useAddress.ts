import { ref } from 'vue'
const isOpen = ref<boolean>(false)

export function useAddress() {

    const openDialog = () => {
        isOpen.value = true
    }

    const closeDialog = () => {
        isOpen.value = false
    }

  return {
    isOpen,
    openDialog,
    closeDialog
  }
}
