<template>
<div class="bg-white dark:bg-gray-800 rounded-xl px-2 pt-2 pb-4">
    <h1 class="text-xl font-semibold ml-4 py-4">All Products</h1>
    <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
        <div class="space-x-2 flex flex-wrap items-center">
            <TableSearch title="Search by name" v-model="filter.searchTerm"/>
            <DropdownBtn ref="statusDropdownRef" title="Status" :options="options" @select="(event) => filter.status = event"/>
            <DropdownBtn ref="categoryDropdownRef" title="Category" :options="allCategories" @select="(event) => filter.category = event"/>
            <DropdownBtn ref="tagDropdownRef" title="Tag" :options="allTags" @select="(event) => filter.tag = event"/>
            <ClearBtn @clear="clear" v-if="filter.searchTerm || filter.category || filter.status || filter.tag "/>
        </div>
        <AddBtn title="Add Product" @click="openAddDialog"/>
    </div>
    <ProductTable />
</div>
<AddProductDialog />
<ViewProductDialog />
</template>

<script setup lang="ts">
import AddBtn from '@/components/buttons/AddBtn.vue';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import AddProductDialog from '@/components/dialogs/AddProductDialog.vue';
import ViewProductDialog from '@/components/dialogs/view/ViewProductDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useProduct } from '@/composables/useProduct';
import { ref, watch } from 'vue';
import ProductTable from '@/components/admin/ProductTable.vue';
import { useAdmin } from '@/composables/useAdmin';

const {
    filter,
    options,
    allCategories,
    allTags,
    openAddDialog,
    getData,
    clearFilter,
 } = useProduct()

const statusDropdownRef = ref()
const categoryDropdownRef = ref()
const tagDropdownRef = ref()

const { storeSlug } = useAdmin()

const clear = () => {
    clearFilter()
    statusDropdownRef.value.reset()
    categoryDropdownRef.value.reset()
    tagDropdownRef.value.reset()
}

watch(storeSlug, async (newSlug) => {
    if(newSlug) {
        await getData()
    }
},
    { immediate: true }
)

</script>

<style scoped>

</style> 