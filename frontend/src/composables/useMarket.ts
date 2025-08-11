import { api } from '@/lib/axios'
import { type MarketplaceItem, type MarketplaceItemForm, type MarketplaceProductData } from '@/types/marketplace_product'
import type { Pagination } from '@/types/pagination'
import { computed, ref, watch } from 'vue'
import { useNotify } from './useNotify'

const loading = ref<Boolean>(false)
const isDialogOpen = ref<Boolean>(false)
const isEdit = ref<Boolean>(false)
const isImageViewOpen = ref<Boolean>(false)

const categories = ref<{
    id: number
    name: string
}[]>([])

const {
    notifyError,
    notifySuccess
} = useNotify()

const items = ref<MarketplaceItem[]>([])
const userItems = ref<MarketplaceItem[]>([])
const itemData = ref<MarketplaceProductData>({
    item: null,
    images: [],
    related_items: []
})

const deletedImageIds = ref<number []>([])

const pagination = ref<Pagination>({
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0
})

const filter = ref<{
    searchTerm: string,
    category_ids: Number [],
}>({
    searchTerm: '',
    category_ids: [],
})

const pageNumbers = computed(() => {
  const total = pagination.value.last_page || 1;
  const current = pagination.value.current_page || 1;

  const range = [];
  const maxVisible = 5;
  let start = Math.max(current - 2, 1);
  let end = Math.min(start + maxVisible - 1, total);

  if (end - start < maxVisible - 1) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});



const formData = ref<MarketplaceItemForm>({
    item: {
        id: null,
        title: '',
        description: '',
        price: 0,
        condition: '',
        category_id: null,
        location_id: null,
        tags: '',
        status: 'active'
    },
    images: []
})



export function useMarket() {

    const getData = async (page: number = 1) => {
        loading.value = true
        try {
            const res = await api.get('/marketplace/items/', {
                params: {
                    page: page,
                    searchTerm: filter.value.searchTerm,
                    category_ids: filter.value.category_ids
                }
            });
            items.value = res.data.products.data
            categories.value = res.data.categories
            pagination.value.current_page = res.data.products.current_page
            pagination.value.from = res.data.products.from
            pagination.value.last_page = res.data.products.last_page
            pagination.value.per_page = res.data.products.per_page
            pagination.value.to = res.data.products.to
            pagination.value.total = res.data.products.total
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

      const fetchItem = async (id: number) => {
        loading.value = true
        try {
            const res = await api.get(`marketplace/item/${id}`);
            itemData.value.item = res.data.data
            itemData.value.images = res.data.images
            itemData.value.related_items = res.data.related_items
        } catch (error) {
            console.log(error)
        } finally {
          loading.value = false
        }
      }

    const clearFilter = () => {
        filter.value = {
            searchTerm: '',
            category_ids: [],
        }
    }

    const getUserItems = async (page: number = 1) => {
        loading.value = true
        try {
            const res = await api.get('/marketplace/user-items/', {
                params: {
                    page: page,
                }
            });
            userItems.value = res.data.products.data
            categories.value = res.data.categories
            pagination.value.current_page = res.data.products.current_page
            pagination.value.from = res.data.products.from
            pagination.value.last_page = res.data.products.last_page
            pagination.value.per_page = res.data.products.per_page
            pagination.value.to = res.data.products.to
            pagination.value.total = res.data.products.total
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    const save = async() => {
        const form = new FormData()

        // Append item fields
        Object.entries(formData.value.item).forEach(([key, value]) => {
            if(value != null)
                form.append(`item[${key}]`, value !== null ? String(value) : '')
        })

        // Append images
        formData.value.images.forEach((image, index) => {
            if (image.file) {
                form.append(`images[${index}][file]`, image.file)
                form.append(`images[${index}][position]`, String(image.position))
            }
        })

        loading.value = true
        try {
          await api.post('marketplace/item', form);
          notifySuccess('New Product added')
          closeDialog()
          getUserItems()
        } catch (error) {
          notifyError('Error adding item')
        } finally {
          loading.value = false
        }

    }

    const update = async(id: number | null) => {
        const payload = new FormData()

        // Append item fields
        Object.entries(formData.value.item).forEach(([key, value]) => {
            if(value != null)
                payload.append(`item[${key}]`, value !== null ? String(value) : '')
        })

        // Append images
        formData.value.images.forEach((image, index) => {
            if (image.file) {
                payload.append(`images[${index}][file]`, image.file)
                payload.append(`images[${index}][position]`, String(image.position))
            }
        })
        deletedImageIds.value.forEach(id => {
            payload.append('deleted_image_ids[]', id.toString());
        });

        // payload.append('_method', 'PUT');

        loading.value = true
        try {
          await api.post(`marketplace/item/${id}`, payload);
          notifySuccess('Updated Successfully')
          closeDialog()
          getUserItems()
        } catch (error) {
          notifyError('Error updating item')
        } finally {
          loading.value = false
        }
    }

    const getEditItem = async (id: number) => {
        loading.value = true
        try {
            const res = await api.get(`marketplace/edit-item/${id}`);
            formData.value.item = res.data.data
            formData.value.images = res.data.images
            console.log(formData.value.images)
        } catch (error) {
            console.log(error)
        } finally {
          loading.value = false
        }
      }

    const deleteItem = async (id: number | null) => {
        if(id === null) {
            notifyError('Item ID is null')
            return
        }
          try {
            await api.delete(`marketplace/item/${id}`);
            notifySuccess('Deleted successfully')
            getUserItems();
            closeDialog()
          } catch (error) {
            notifyError('Cannot delete item')
          }
    }

    const openDialog = () => {
        isDialogOpen.value = true
    }

    const openEdit = async (id: number) => {
        await getEditItem(id)
        isEdit.value = true
        isDialogOpen.value = true
    }

    const closeDialog = () => {
        isDialogOpen.value = false
        if(isEdit.value) {
            isEdit.value = false
            reset()
        }
    }

    const reset = () => {
        formData.value = {
            item: {
                id: null,
                title: '',
                description: '',
                price: 0,
                condition: '',
                category_id: null,
                location_id: null,
                tags: '',
                status: 'active'
            },
            images: []
        }
    }

    const viewImages = () => {
        isImageViewOpen.value = true

    }

    return {
        filter,
        categories,
        items,
        userItems,
        loading,
        pagination,
        pageNumbers,
        itemData,
        isDialogOpen,
        isEdit,
        formData,
        deletedImageIds,
        isImageViewOpen,
        openEdit,
        save,
        update,
        getData,
        clearFilter,
        fetchItem,
        openDialog,
        closeDialog,
        getUserItems,
        deleteItem,
        viewImages
    }
}
