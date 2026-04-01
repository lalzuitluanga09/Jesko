<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Tags</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by name" v-model="searchInput"/>
            <AddBtn title="Add Tag" @click="openAddDialog"/>
        </div>
        <SimpleTable :rows="paginatedItems" :loading="loadingData"
            @delete-row="deleteData()" @edit-item="editData($event)" @prev="currentPage--" @next="currentPage++"
            :totalPages="totalPages" :currentPage="currentPage"
            /> 
    </div>
    <AddTagDialog />
</template>

<script setup lang="ts">
import SimpleTable from '@/components/admin/SimpleTable.vue';
import AddBtn from '@/components/buttons/AddBtn.vue';
import AddTagDialog from '@/components/dialogs/AddTagDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useAdmin } from '@/composables/useAdmin';
import { useTag } from '@/composables/useTag';
import { watch } from 'vue';

const {
    searchInput,
    paginatedItems,
    currentPage,
    totalPages,
    loadingData,
    openAddDialog,
    editData,
    deleteData,
    getData
} = useTag()

const { storeSlug } = useAdmin()

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