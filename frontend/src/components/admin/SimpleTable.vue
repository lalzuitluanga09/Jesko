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
                    <th scope="col" class="px-6 py-3">Slug</th>
                    <th scope="col" class="px-6 py-3">Products</th>
                    <th scope="col" class="px-6 py-3 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="rows.length === 0">
                    <td :colspan="5" class="text-center py-6 text-gray-500">
                        No data found!
                    </td>
                </tr>
                <tr v-else-if="loading">
                    <td :colspan="5" class="text-center py-6 text-gray-500">
                        <Loading />
                    </td>
                </tr>
                <tr v-else v-for="(row, i) in rows" :key="i"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                    <td class="w-4 p-4 relative">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </td>
                    <td class="px-6 py-4">{{ row.name }}</td>
                    <td class="px-6 py-4">{{ row.slug }}</td>
                    <td class="px-6 py-4">{{ row.productsCount }}</td>
                    <td class="px-6 py-4 text-sm flex gap-2 items-center justify-center">
                        <button @click="editItem(row)" title="Edit"
                            class="cursor-pointer bg-blue-500 text-white px-2 py-0.5 rounded-full shadow hover:bg-blue-700">
                            <span class="mdi mdi-square-edit-outline text-lg"></span>
                        </button>
                        <button @click="deleteItem(row.id)"  title="Delete"
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
                <span class="font-semibold text-gray-900 dark:text-white">1-{{ rows.length }}</span> of
                <span class="font-semibold text-gray-900 dark:text-white">{{ rows.length }}</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8" v-if="rows.length > 10">
                <li>
                    <button
                        @click="prev"
                        :disabled="currentPage === 1"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg
                            hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                            dark:hover:bg-gray-700 dark:hover:text-white
                            bg-white text-gray-500 cursor-pointer
                            disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    >Previous</button>
                </li>
                <li>
                    <p
                        class="flex items-center justify-center cursor-default px-3 h-8 text-gray-600 dark:text-gray-400">{{ currentPage }}</p>
                </li>
                <li>
                    <div class="flex p-1 text-gray-600 dark:text-gray-400">
                        of
                    </div>
                </li>
                <li>
                    <p
                        class="flex items-center justify-center cursor-default px-3 h-8 text-gray-600 dark:text-gray-400">{{ totalPages }}</p>
                </li>
                <li>
                    <button
                        @click="next"
                        :disabled="currentPage === totalPages"
                        class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg
                            hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                            dark:hover:bg-gray-700 dark:hover:text-white
                            bg-white text-gray-500 cursor-pointer
                            disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                    >Next</button>
                </li>
            </ul>
        </nav>
    </div>
    <ConfirmDeleteDialog  :is-open="isOpen" @update:is-open="isOpen = $event" @deleteItem="deleteRow"/>
</template>

<script setup lang="ts">
import ConfirmDeleteDialog from '../dialogs/ConfirmDeleteDialog.vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import Loading from '../others/Loading.vue';

const {
    isOpen,
    itemId
} = useConfirmDialog()

const props = defineProps<{
  rows: Record<string, any>[],
  loading?: boolean,
  currentPage: number,
  totalPages: number
}>();

const deleteItem = (id: number) => {
    isOpen.value = true
    itemId.value = id
}

const emit = defineEmits<{
    (e: 'deleteRow'): void,
    (e: 'editItem', value: any): void
    (e: 'prev'): void
    (e: 'next'): void
}>();

const editItem = (row: any) => {
    emit('editItem', row);
}

const deleteRow = () => {
    emit('deleteRow')
}

const prev = () => {
    if(props.currentPage>1)
        emit('prev')
}

const next = () => {
    if(props.currentPage < props.totalPages)
        emit('next')
}

</script>
