import { computed, ref, watch } from 'vue'
import {adminApi} from '@/lib/axios'
import { useNotify } from './useNotify'
import type { Category } from '@/types/category'
import { useConfirmDialog } from './useConfirmDialog'
import { debounce } from 'lodash-es'
import { useAdmin } from './useAdmin'

const {
  notifySuccess,
  notifyError
} = useNotify()

const { isOpen, itemId } = useConfirmDialog()
const { storeSlug } = useAdmin()

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)
const isDialogOpen = ref<boolean>(false)
const inputData = ref<string>('')
const editId = ref<number>(0)
const searchInput = ref<string>('')

const data = ref<Category[]>([])
const filteredData = ref<Category[]>([])

const perPage = ref<number>(10)
const currentPage = ref(<number>(1))

export function useCategory() {

  const getData = async () => {
    loadingData.value = true
    try {
      const res = await adminApi.get(`/${storeSlug.value}/category`);
      data.value = res.data
      filteredData.value = res.data
    } catch (error) {
      notifyError('Error fetching data')
      console.log(error)
    } finally {
      loadingData.value = false
    }
  }

  const save = async () => {
    if (inputData.value.trim() == '') {
      notifyError('Name cannot be null or empty')
      return
    }
    loading.value = true
    try {
      await adminApi.post(`/${storeSlug.value}/category`, {
        name: inputData.value.trim()
      });
      notifySuccess('Category added')
      closeAddDialog()
      getData()
    } catch (error) {
      notifyError('Error adding category')
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const update = async () => {
    if (inputData.value.trim() == '') {
      notifyError('Name cannot be null or empty')
      return
    }
    loading.value = true
    try {
      await adminApi.put(`/${storeSlug.value}/category/${editId.value}`, {
        name: inputData.value.trim()
      });
      notifySuccess('Updated Successfully')
      closeAddDialog()
      getData()
    } catch (error) {
      notifyError('Unable to update')
      console.log(error)
    }
  }

  const openAddDialog = () => {
    isDialogOpen.value = true
  }

  const closeAddDialog = () => {
    isDialogOpen.value = false
    inputData.value = ''
    editId.value = 0
  }

  const editData = (item: Category) => {
    inputData.value = item.name
    editId.value = item.id
    isDialogOpen.value = true
  }

  const deleteData = async () => {
    try {
      await adminApi.delete(`/${storeSlug.value}/category/${itemId.value}`);
      isOpen.value = false
      notifySuccess('Deleted successfully')
      getData();
    } catch (error) {
      notifyError('Cannot delete item')
      console.log(error)
    }
  }

  const handleSearch = debounce(() => {
    loading.value = true
    const search = searchInput.value.trim().toLowerCase()
    if (search) {
      filteredData.value = data.value.filter(item =>
        item.name.toLowerCase().includes(search)
      )
    } else {
      filteredData.value = data.value
    }
    loading.value = false
  }, 400)

  watch(searchInput, () => {
    currentPage.value = 1
    handleSearch()
  })

  const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / perPage.value)
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return filteredData.value.slice(start, start + perPage.value)
  })


  return {
    inputData,
    editId,
    data,
    filteredData,
    searchInput,
    loading,
    loadingData,
    isDialogOpen,
    currentPage,
    perPage,
    totalPages,
    paginatedItems,
    openAddDialog,
    closeAddDialog,
    save,
    update,
    getData,
    editData,
    deleteData
  }
}
