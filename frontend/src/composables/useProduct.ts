import { adminApi } from '@/lib/axios';
import type { Product } from '@/types/product';
import { reactive, computed, watch, ref } from 'vue'
import { useNotify } from './useNotify'
import { useConfirmDialog } from './useConfirmDialog'
import type { Images, NewImage, ProductImages } from '@/types/images';
import { useAdmin } from './useAdmin';
import type { Pagination } from '@/types/pagination';
import { debounce } from 'chart.js/helpers';

const {
  notifySuccess,
  notifyError
} = useNotify()

const { isOpen, itemId } = useConfirmDialog()
const { storeSlug } = useAdmin()

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)
const isView = ref<boolean>(false)
const isDialogOpen = ref<boolean>(false)
const selected = ref<Product>();
const editId = ref<number>(0)

const isMagnify = ref<boolean>(false)
const previewImageUrl = ref<string>('')

const isMagnifyImages = ref<boolean>(false)
const viewImages = ref<ProductImages[]>([])

//Variations
const isVariable = ref<boolean>(false)
interface Variation {
  option: string
  values: string[]
  newValue: string
}
const variations = reactive<Variation[]>([
  { option: '', values: [], newValue: '' }
])
const variationData = reactive<{ [key: string]: { stock: number; price: number } }>({})

const productAttributes = ref<{
  name: string;
  values: string[];
}[]>([]);

const productVariations = ref<{
  id: number;
  price: string;
  stock: number;
  sku: string | null;
  attributes: Record<string, string>;
}[]>([]);

const updatedStocks = reactive<{ [id: string]: { price: number, stock: number } }>({})

const filter = ref<{
  searchTerm: string,
  status: string,
  category: number | null,
  tag: number | null,
}>({
  searchTerm: '',
  status: '',
  category: null,
  tag: null
})

const pagination = ref<Pagination>({
  current_page: 0,
  from: 0,
  last_page: 0,
  per_page: 0,
  to: 0,
  total: 0,
})

const products = ref<Product []>([])

const allCategories = ref<{
  id: number
  name: string
}[]>([])

const allTags = ref<{
  id: number
  name: string
}[]>([])

const defaultImage = ref<NewImage | null>(null);
const images = ref<Images[]>([]);
const deletedImageIds = ref<number[]>([]);

const formData = ref<Product>({
  id: 0,
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sku: '',
  parent_id: undefined,
  status: 'draft',
  type: '',
  category_ids: [],
  tag_ids: []
})


const options = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
]

