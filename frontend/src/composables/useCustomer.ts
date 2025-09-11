import { ref } from 'vue'

const loading = ref<boolean>(false)

const columns = [
  'name',
  'phone',
  'email',
  'address',
]

const rows = [
  { name: 'Fashion', phone: '123-456-7890', email: 'fashion@example.com', address: '123 Fashion St' },
  { name: 'Electronics', phone: '987-654-3210', email: 'electronics@example.com', address: '456 Electronics Ave' },
  { name: 'Cosmetics', phone: '555-555-5555', email: 'cosmetics@example.com', address: '789 Cosmetics Blvd' },
]

export function useCustomer() {


    return {
        columns,
        rows,
        loading,
  }
}
