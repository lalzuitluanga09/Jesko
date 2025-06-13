<template>
    <div class="flex flex-col items-center space-y-4">
        <div class="relative">
            <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile"
                class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
                class="absolute bottom-1 right-1 md:bottom-2 md:right-2 cursor-pointer bg-pink-600 text-white px-2 py-1 rounded-full shadow hover:bg-pink-700 transition"
                aria-label="Edit profile image"
            >
                <i class="mdi mdi-pencil"></i>
            </button>
        </div>
        <span class="text-base md:text-lg font-medium">Your Name</span>
    </div>
</template>

<script setup lang="ts">
// Add logic for editing if needed
</script>

<style scoped>
</style>