export function useProduct() {

  const getData = async (page: number = 1) => {
    loadingData.value = true
    try {
      const res = await adminApi.get(`/${storeSlug.value}/product`, {
        params: {
          page: page,
          searchTerm: filter.value.searchTerm,
          status: filter.value.status,
          category: filter.value.category,
          tag: filter.value.tag,
        },
      });
      products.value = res.data.products.data
      pagination.value.current_page = res.data.products.current_page
      pagination.value.from = res.data.products.from
      pagination.value.last_page = res.data.products.last_page
      pagination.value.per_page = res.data.products.per_page
      pagination.value.to = res.data.products.to
      pagination.value.total = res.data.products.total
      allCategories.value = res.data.categories
      allTags.value = res.data.tags
    } catch (error) {
      notifyError('Error fetching data')
      console.error(error)
    } finally {
      loadingData.value = false
    }
  }

  const debouncedGetPayments = debounce(() => {
        if (!loadingData.value)
          getData()
      }, 300)
    
      watch(
        [() => filter.value.searchTerm, () => filter.value.status, () => filter.value.category, () => filter.value.tag,],
        debouncedGetPayments
      )

  const save = async () => {
    if (formData.value.name.trim() == '') {
      notifyError('Name cannot be null or empty')
      return
    }

    const form = new FormData()
    Object.entries(formData.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          form.append(`product[${key}][]`, v.toString());
        });
      } else if (value !== null && value !== undefined) {
        form.append(`product[${key}]`, String(value));
      }
    });

    if (defaultImage.value?.file) {
      form.append('defaultImage', defaultImage.value.file)
    }
    images.value.forEach(img => {
      if (img.file) {
        form.append('images[]', img.file);
      }
    });
    if (isVariable.value) {
      form.append('variations', JSON.stringify(variations))
      const variationItems = Object.entries(variationData).map(([key, data]) => ({
        values: key.split('-'),
        stock: data.stock,
        price: data.price
      }))

      form.append('variation_items', JSON.stringify(variationItems))
    }

    loading.value = true
    try {
      await adminApi.post(`${storeSlug.value}/product`, form);
      notifySuccess('New Product added')
      closeAddDialog()
      reset()
      getData()
    } catch (error) {
      notifyError('Error adding item')
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const update = async () => {
    if (formData.value.name.trim() == '') {
      notifyError('Name cannot be null or empty')
      return
    }

    const payload = new FormData()

    Object.entries(formData.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          payload.append(`product[${key}][]`, v.toString());
        });
      } else if (value !== null && value !== undefined) {
        payload.append(`product[${key}]`, String(value));
      }
    });
    if (defaultImage.value?.file) {
      payload.append('defaultImage', defaultImage.value.file)
    } else if (defaultImage.value?.image_path) {
      payload.append('defaultImage', defaultImage.value.image_path)
    }
    
    images.value.forEach(img => {
      if (img.file) {
        payload.append('new_images[]', img.file);
      }
    });

    deletedImageIds.value.forEach(id => {
      payload.append('deleted_image_ids[]', id.toString());
    });

    if (selected.value?.type == 'variable') {
      const variationUpdates = Object.entries(updatedStocks).map(([id, { price, stock }]) => ({
        id,
        price,
        stock
      }))
      payload.append('variations', JSON.stringify(variationUpdates));
    }

    payload.append('_method', 'PUT'); // overwrite post to send FormData

    loading.value = true
    try {

      await adminApi.post(`${storeSlug.value}/product/${editId.value}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notifySuccess('Updated Successfully')
      closeEditDialog()
      getData()
    } catch (error) {
      notifyError('Unable to update')
      console.error(error)
    }
  }

  const fetchItem = async () => {
    loading.value = true
    try {
      const res = await adminApi.get(`${storeSlug.value}/product/${editId.value}`);
      selected.value = res.data.product
      formData.value = res.data.product
      formData.value.category_ids = res.data.categories
      formData.value.tag_ids = res.data.tags
      defaultImage.value = {
        image_path: res.data.defaultImage,
      };
      images.value = res.data.images
      productAttributes.value = res.data.attributes
      productVariations.value = res.data.variations
    } catch (error) {
      notifyError('Error fetching data')
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const openEditDialog = (item: Product) => {
    editId.value = item.id
    fetchItem()
    isDialogOpen.value = true
  }

  const deleteProduct = async () => {
    try {
      await adminApi.delete(`${storeSlug.value}/product/${itemId.value}`);
      isOpen.value = false
      notifySuccess('Deleted successfully')
      getData();
    } catch (error) {
      notifyError('Cannot delete item')
      console.error(error)
    }
  }

  const openAddDialog = () => {
    isDialogOpen.value = true
  }

  const closeAddDialog = () => {
    isDialogOpen.value = false
    reset()
  }

  const closeEditDialog = () => {
    isDialogOpen.value = false
    selected.value = undefined
    reset()
  }

  const openViewDialog = () => {
    isView.value = true
  }

  const closeViewDialog = () => {
    isView.value = false
    selected.value = undefined
    reset()
  }

  const viewProduct = (id: number) => {
    editId.value = id
    fetchItem()
    openViewDialog();
  }


  const reset = () => {
    editId.value = 0
    formData.value = {
      id: 0,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      sku: '',
      parent_id: undefined,
      status: 'draft',
      type: '',
      category_ids: [],
      tag_ids: []
    }
    defaultImage.value = null
    images.value = []
    isVariable.value = false
    variations.splice(0, variations.length, { option: '', values: [], newValue: '' })
    Object.keys(variationData).forEach(key => delete variationData[key])
  }

  const clearFilter = () => {
    filter.value = {
      searchTerm: '',
      status: '',
      category: null,
      tag: null
    }
  }

  //variations
  function cartesian(arr: string[][]): string[][] {
    return arr.reduce<string[][]>(
      (a, b) => a.flatMap(d => b.map(e => [...d, e])),
      [[]]
    )
  }

  const variationCombinations = computed(() => {
    const valueArrays = variations
      .filter(v => v.option && v.values.length)
      .map(v => v.values)
    if (!valueArrays.length) return []
    const combos = cartesian(valueArrays)
    return combos.map(values => ({
      values,
      key: values.join('-')
    }))
  })

  watch(variationCombinations, (newCombos) => {
    for (const comb of newCombos) {
      if (!(comb.key in variationData)) {
        variationData[comb.key] = { stock: 0, price: 0 }
      }
    }
    for (const key in variationData) {
      if (!newCombos.find(c => c.key === key)) {
        delete variationData[key]
      }
    }
  }, { immediate: true })

  function addVariation() {
    variations.push({ option: '', values: [], newValue: '' })
  }

  function removeVariation(idx: number) {
    variations.splice(idx, 1)
  }

  function addValue(vIdx: number) {
    const v = variations[vIdx]
    const val = v.newValue.trim()
    if (val && !v.values.includes(val)) {
      v.values.push(val)
    }
    v.newValue = ''
  }

  function removeValue(vIdx: number, valIdx: number) {
    variations[vIdx].values.splice(valIdx, 1)
  }

  watch(productVariations, (newVariations) => {
    newVariations.forEach(variation => {
      if (!updatedStocks[variation.id]) {
        updatedStocks[variation.id] = {
          price: Number(variation.price),
          stock: variation.stock
        }
      }
    })
  }, { immediate: true })

  return {
    pagination,
    loadingData,
    isMagnify,
    isMagnifyImages,
    viewImages,
    previewImageUrl,
    filter,
    loading,
    isView,
    isDialogOpen,
    options,
    selected,
    editId,
    products,
    formData,
    defaultImage,
    images,
    deletedImageIds,
    allCategories,
    allTags,
    openAddDialog,
    closeAddDialog,
    openEditDialog,
    closeEditDialog,
    openViewDialog,
    closeViewDialog,
    getData,
    save,
    update,
    viewProduct,
    deleteProduct,
    clearFilter,
    ////////////->
    //Varaitons
    isVariable,
    variations,
    variationData,
    variationCombinations,
    productAttributes,
    productVariations,
    updatedStocks,
    addVariation,
    removeVariation,
    addValue,
    removeValue,
    ////////////<-
  }
}
