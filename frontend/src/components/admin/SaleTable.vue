<template>
    <div class="relative overflow-x-auto bg-white dark:bg-gray-800 mx-2 md:mx-4">
        <table class="w-full border border-gray-300 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs border-y border-gray-300 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Type</th>
                    <th scope="col" class="px-6 py-3">Discount</th>
                    <th scope="col" class="px-6 py-3">Start</th>
                    <th scope="col" class="px-6 py-3">End</th>
                    <th scope="col" class="px-6 py-3 text-left">Status</th>
                    <th scope="col" class="px-6 py-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="sales.length === 0">
                    <td :colspan="8" class="text-center py-6 text-gray-500">
                        No data found!
                    </td>
                </tr>
                <tr v-else-if="loadingData">
                    <td :colspan="8" class="text-center py-6 text-gray-500">
                        <Loading />
                    </td>
                </tr>
                <tr v-else v-for="row in sales" :key="row.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                    <td class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </td>
                    <td class="px-6 py-4">{{ row.name }}</td>
                    <td class="px-6 py-4">{{ row.type }}</td>
                    <td class="px-6 py-4">
                        <span v-if="row.discount_type === 'percentage'">
                            {{ Math.ceil(row.discount_value) }}%
                        </span>
                        <span v-else-if="row.discount_type === 'fixed'">
                            ₹ {{ row.discount_value }}
                        </span>
                        <span v-else-if="row.discount_type === 'bogo' && row.rules">
                            Buy {{ row.rules.bogoX }} Get {{ row.rules.bogoY }}
                        </span>
                    </td>
                    <td class="px-6 py-4">{{ formatToDatetime(row.start_at) }}</td>
                    <td class="px-6 py-4">{{ formatToDatetime(row.end_at) }}</td>
                    <td class="px-6 py-4">
                        <span
                            v-if="row.status === 'draft'"
                            class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-200 shadow"
                        >
                            <span class="w-2 h-2 mr-2 rounded-full bg-yellow-400 inline-block"></span>
                            {{ row.status }}
                        </span>
                        <span
                            v-else-if="row.status === 'active'"
                            class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-800 border border-green-200 shadow"
                        >
                            <span class="w-2 h-2 mr-2 rounded-full bg-green-500 inline-block"></span>
                            {{ row.status }}
                        </span>
                        <span
                            v-else
                            class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 border border-red-200 shadow"
                        >
                            <span class="w-2 h-2 mr-2 rounded-full bg-red-400 inline-block"></span>
                            {{ row.status }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm flex gap-2 items-center justify-center">
                        <button @click="openEditDialog(row)" title="Edit"
                            class="cursor-pointer bg-blue-500 text-white px-2 py-0.5 rounded-full shadow hover:bg-blue-700">
                            <span class="mdi mdi-square-edit-outline text-lg"></span>
                        </button>
                        <button  @click="deleteItem(row.id)" title="Delete"
                            class="cursor-pointer text-white px-2 py-0.5 rounded-full bg-red-500 shadow hover:bg-red-400">
                            <span class="mdi mdi-trash-can text-lg"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation">
            <span
                class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }} -{{ pagination.to }}</span> of
                <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button @click="prev" :disabled="pagination.current_page == 1"
                        :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                            pagination.current_page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                        ]">Previous</button>
                </li>
                <li v-for="page in pagination.last_page" :key="page">
                    <button
                        @click="fetchPage(page)"
                        :class="[
                        'flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-700',
                        page === pagination.current_page
                            ? 'bg-blue-100 text-blue-600 dark:text-white dark:bg-gray-700'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        ]"
                    >
                        {{ page }}
                    </button>
                </li>
                <li>
                    <button @click="next" :disabled="pagination.current_page == pagination.last_page"
                        :class="['flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                            pagination.current_page === pagination.last_page ? 'cursor-not-allowed' : 'cursor-pointer'
                        ]">Next</button>
                </li>
            </ul>
        </nav>
    </div>
    <ConfirmDeleteDialog :is-open="isOpen" @update:is-open="isOpen = $event" @deleteItem="deleteSale"/>
</template>

<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useSale } from '@/composables/useSale';
import { formatToDatetime } from '@/lib/formatDate';
import ConfirmDeleteDialog from '../dialogs/ConfirmDeleteDialog.vue';
import Loading from '../others/Loading.vue';

const {
    isOpen,
    itemId
} = useConfirmDialog()

const deleteItem = (id: number) => {
    isOpen.value = true
    itemId.value = id
}

const {
    loadingData,
    sales,
    pagination,
    getSalesData,
    openEditDialog,
    deleteSale
} = useSale()

const prev = () => {
    getSalesData(pagination.value.current_page - 1)
}

const next = () => {
    getSalesData(pagination.value.current_page + 1)
}

const fetchPage = (page: number) => {
    getSalesData(page)
}

</script>
