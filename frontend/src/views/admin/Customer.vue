<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Customers</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by name, email or phone" v-model="filter.searchTerm"/>
        </div>
        <CustomerTable />
    </div>
</template>

<script setup lang="ts">
import CustomerTable from '@/components/admin/CustomerTable.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useAdmin } from '@/composables/useAdmin';
import { useCustomer } from '@/composables/useCustomer';
import { watch } from 'vue';

const {
    filter,
    getCustomers
} = useCustomer()

const { storeSlug } = useAdmin()

watch(storeSlug, async (newSlug) => {
    if(newSlug) {
        await getCustomers()
    }
},
    { immediate: true }
)

</script>

<style scoped>

</style>