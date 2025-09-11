<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Sales</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <div class="space-x-2 flex items-center">
                <TableSearch title="Search by name" v-model="filter.searchTerm"/>
                <DropdownBtn ref="typeDropdownRef" title="Type" :options="typeOptions" @select="(event) => filter.type = event"/>
                <DropdownBtn ref="statusDropdownRef" title="Status" :options="statusOptions" @select="(event) => filter.status = event"/>
                <VueDatePicker
                    v-model="filter.from"
                    :dark="isDark"
                    :enable-time-picker="false"
                    week-start="0"
                    auto-apply
                    placeholder="From"
                    style="max-width: 10rem;"
                />
                <VueDatePicker
                    v-model="filter.to"
                    :dark="isDark"
                    :enable-time-picker="false"
                    week-start="0"
                    auto-apply
                    placeholder="To"
                    style="max-width: 10rem;"
                />
                <ClearBtn v-if="filter.searchTerm || filter.status ||filter.type || filter.from || filter.to" @clear="clear"/>
            </div>
            <AddBtn title="Add Sales" @click="openAddDialog"/>
        </div>
        <SaleTable />
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
import { useSale } from '@/composables/useSale';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import ViewSaleDialog from '@/components/dialogs/view/ViewSaleDialog.vue';
import { useSetting } from '@/composables/useSetting';
import { onMounted, ref } from 'vue';

const {
    filter,
    statusOptions,
    typeOptions,
    openAddDialog,
    clearFilter,
    getSalesData
} = useSale()

const { isDark } = useSetting()

const typeDropdownRef = ref()
const statusDropdownRef = ref()

const clear = () => {
    clearFilter()
    typeDropdownRef.value.reset()
    statusDropdownRef.value.reset()
}

onMounted(async() => {
    await getSalesData()
})
</script>

<style scoped>

</style>