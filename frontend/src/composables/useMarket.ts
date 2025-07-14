import { api } from '@/lib/axios'
import { type MarketplaceItem, type MarketplaceProductData } from '@/types/marketplace_product'
import type { Pagination } from '@/types/pagination'
import { computed, ref, watch } from 'vue'

const loading = ref<Boolean>(false)

const categories = ref<{
    id: number
    name: string
}[]>([])

const items = ref<MarketplaceItem[]>([])
const itemData = ref<MarketplaceProductData>({
    item: null,
    images: [],
    related_items: []
})

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

export function useMarket() {

    const getData = async (page: number = 1) => {
        loading.value = true
        try {
            const res = await api.get('/marketplace/products/', {
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
            const res = await api.get(`marketplace/product/${id}`);
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

    return {
        filter,
        categories,
        items,
        loading,
        pagination,
        pageNumbers,
        itemData,
        getData,
        clearFilter,
        fetchItem
    }
}
