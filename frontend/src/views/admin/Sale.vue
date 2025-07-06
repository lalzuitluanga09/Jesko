<template>
<div class="bg-white dark:bg-gray-800 rounded-xl p-2">
    <h1 class="text-xl font-semibold ml-4 py-4">All Sales</h1>
    <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
        <div class="space-x-2 flex items-center">
            <TableSearch title="Search by name"/>
            <DropdownBtn title="Status" :options="options"/>
            <DropdownBtn title="Discount Type" :options="options"/>
            <VueDatePicker
                v-model="date"
                :dark="false"
                :enable-time-picker="false"
                week-start="0"
                auto-apply
                placeholder="From - To"
                style="max-width: 16rem;"
                range
            />
            <ClearBtn @clear="date = null"/>
        </div>
        <AddBtn title="Add Sales" @click="openAddDialog"/>
    </div>
    <SaleTable :columns="columns" :rows="rows" :with-status="false" :with-action="true"/>
</div>
<AddSaleDialog />
<ViewSaleDialog />
</template>

<script setup lang="ts">
import SaleTable from '@/components/admin/SaleTable.vue';
import AddBtn from '@/components/buttons/AddBtn.vue';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import AddSaleDialog from '@/components/dialogs/AddSaleDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useSale } from '@/composables/useSale';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import ViewSaleDialog from '@/components/dialogs/view/ViewSaleDialog.vue';

const {
    date,
    columns,
    rows,
    options,
    openAddDialog
} = useSale()

</script>

<style scoped>

</style>