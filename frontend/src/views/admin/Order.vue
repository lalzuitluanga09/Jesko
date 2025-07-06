<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Orders</h1>
        <div class="flex items-center gap-2  mx-1 md:mx-4 pb-4">
            <TableSearch title="Search by order id"/>
            <VueDatePicker
                v-model="date"
                :dark="isDark"
                :enable-time-picker="false"
                week-start="0"
                auto-apply
                placeholder="From"
                style="max-width: 10rem;"
            />
            <VueDatePicker
                v-model="date"
                :dark="isDark"
                :enable-time-picker="false"
                week-start="0"
                auto-apply
                placeholder="To"
                style="max-width: 10rem;"
            />
            <ClearBtn @clear="date = null"/>
        </div>
        <OrderTable :columns="columns" :rows="rows" :with-status="true" :with-action="false"/>
    </div>
    <ViewOrderDialog />
</template>

<script setup lang="ts">
import OrderTable from '@/components/admin/OrderTable.vue';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import ViewOrderDialog from '@/components/dialogs/view/ViewOrderDialog.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import { useOrder } from '@/composables/useOrder';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import { useSetting } from '@/composables/useSetting';

const date = ref<Date | null>(null);

const {
    columns,
    rows,
} = useOrder()

const { isDark } = useSetting()

</script>

<style scoped>

</style>