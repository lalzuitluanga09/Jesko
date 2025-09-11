<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Payments</h1>
        <div class="flex items-center gap-2  mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by order id" v-model="filter.searchTerm"/>
            <DropdownBtn ref="statusDropdownRef" title="Status" :options="paymentStatusOptions" @select="(event) => filter.status = event"/>
            <DropdownBtn ref="modeDropdownRef" title="Payment Mode" :options="paymentModeOptions" @select="(event) => filter.paymentMode = event"/>
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
            <ClearBtn v-if="filter.searchTerm || filter.status ||filter.paymentMode || filter.from || filter.to" @clear="clear"/>
        </div>
        <PaymentTable />
    </div>
</template>

<script setup lang="ts">
import TableSearch from '@/components/search/TableSearch.vue';
import { usePayment } from '@/composables/usePayment';
import { useSetting } from '@/composables/useSetting';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted, ref } from 'vue';
import PaymentTable from '@/components/admin/PaymentTable.vue';

const {
    filter,
    paymentStatusOptions,
    paymentModeOptions,
    clearFilter,
    getPayments
} = usePayment()

const { isDark } = useSetting()

const statusDropdownRef = ref()
const modeDropdownRef = ref()

const clear = () => {
    clearFilter()
    statusDropdownRef.value.reset()
    modeDropdownRef.value.reset()
}

onMounted(() => {
    getPayments()
})


</script>

<style scoped>

</style>