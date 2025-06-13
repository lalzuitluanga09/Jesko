import { ref } from 'vue'

interface CartItem {
    id: string;
    name: string;
}

const cartItems = ref<CartItem[]>([
    { id: '1', name: 'Item One' },
    { id: '2', name: 'Item Two' },
    { id: '3', name: 'Item Three' }
])

export function useCart() {

  return {
    cartItems
  }
}
