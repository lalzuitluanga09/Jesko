<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="name"
      >Product Name</label
    >
    <input
      ref="inputRef"
      id="name"
      type="text"
      v-model="formData.name"
      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
      placeholder="Enter product name"
    />
  </div>
  <!-- Description -->
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="description"
      >Description</label
    >
    <textarea
        id="description"
        rows="3"
        v-model="formData.description"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Enter product description"
    ></textarea>
  </div>
  <!-- Price & Stock -->
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="price"
        >Price (₹)</label
      >
      <input
        id="price"
        type="number"
        v-model="formData.price"
        min="0"
        step="0.01"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        placeholder="0.00"
      />
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="stock"
        >Stock</label
      >
      <input
        id="stock"
        type="number"
        v-model="formData.stock"
        min="0"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        placeholder="0"
      />
    </div>
  </div>
  <!-- Category & tag -->
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="price"
        >Category</label
      >
        <VueSelect placeholder="Select" label="name" :reduce="(item: Category) => item.id" :options="categoryData" v-model="formData.category_ids" multiple/>
    </div>
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="stock"
        >Tag</label
      >
        <VueSelect placeholder="Select" label="name" :reduce="(item: Tag) => item.id"  :options="tagData" v-model="formData.tag_ids" multiple/>
    </div>
  </div>

  <!-- SKU -->
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="sku"
      >SKU</label
    >
    <input
      id="sku"
      type="text"
      v-model="formData.sku"
      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
      placeholder="Enter SKU"
    />
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';
import VueSelect from "vue-select"
import { useCategory } from '@/composables/useCategory';
import { useTag } from '@/composables/useTag';
import type { Tag } from '@/types/tag';
import type { Category } from '@/types/category';
import { nextTick, onMounted, ref } from 'vue';

const { 
  formData,
} = useProduct()

const {
  data: categoryData,
} = useCategory()

const {
  data: tagData,
} = useTag();


const inputRef = ref<HTMLInputElement | null>(null)

onMounted( async() => {
  await nextTick()
  inputRef.value?.focus()
})

</script>