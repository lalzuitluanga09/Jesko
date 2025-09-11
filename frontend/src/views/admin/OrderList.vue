<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Orders</h1>
        <div class="flex items-center gap-2  mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by order id" v-model="filter.searchTerm"/>
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
            <ClearBtn v-if="filter.searchTerm || filter.status || filter.from || filter.to" @clear="clear"/>
        </div>
        <OrderTable/>
    </div>
    <ViewOrderDialog />
    <UpdateOrderStatusDialog />
</template>

<script setup lang="ts">
import OrderTable from '@/components/admin/OrderTable.vue';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import ViewOrderDialog from '@/components/dialogs/view/ViewOrderDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useOrder } from '@/composables/useOrder';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted } from 'vue';
import { useSetting } from '@/composables/useSetting';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import { ref } from 'vue';
import UpdateOrderStatusDialog from '@/components/dialogs/UpdateOrderStatusDialog.vue';

const {
    filter,
    statusOptions,
    clearFilter,
    getData,
} = useOrder()

const { isDark } = useSetting()

onMounted(async() => {
    await getData()
})

const statusDropdownRef = ref()

const clear = () => {
    clearFilter()
    statusDropdownRef.value.reset()
}
</script>