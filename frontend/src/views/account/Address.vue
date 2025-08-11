<template>
  <div class="max-w-2xl mx-auto px-2 py-6">
    <h1 class="text-lg md:text-2xl font-bold text-center mb-6">My Addresses</h1>
    <div v-if="loadData" class="flex justify-center items-center h-64">
      <Loading />
    </div>
    <div v-else v-for="address in addresses" :key="address.id"
      class="flex items-center justify-between mb-4 p-4 border rounded-xl" :class="{
        ' border-pink-500 ': address.is_default,
        ' border-gray-500 ': !address.is_default
      }">
      <div class="flex flex-col text-sm md:text-base">
        <h2 v-if="address.is_default" class="font-semibold text-pink-700 dark:text-pink-500 mb-1">{{ address.label }}
          <span v-if="address.is_default">(Default)</span></h2>
        <h2 v-else class="font-semibold mb-1">{{ address.label }}</h2>
        <p class="text-gray-700 dark:text-gray-300 line-clamp-2">{{ address.address }} - {{ address.postal_code }}</p>

        <p class="text-gray-500 dark:text-gray-400">Phone: {{ address.phone }}</p>
        <button v-if="!address.is_default" @click="setDefault(address.id)"
          class="w-max inline-block px-4 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-400 rounded-2xl mt-2 cursor-pointer">
          <Loading v-if="loading" class="inline-block mr-2" />
          <span v-else>Set as Default</span>
        </button>
      </div>
      <button @click="openEditDialog(address)" title="Edit Address"
        class="px-2 py-1 text-white bg-pink-400 dark:bg-pink-500 rounded-full cursor-pointer">
        <span class="mdi mdi-pencil"></span>
      </button>
    </div>

    <!-- Add Address Button -->
    <div class="text-center">
      <button @click="openDialog"
        class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md shadow-md transition">
        + Add New Address
      </button>
    </div>
  </div>
  <AddAddressDialog />
</template>


<script setup lang="ts">
import AddAddressDialog from '@/components/dialogs/AddAddressDialog.vue';
import Loading from '@/components/others/Loading.vue';
import { useAddress } from '@/composables/useAddress';
import { onMounted } from 'vue';

const {
  addresses,
  loadData,
  loading,
  fetchAddresses,
  openDialog,
  setDefault,
  openEditDialog
} = useAddress()

onMounted(() => {
  fetchAddresses()
})

</script>

<style scoped></style>