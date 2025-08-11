import { api } from '@/lib/axios';
import { type Address } from '@/types/address';
import { ref } from 'vue'
import { useNotify } from './useNotify';
import { useAuthStore } from '@/stores/auth';

const {
  notifyError,
  notifySuccess
} = useNotify()

const auth = useAuthStore()

const isOpen = ref<boolean>(false)
const loadData = ref<boolean>(false)
const loading = ref<boolean>(false)

const isDeleting = ref<boolean>(false)
const isEditing = ref<boolean>(false)

const addresses = ref<Address[]>([])

const formData = ref<{
  id?: number;
  label: string;
  name: string;
  phone: string | null;
  address: string;
  landmark: string;
  districtId: number | null;
  postal_code: string;
  city: string;
}>({
  label: '',
  name: auth.user?.name || '',
  phone: auth.user?.phone.toString() || null,
  address: '',
  landmark: '',
  districtId: null,
  postal_code: '',
  city: ''
})

export function useAddress() {

    const openDialog = () => {
        isOpen.value = true
    }

    const closeDialog = () => {
        isOpen.value = false
        isEditing.value = false
        resetForm()
    }

    const openEditDialog = (address: Address) => {
      isEditing.value = true
      formData.value = {
        id: address.id,
        label: address.label,
        name: address.name,
        phone: address.phone?.toString() || null,
        address: address.address,
        landmark: address.landmark || '',
        districtId: address.district_id,
        postal_code: address.postal_code,
        city: address.city
      }
      openDialog()
    }

    const fetchAddresses = async () => {
      loadData.value = true
      try {
        const res = await api.get('/addresses');
        addresses.value = res.data
      } catch (error) {
        console.error('Error fetching addresses:', error)
      } finally {
        loadData.value = false
      }
    }

    const save = async () => {
      if(loading.value) return;
      loading.value = true
      try {
        const res = await api.post('/addresses', formData.value);
        addresses.value.push(res.data.data);
        closeDialog();
        notifySuccess('Address saved successfully');
      } catch (error) {
        console.error('Error saving address:', error)
        notifyError('Failed to save address');
      } finally {
        loading.value = false
      }
    }

    const setDefault = async (addressId: number) => {
      if(loading.value) return;
      loading.value = true
      try {
        await api.put(`/addresses/${addressId}/default`);
        addresses.value = addresses.value
          .map(address => ({
            ...address,
            is_default: address.id === addressId
          }))
          .sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
        notifySuccess('Default address set successfully');
      } catch (error) {
        console.error('Error setting default address:', error)
        notifyError('Failed to set default address');
      } finally { 
        loading.value = false
      }
    }

    const update = async (id: number | undefined) => {
      if (!id) {
        notifyError('Invalid address ID');
        return;
      }
      if(loading.value) return;
      loading.value = true
      try {
        const res = await api.put(`/addresses/${id}`, formData.value);
        const index = addresses.value.findIndex(address => address.id === id);
        if (index !== -1) {
          addresses.value[index] = res.data.data;
        }
        closeDialog();
        notifySuccess('Address updated successfully');
      } catch (error) {
        console.error('Error updating address:', error)
        notifyError('Failed to update address');
      } finally {
        loading.value = false
      }
    }

    const deleteAddress = async (id: number | undefined) => {
      if (!id) {
        notifyError('Invalid address ID');
        return;
      }
      if(isDeleting.value) return;
      isDeleting.value = true
      try {
        await api.delete(`/addresses/${id}`);
        addresses.value = addresses.value.filter(address => address.id !== id);
        closeDialog();
        notifySuccess('Address deleted successfully');
      } catch (error) {
        console.error('Error deleting address:', error)
        notifyError('Failed to delete address');
      } finally {
        isDeleting.value = false
      }
    }

    const resetForm = () => {
      formData.value = {
          label: '',
          name: auth.user?.name || '',
          phone: auth.user?.phone?.toString() || null,
          address: '',
          landmark: '',
          districtId: null,
          postal_code: '',
          city: ''
      }
    }

  return {
    isOpen,
    loading,
    loadData,
    isDeleting,
    formData,
    addresses,
    isEditing,
    openDialog,
    closeDialog,
    fetchAddresses,
    save,
    setDefault,
    openEditDialog,
    update,
    resetForm,
    deleteAddress
  }
}
