import { computed, ref, watch } from 'vue'
import type { Store, StoreCategory } from '@/types/store'
import { useNotify } from './useNotify'
import { api } from '@/lib/axios'
import type { Product, ProductVariation } from '@/types/product'
import type { Category } from '@/types/category'
import type { Tag } from '@/types/tag'
import type { User } from '@/types/user'
import type { ProductImages } from '@/types/images'
import type { Seller } from '@/types/seller'
import type { Pagination } from '@/types/pagination'

const {
  notifySuccess,
  notifyError
} = useNotify()

const searchTitle = ref<string>('')

const loading = ref<boolean>(false)
const filtering = ref<boolean>(false)

const loadTopStore = ref<boolean>(false)
const filterOpen = ref<boolean>(false)
const loadStoreData = ref<boolean>(true)
const loadProduct = ref<boolean>(true)

const isPinDialogOpen = ref<boolean>(false)

const storeData = ref<{
  data: Store | null,
  owner: User | null,
  products: Product[],
  categories: Category[],
  tags: Tag[]
}>({
  data: null,
  owner: null,
  products: [],
  categories: [],
  tags: []
})

const productData = ref<{
  item: Product | null,
  seller: Seller | null,
  similarItems: Product[],
  images: ProductImages[],
  attribute: {
    name: string;
    values: string[];
  }[],
  variations: ProductVariation[]
}>({
  item: null,
  seller: null,
  similarItems: [],
  images: [],
  attribute: [],
  variations: []
})


const stores = ref<Store[]>([])
const filteredStores = ref<Store[]>([])
const topStores = ref<Store[]>([])

const filter = ref<{
  searchTerm: string,
  categories: number[],
  tags: number[],
  sort: string,
  price_range: number[]
}>({
  searchTerm: '',
  categories: [],
  tags: [],
  sort: 'relevance',
  price_range: []
})


const mobileFilter = ref<{
  categories: number[],
  tags: number[],
  sort: string,
  price_range: number[]
}>({
  categories: [],
  tags: [],
  sort: 'relevance',
  price_range: []
})

const storeFilter = ref<{
  searchTerm: string,
  category_id: number | null,
  tags: number[],
  sort: string,
}>({
  searchTerm: '',
  category_id: null,
  tags: [],
  sort: '',
})

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price_low_high' },
  { label: 'Price: High to Low', value: 'price_high_low' },
  { label: 'Newest', value: 'newest' }
]

const pagination = ref<Pagination>({
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0
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

export function useStore() {

  const convertBackendToFrontend = (attributeObj: Record<string, string[]>) => {
    productData.value.attribute = Object.entries(attributeObj).map(([name, values]) => ({
      name,
      values,
    }))
  }

  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getData = async (page: number = 1) => {
    loading.value = true
    try {
      const res = await api.get('/stores', {
        params: {
          page: page,
          category_id: storeFilter.value.category_id,
          searchTerm: storeFilter.value.searchTerm,
        },
      });
      await delay(300);
      stores.value = res.data.data
      pagination.value.current_page = res.data.current_page
      pagination.value.from = res.data.from
      pagination.value.last_page = res.data.last_page
      pagination.value.per_page = res.data.per_page
      pagination.value.to = res.data.to
      pagination.value.total = res.data.total
      if(storeFilter.value.searchTerm) {
        searchTitle.value = storeFilter.value.searchTerm
      } else {
        searchTitle.value = ''
      }
    } catch (error) {
      notifyError('Error fetching data')
    } finally {
      loading.value = false
    }
  }

  const getTopStores = async () => {
    loadTopStore.value = true
    try {
      const res = await api.get('/top-stores');
      topStores.value = res.data
    } catch (error) {
      notifyError('Error fetching data')
    } finally {
      loadTopStore.value = false
    }
  }

  const getProductData = async (id: number) => {
    loading.value = true
    try {
      const res = await api.get(`/store/product/${id}`, {});
      productData.value.item = res.data.product
      productData.value.seller = res.data.seller
      productData.value.images = res.data.images
      convertBackendToFrontend(res.data.attribute)
      productData.value.variations = res.data.variations
    } catch (error) {
      notifyError('Error fetching data')
    } finally {
      loading.value = false
    }
  }

  const getStoreData = async (slug: string) => {
    loadStoreData.value = true
    try {
      const res = await api.get(`/store/${slug}`);
      storeData.value.data = res.data.store
      storeData.value.owner = res.data.owner
      storeData.value.categories = res.data.categories || []
      storeData.value.tags = res.data.tags || []
      fixPriceRange(res.data.max_price)
    } catch (error) {
      notifyError('Error fetching data')
    } finally {
      loadStoreData.value = false
    }
  }

  const fetchProducts = async (storeId: number, page: number = 1) => {
    loadProduct.value = true
    try {
      const res = await api.get('/store-products', {
        params: {
          page: page,
          store_id: storeId,
          filter: filter.value
        },
      });
      await delay(300);
      storeData.value.products = res.data.data || []
      pagination.value.current_page = res.data.current_page
      pagination.value.from = res.data.from
      pagination.value.last_page = res.data.last_page
      pagination.value.per_page = res.data.per_page
      pagination.value.to = res.data.to
      pagination.value.total = res.data.total
    } catch (error) {
      notifyError('Error fetching data')
    } finally {
      loadProduct.value = false
    }
  }

  const handleFilter = () => {
    const storeId = storeData.value.data?.id
    if(storeId) {
      fetchProducts(storeId)
    }
  }

  const fixPriceRange = (price: number) => {
    filter.value.price_range[0] = 0
    filter.value.price_range[1] = price

    mobileFilter.value.price_range[0] = 0
    mobileFilter.value.price_range[1] = price
  }

  const openFilterDialog = () => {
    filterOpen.value = true
  }

  const closeFilterDialog = () => {
    filterOpen.value = false
  }

  // watch(() => filter.value.categories.length, () => {
  //   debouncedFilterData()
  // })
  // watch(() => filter.value.tags.length, () => {
  //   debouncedFilterData()
  // })
  // watch(() => filter.value.price_range[0] || filter.value.price_range[1], () => {
  //   debouncedFilterData()
  // })
  // watch(() => filter.value.sort, () => {
  //   debouncedFilterData()
  // })

  const applyFilter = () => {
    filter.value.sort = mobileFilter.value.sort
    filter.value.categories = mobileFilter.value.categories
    filter.value.tags = mobileFilter.value.tags
    filter.value.price_range = mobileFilter.value.price_range
    handleFilter()
  }

  const clearFilter = () => {
    filter.value.searchTerm = ''
    filter.value.categories = []
    filter.value.tags = []
    filter.value.sort = 'relevance'
  }

  const clearMobileFilter = () => {
    mobileFilter.value.categories = []
    mobileFilter.value.tags = []
    mobileFilter.value.sort = 'relevance'
  }

  const openPinDialog = () => {
    isPinDialogOpen.value = true
  }

  return {
    isPinDialogOpen,
    searchTitle,
    loadTopStore,
    loading,
    filterOpen,
    loadStoreData,
    filter,
    filtering,
    mobileFilter,
    stores,
    storeData,
    sortOptions,
    productData,
    topStores,
    filteredStores,
    storeFilter,
    pagination,
    pageNumbers,
    loadProduct,
    getTopStores,
    openFilterDialog,
    closeFilterDialog,
    getData,
    getStoreData,
    fetchProducts,
    fixPriceRange,
    applyFilter,
    clearFilter,
    clearMobileFilter,
    getProductData,
    openPinDialog,
    handleFilter
  }
}
