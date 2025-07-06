<template>
<div class="bg-white dark:bg-gray-800 rounded-xl px-2 pt-2 pb-4">
    <h1 class="text-xl font-semibold ml-4 py-4">All Products</h1>
    <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
        <div class="space-x-2 flex flex-wrap items-center">
            <TableSearch title="Search by name" v-model="filter.searchTerm"/>
            <DropdownBtn ref="statusDropdownRef" title="Status" :options="options" @select="(event) => filter.status = event"/>
            <DropdownBtn ref="categoryDropdownRef" title="Category" :options="categories" @select="(event) => filter.category = event"/>
            <DropdownBtn ref="tagDropdownRef" title="Tag" :options="tags" @select="(event) => filter.tag = event"/>
            <ClearBtn @clear="clear" v-if="filter.searchTerm || filter.category || filter.status || filter.tag "/>
        </div>
        <AddBtn title="Add Product" @click="openAddDialog"/>

    </div>
    <SimpleTable :columns="columns" :rows="paginatedItems" :with-status="true" :with-action="true" :withView="true"
        @delete-row="deleteData()" @edit-item="editData($event)" @view-item="viewProduct($event)" @prev="currentPage--" @next="currentPage++"
        :totalPages="totalPages" :currentPage="currentPage"
        />
</div>
<AddProductDialog />
<ViewProductDialog />
</template>

<script setup lang="ts">
import SimpleTable from '@/components/admin/SimpleTable.vue';
import AddBtn from '@/components/buttons/AddBtn.vue';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import AddProductDialog from '@/components/dialogs/AddProductDialog.vue';
import ViewProductDialog from '@/components/dialogs/view/ViewProductDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useProduct } from '@/composables/useProduct';
import { onMounted, ref } from 'vue';
import { useCategory } from '@/composables/useCategory';
import { useTag } from '@/composables/useTag';

const {
    filter,
    columns,
    options,
    currentPage,
    totalPages,
    paginatedItems,
    openAddDialog,
    getData,
    viewProduct,
    editData,
    deleteData,
    clearFilter,
    filterData
 } = useProduct()

 const { 
    data: categories,
    getData: getCategories 
} = useCategory();

 const { 
    data: tags,
    getData: getTags 
} = useTag();

const statusDropdownRef = ref()
const categoryDropdownRef = ref()
const tagDropdownRef = ref()

const clear = () => {
    clearFilter()
    statusDropdownRef.value.reset()
    categoryDropdownRef.value.reset()
    tagDropdownRef.value.reset()
}

 onMounted(() => {
    getData()
    getCategories()
    getTags()
 })

</script>

<style scoped>

</style> 