<template>
    <div class="space-y-4">
        <!-- Main Product Image -->
        <div class="max-w-1/3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="mainImage">
                Main Product Image
            </label>
            <input
                id="mainImage"
                type="file"
                accept="image/*"
                @change="onMainImageChange"
                class="block w-full text-sm cursor-pointer text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div v-if="defaultImage?.image_path || defaultImage?.preview_url" class="mt-2 flex items-center space-x-2">
                <div class="relative group cursor-zoom-in w-16 h-16 rounded border overflow-hidden" @click="viewImage(defaultImage.preview_url || storageUrl(defaultImage.image_path || ''))">
                    <img 
                        :src="defaultImage.preview_url || storageUrl(defaultImage.image_path || '')"
                        alt="Main Image Preview" 
                        class="h-full w-full object-cover"
                    />
                    <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span class="mdi mdi-plus-circle text-blue-500 text-xl"></span>
                    </div>
                </div>
                <button
                    type="button"
                    @click="removeMainImage"
                    class="text-red-500 hover:underline text-xs cursor-pointer"
                >
                    Remove
                </button>
            </div>
        </div>

        <!-- Gallery Images -->
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" for="galleryImages">
                Gallery Images
            </label>
            <input
                id="galleryImages"
                type="file"
                accept="image/*"
                multiple
                @change="onGalleryImagesChange"
                class="block w-full text-sm cursor-pointer text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div v-if="images?.length" class="mt-2 flex flex-wrap gap-2">
                <div
                    v-for="img in images"
                    :key="img.id"
                    class="relative group"
                >
                    <div class="relative group cursor-zoom-in w-16 h-16 rounded border overflow-hidden" @click="viewImage(img.preview_url || storageUrl(img.image_path || ''))">
                        <img
                        :src="img.preview_url || storageUrl(img.image_path || '')"
                        alt="Gallery Image"
                        class="h-16 w-16 object-cover rounded"
                        />
                        <div class="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span class="mdi mdi-plus-circle text-blue-500 text-xl"></span>
                        </div>
                    </div>
                    <button
                        type="button"
                        @click="removeGalleryImage(img.id)"
                        class="cursor-pointer absolute top-0 right-0 bg-white bg-opacity-80 rounded-full px-1 text-xs text-red-500 hover:bg-opacity-100"
                        title="Remove"
                        >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    </div>
    <ViewProductImage />
</template>

<script setup lang="ts">
import { useProduct } from '@/composables/useProduct'
import { storageUrl } from '@/config'
import ViewProductImage from '../dialogs/view/VewProductImage.vue'

const {
    defaultImage,
    images,
    deletedImageIds,
    isMagnify,
    previewImageUrl
} = useProduct()


const onMainImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
        defaultImage.value = {
            file: file,
            preview_url: URL.createObjectURL(file)
        }
    }
}

const removeMainImage = () => {
    defaultImage.value = null
    //   deletedImageIds.value.push(Number(removed.id));
}

const onGalleryImagesChange = (e: any) => {
  const files = Array.from(e.target.files) as File[];

  const newGalleryImages = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    preview_url: URL.createObjectURL(file),
  }));

  images.value.push(...newGalleryImages);
};

const removeGalleryImage = (id: number | string) => {
  const removed = images.value.find(img => img.id === id);

  if (removed && !removed.file && removed.id) {
    deletedImageIds.value.push(Number(removed.id));
  }

  images.value = images.value.filter(img => img.id !== id);
};

const viewImage = (url: string) => {
    previewImageUrl.value = url;
    isMagnify.value = true
}

</script>
