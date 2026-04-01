<template>
    <div class="relative overflow-x-auto bg-white dark:bg-gray-800 mx-2 md:mx-4">
        <table class="w-full border border-gray-300 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs border-y border-gray-300 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Sl No</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Phone</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="customers.length === 0">
                    <td :colspan="5" class="text-center py-6 text-gray-500">
                        No data found!
                    </td>
                </tr>
                <tr v-else-if="loadingData">
                    <td :colspan="5" class="text-center py-6 text-gray-500">
                        <Loading />
                    </td>
                </tr>
                <tr v-else v-for="row, index in customers" :key="row.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                    <td class="px-6 py-4 cursor-pointer">{{ index + 1 }}</td>
                    <td class="px-6 py-4 cursor-pointer">{{ row.name }}</td>
                    <td class="px-6 py-4 cursor-pointer">{{ row.phone }}</td>
                    <td class="px-6 py-4 cursor-pointer">{{ row.email }}</td>
                    <td class="px-6 py-4 cursor-pointer">{{ row.address }}</td>
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
</template>

<script setup lang="ts">
import Loading from '../others/Loading.vue';
import { useCustomer } from '@/composables/useCustomer';

const {
    pagination,
    loadingData,
    customers,
    getData
} = useCustomer()

const prev = () => {
    getData(pagination.value.current_page - 1)
}

const next = () => {
    getData(pagination.value.current_page + 1)
}

const fetchPage = (page: number) => {
    getData(page)
}

</script>
