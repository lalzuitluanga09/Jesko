<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-2">
        <h1 class="text-xl font-semibold ml-4 py-4">All Coupons</h1>
        <div class="flex items-center justify-between mx-1 md:mx-4 pb-4">
            <div class="space-x-2 flex items-center">
                <TableSearch title="Search by code" v-model="filter.searchTerm"/>
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
            <AddBtn title="Add Coupon" @click="openAddDialog"/>
        </div>
        <CouponTable/>
    </div>
<AddCouponDialog />
<ViewCouponDialog />
</template>

<script setup lang="ts">
import AddBtn from '@/components/buttons/AddBtn.vue';
import DropdownBtn from '@/components/buttons/DropdownBtn.vue';
import TableSearch from '@/components/search/TableSearch.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useCoupon } from '@/composables/useCoupon';
import ClearBtn from '@/components/buttons/ClearBtn.vue';
import CouponTable from '@/components/admin/CouponTable.vue';
import AddCouponDialog from '@/components/dialogs/AddCouponDialog.vue';
import ViewCouponDialog from '@/components/dialogs/view/ViewCouponDialog.vue';
import { onMounted } from 'vue';
import { useSetting } from '@/composables/useSetting';
import { ref } from 'vue';

const {
    filter,
    typeOptions,
    statusOptions,
    openAddDialog,
    getCoupons,
    clearFilters
} = useCoupon()

const {isDark} = useSetting()

const typeDropdownRef = ref()
const statusDropdownRef = ref()

const clear = () => {
    clearFilters()
    typeDropdownRef.value.reset()
    statusDropdownRef.value.reset()
}

onMounted(() => {
    getCoupons()
})

</script>
