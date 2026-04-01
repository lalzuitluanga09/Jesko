<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Categories</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by name" v-model="searchInput"/>
            <AddBtn title="Add Category" @click="openAddDialog"/>
        </div>
        <SimpleTable :rows="paginatedItems" :loading="loadingData"
            @delete-row="deleteData()" @edit-item="editData($event)" @prev="currentPage--" @next="currentPage++"
            :totalPages="totalPages" :currentPage="currentPage"
            />
    </div>
    <AddCategoryDialog />
</template>

<script setup lang="ts">
import SimpleTable from '@/components/admin/SimpleTable.vue';
import AddBtn from '@/components/buttons/AddBtn.vue';
import AddCategoryDialog from '@/components/dialogs/AddCategoryDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useAdmin } from '@/composables/useAdmin';
import { useCategory } from '@/composables/useCategory';
import { watch } from 'vue';

const {
    searchInput,
    totalPages,
    loadingData,
    currentPage,
    paginatedItems,
    openAddDialog,
    getData,
    editData,
    deleteData
} = useCategory()

const { storeSlug } = useAdmin()

watch(storeSlug, async (newSlug) => {
    if(newSlug) {
        await getData()
    }
},
    { immediate: true }
)

</script>