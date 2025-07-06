<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Customers</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by customer name"/>
        </div>
        <SimpleTable :columns="columns" :rows="rows":with-status="false" :with-action="false"/>
    </div>
</template>

<script setup lang="ts">
import SimpleTable from '@/components/admin/SimpleTable.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useCustomer } from '@/composables/useCustomer';

const {
    columns,
    rows,
} = useCustomer()

</script>

<style scoped>

</style>