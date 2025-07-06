<template>
    <div class="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow transition-colors">
        <h1 class="text-lg sm:text-xl font-extrabold mb-6 sm:mb-10 text-gray-600 dark:text-white tracking-tight">Store Settings</h1>
        <form class="space-y-6 sm:space-y-8 w-full grid grid-cols-1 md:grid-cols-2 gap-x-0 sm:gap-x-6 md:gap-x-10">
            <div class="col-span-1">
                <label for="name" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Store Name</label>
                <input
                    id="name"
                    type="text"
                    v-model="form.name"
                    placeholder="Enter store name"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div class="col-span-1">
                <label for="slug" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Store Slug</label>
                <input
                    id="slug"
                    type="text"
                    v-model="form.slug"
                    placeholder="store-slug"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div class="col-span-1">
                <label for="logo" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Logo</label>
                <input
                    id="logo"
                    type="file"
                    class="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div class="col-span-1">
                <label for="cover_image" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Cover Image</label>
                <input
                    id="cover_image"
                    type="file"
                    class="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div class="col-span-1 md:col-span-2">
                <label for="description" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</label>
                <textarea
                    id="description"
                    v-model="form.description"
                    placeholder="Store description"
                    rows="3"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                ></textarea>
            </div>
            <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-center space-y-3 sm:space-y-4 md:space-y-0 md:space-x-8">
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        v-model="form.is_published"
                        id="is_published"
                        class="h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label for="is_published" class="ml-2 text-base text-gray-700 dark:text-gray-200 font-medium">Published</label>
                </div>
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        v-model="form.is_featured"
                        id="is_featured"
                        class="h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label for="is_featured" class="ml-2 text-base text-gray-700 dark:text-gray-200 font-medium">Featured</label>
                </div>
            </div>
            <div class="col-span-1">
                <label for="launch_at" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Launch Date</label>
                <input
                    id="launch_at"
                    type="date"
                    v-model="form.launch_at"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div class="col-span-1">
                <label for="category_id" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Category</label>
                <select
                    id="category_id"
                    v-model="form.category_id"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                >
                    <option value="" disabled>Select category</option>
                    <option value="1">Fashion</option>
                    <option value="2">Electronics</option>
                    <option value="3">Home</option>
                </select>
            </div>
            <div class="col-span-1">
                <label for="theme_id" class="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">Theme</label>
                <select
                    id="theme_id"
                    v-model="form.theme_id"
                    class="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                >
                    <option value="" disabled>Select theme</option>
                    <option value="1">Light</option>
                    <option value="2">Dark</option>
                </select>
            </div>
            <div class="col-span-1 md:col-span-2">
                <button
                    type="submit"
                    class="inline-block w-full sm:w-auto py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transition duration-200 text-sm md:text-base tracking-wide focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                    Save Settings
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    name: '',
    slug: '',
    description: '',
    is_published: false,
    is_featured: false,
    launch_at: '',
    category_id: '',
    theme_id: '',
});
</script>

<style scoped>

</style>