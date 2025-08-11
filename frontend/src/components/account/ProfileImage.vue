<template>
    <div class="flex flex-col items-center space-y-4">
        <div class="relative">
            <img
                :src="auth.user?.profile_image ? storageUrl(auth.user.profile_image) : previewImage"
                alt="Profile"
                class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button v-if='router.currentRoute.value.name === "profile"' title="Change Profile Image"
                class="absolute bottom-1 right-1 md:bottom-2 md:right-2 cursor-pointer bg-pink-600 text-white px-2 py-1 rounded-full shadow hover:bg-pink-700 transition"
                aria-label="Edit profile image"
                @click="triggerFileInput"
            >
                <i class="mdi mdi-pencil"></i>
            </button>
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange($event)"
            />
            <button v-if='router.currentRoute.value.name === "profile" && auth.user?.profile_image' title="Remove profile image"
                class="absolute bottom-1 left-1 md:bottom-2 md:left-2 cursor-pointer bg-gray-500 text-white px-2 py-1 rounded-full shadow hover:bg-gray-400 transition"
                aria-label="Remove profile image"
                @click="removeProfileImage"
            >
                <i class="mdi mdi-close"></i>
            </button>
        </div>
        <span class="text-base md:text-lg font-medium">{{ auth.user?.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storageUrl } from '@/config';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const auth = useAuthStore();
const fileInput = ref<HTMLInputElement | null>(null);

const previewImage = ref<string>('https://randomuser.me/api/portraits/men/1.jpg');

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        auth.formData.profile_image = file;
        auth.formData.delete_profile_image = false;

        // Create a preview URL
        if (previewImage.value) {
            URL.revokeObjectURL(previewImage.value);
        }
        previewImage.value = URL.createObjectURL(file);
    }
};

const removeProfileImage = () => {
    auth.formData.profile_image = null;
    previewImage.value = 'https://randomuser.me/api/portraits/men/1.jpg';
    if (fileInput.value) {
        fileInput.value.value = '';
    }
    if (auth.user) {
        auth.user.profile_image = null;
    }
    auth.formData.delete_profile_image = true;
};
</script>
