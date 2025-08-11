<template>
    <div>
        <div v-if="isDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
        </div>
        <Transition name="slide">
            <div v-if="isDialogOpen" class="fixed inset-0 flex justify-end z-20 mb-14 md:mb-0" @click.self="closeDialog">
                <div class="w-full max-w-2xl max-h-screen md:px-4 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-y-auto">
                    <form class="space-y-6 p-6"
                        @submit.prevent="() => (isEdit ? update(formData.item.id) : save())">
                        <h1 class="text-lg md:text-xl font-semibold">
                            {{ isEdit ? 'Edit Item' : 'Add New Item' }}
                        </h1>
                        <div class="space-y-4">
                            <div>
                                <label for="title"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Title</label>
                                <input ref="inputRef" id="title" type="text" v-model="formData.item.title" required
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Enter title" />
                            </div>
                            <div>
                                <label for="description"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
                                <textarea id="description" rows="3" v-model="formData.item.description"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Write a brief description"></textarea>
                            </div>
                            <div>
                                <label for="price"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Price</label>
                                <input id="price" type="number" v-model="formData.item.price" min="0" step="1" required
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Enter price" />
                            </div>
                            <div>
                                <label for="condition"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Condition</label>
                                <select id="condition" v-model="formData.item.condition" required
                                    class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="used">Used</option>
                                    <option value="new">New</option>
                                </select>
                            </div>
                            <div>
                                <label for="category"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category</label>
                                <select id="category" v-model="formData.item.category_id"
                                    class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div>
                                <label for="location"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Location</label>
                                <select id="location" v-model="formData.item.location_id"
                                    class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option disabled value="">Select location</option>
                                    <option value="1">Location #1</option>
                                    <option value="2">Location #2</option>
                                </select>
                            </div>
                            <div>
                                <label for="tags"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tags</label>
                                <textarea id="tags" rows="2" v-model="formData.item.tags"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="#tags (e.g., #electronics #offer)"></textarea>
                            </div>

                        </div>
                        <!-- <div class="flex  text-xs md:text-sm">
                            <button type="button" :class="[
                                'px-4 py-2 rounded-l-md font-medium border border-gray-300 transition-all duration-200 cursor-pointer',
                                formData.item.status === 'draft'
                                    ? 'bg-gray-500 text-white '
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                            ]" @click="formData.item.status = 'draft'">
                                Draft
                            </button>
                            <button type="button" :class="[
                                'px-4 py-2 rounded-r-md font-medium border border-gray-300 transition-all duration-200 cursor-pointer',
                                formData.item.status === 'active'
                                    ? 'bg-blue-600 text-white '
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                            ]" @click="formData.item.status = 'active'">
                                Active
                            </button>
                        </div> -->

                <!-- Images Input  -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="galleryImages">
                            Gallery Images
                        </label>
                        <div class="relative w-full">
                            <input
                            v-if="formData.images.length < 4"
                            id="galleryImages"
                            type="file"
                            accept="image/*"
                            multiple
                            @change="onGalleryImagesChange"
                            class="block w-full text-sm cursor-pointer text-gray-600 dark:text-gray-300
                                    file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
                                    file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700
                                    transition duration-150"
                            />
                            <p v-else class="text-red-500 text-sm cursor-default">Image input limit reach</p>
                        </div>
                        <div v-if="formData.images?.length" class="mt-4 flex flex-wrap gap-2">
                            <div
                                v-for="img in formData.images"
                                :key="img.id"
                                class="relative group"
                            >
                                <div class="relative group cursor-zoom-in w-32 h-32 rounded border overflow-hidden">
                                    <img
                                    :src="img.image_url ? storageUrl(img.image_url) : img.preview_url"
                                    alt="Gallery Image"
                                    class="w-32 h-32 object-cover rounded"
                                    />
                                    <div class="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <span class="mdi mdi-plus-circle text-blue-500 text-xl"></span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    @click="removeGalleryImage(img.id)"
                                    class="cursor-pointer absolute top-0 right-0 bg-white hover:bg-red-300 bg-opacity-80 rounded-full px-1 text-sm text-red-500 hover:bg-opacity-100"
                                    title="Remove"
                                    >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between text-sm md:text-base">
                        <button v-if="isEdit" type="button" @click="deleteItem(formData.item.id)"
                                class="px-3 py-1 md:px-5 md:py-2 cursor-pointer rounded border border-red-300 dark:border-red-600 bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 transition">
                                Delete
                            </button>
                        <div class="flex w-full justify-end gap-3">
                            <button type="button" @click="closeDialog"
                                class="px-3 py-1 md:px-5 md:py-2 cursor-pointer rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-3 py-1 md:px-5 md:py-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold">
                                {{ isEdit ? 'Update' : 'Submit' }}
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useMarket } from '@/composables/useMarket';
import { storageUrl } from '@/config';


const {
    isEdit,
    isDialogOpen,
    formData,
    categories,
    deletedImageIds,
    save,
    update,
    closeDialog,
    deleteItem
} = useMarket()



const onGalleryImagesChange = (e: any) => {
  const files = Array.from(e.target.files) as File[];

  const currentCount = formData.value.images.length;
  const availableSlots = 4 - currentCount;

  if (availableSlots <= 0) {
    alert('You can only upload up to 5 images.');
    return;
  }

  const limitedFiles = files.slice(0, availableSlots);

  const newGalleryImages = limitedFiles.map((file) => ({
    id: crypto.randomUUID(),
    file,
    position: 0,
    image_url: '',
    preview_url: URL.createObjectURL(file),
  }));

  formData.value.images.push(...newGalleryImages);

  // Optional: Reset input to allow re-uploading same file
  e.target.value = null;
};

const removeGalleryImage = (id: number | string) => {
  const removed = formData.value.images.find(img => img.id === id);

  if (removed && !removed.file && removed.id) {
    deletedImageIds.value.push(Number(removed.id));
  }

  formData.value.images = formData.value.images.filter(img => img.id !== id);
};

</script>

<style scoped>
.slide-enter-active {
    animation: slide-in-right 0.4s ease-out forwards;
}

.slide-leave-active {
    animation: slide-out-right 0.3s ease-in forwards;
}

@keyframes slide-in-right {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0%);
        opacity: 1;
    }
}

@keyframes slide-out-right {
    0% {
        transform: translateX(0%);
        opacity: 1;
    }

    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>