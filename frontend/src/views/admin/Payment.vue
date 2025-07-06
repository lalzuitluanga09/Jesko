<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Payments</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by payment id" />
            <!-- <AddBtn title="Add Order" @click="openAddDialog"/> -->
        </div>
        <SimpleTable :columns="columns" :rows="rows" :with-status="true" :with-action="false"/>
    </div>
</template>

<script setup lang="ts">
import SimpleTable from '@/components/admin/SimpleTable.vue';
import AddBtn from '@/components/buttons/AddBtn.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { usePayment } from '@/composables/usePayment';

const {
    columns,
    rows,
} = usePayment()

</script>

<style scoped>

</style>