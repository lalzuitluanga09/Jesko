import { ref } from 'vue'

const isOpen = ref(false)
const itemId = ref<number>(0)


export function useConfirmDialog() {


  return { isOpen, itemId }
}
