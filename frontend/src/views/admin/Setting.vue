<template>
  <div class="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-200">
    <h1 class="text-lg md:text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 tracking-tight">
      Store Settings
    </h1>

    <form class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" @submit.prevent="save">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Store Name
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Enter store name"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Store Slug
        </label>
        <input
          id="slug"
          v-model="form.slug"
          type="text"
          placeholder="store-slug"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

     <div>
        <label for="logo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo
        </label>
        <input
            id="logo"
            type="file"
            :key="logoInputKey"
            accept="image/*"
            @change="onLogoChange"
            class="block w-full text-sm text-gray-700 dark:text-gray-200
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
            <div v-if="preview?.logo || form.logo_preview" class="mt-3 relative inline-block">
                <img
                :src="preview.logo ? storageUrl(preview.logo) : form.logo_preview"
                alt="Logo Preview"
                class="w-20 h-20 object-cover rounded-full border border-gray-200 dark:border-gray-600 shadow-sm"
                />
                 <button
                    @click="removeLogo"
                    type="button"
                    class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-1 shadow-md focus:outline-none"
                    >
                    ✕
                </button>
            </div>
        </div>

        <div class="mt-6">
        <label for="cover_image" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover Image
        </label>
        <input
            id="cover_image"
            type="file"
            :key="coverInputKey"
            accept="image/*"
            @change="onCoverChange"
            class="block w-full text-sm text-gray-700 dark:text-gray-200
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
            <div v-if="preview.cover || form.cover_preview" class="mt-3 relative inline-block">
                <img
                :src="preview.cover ? storageUrl(preview.cover) : form.cover_preview"
                alt="Cover Preview"
                class="w-full max-w-md h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                />
                <button
                    @click="removeCover"
                    type="button"
                    class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-1 shadow-md focus:outline-none"
                    >
                    ✕
                </button>
            </div>
        </div>

      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Store description"
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
        ></textarea>
      </div>
      <div>
        <label for="category_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category_id"
          v-model="form.category_id"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="" disabled>Select category</option>
          <option v-for="item in storeCategories" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>

      <div>
        <label for="theme_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Theme
        </label>
        <select
          id="theme_id"
          v-model="form.theme_id"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="" disabled>Select theme</option>
          <option v-for="item in storeThemes" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>

      <div class="md:col-span-2 flex justify-end">
        <button
          type="submit"
          class="inline-flex cursor-pointer items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg shadow hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-200"
        >
          Save Settings
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useStoreSetting } from '@/composables/useStoreSetting';
import { storageUrl } from '@/config';
import { useMeta } from '@/stores/meta';
import { onMounted, ref } from 'vue';

const logoInputKey = ref(Date.now());
const coverInputKey = ref(Date.now());

const {
    form,
    preview,
    updateForm,
    save
} = useStoreSetting()

const {
    storeCategories,
    storeThemes,
    getMeta
} = useMeta()

function onLogoChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    form.value.logo = file
    form.value.logo_preview = URL.createObjectURL(file);
    preview.value.logo = undefined
  }
}

function onCoverChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    form.value.cover_image = file
    form.value.cover_preview = URL.createObjectURL(file);
    preview.value.cover = undefined
  }
}

const removeLogo = () => {
  form.value.logo = null
  form.value.logo_preview = '';
  preview.value.logo = undefined
  logoInputKey.value = Date.now(); 
}

const removeCover = () => {
  form.value.cover_image = null
  form.value.cover_preview = '';
  preview.value.cover = undefined
  coverInputKey.value = Date.now(); 
}

onMounted(async() => {
    await getMeta();
    updateForm()
})

</script>