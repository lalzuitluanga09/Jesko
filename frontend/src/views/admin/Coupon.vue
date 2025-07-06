<template>
<div class="bg-white dark:bg-gray-800 rounded-xl p-2">
    <h1 class="text-xl font-semibold ml-4 py-4">All Coupons</h1>
    <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
        <div class="space-x-2 flex items-center">
            <TableSearch title="Search coupon"/>
            <DropdownBtn title="Status" :options="options"/>
            <DropdownBtn title="Type" :options="options"/>
            <VueDatePicker
                v-model="date"
                :dark="false"
                :enable-time-picker="false"
                week-start="0"
                auto-apply
                placeholder="Date Range"
                style="max-width: 16rem;"
                range
            />
            <ClearBtn @clear="date = null"/>
        </div>
        <AddBtn title="Add Coupon" @click="openAddDialog"/>
    </div>
    <CouponTable :columns="columns" :rows="rows" :with-status="false" :with-action="true"/>
</div>
<AddCouponDialog />
<ViewCouponDialog />
</template>

<script setup lang="ts">
import AddBtn from '@/components/buttons/AddBtn.vue';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useCoupon } from '@/composables/useCoupon';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import CouponTable from '@/components/admin/CouponTable.vue';
import AddCouponDialog from '@/components/dialogs/AddCouponDialog.vue';
import ViewCouponDialog from '@/components/dialogs/view/ViewCouponDialog.vue';

const {
    date,
    columns,
    rows,
    options,
    openAddDialog
} = useCoupon()

</script>

<style scoped>

</style>