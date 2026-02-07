<template>
    <div
        :class="badgeClass"
        class="inline-flex text-xs truncate items-center px-1.5 rounded-b-full font-semibold shadow-md gap-1 text-white border border-white/30 backdrop-blur-sm"
    >
    <span class="mdi mdi-creation pl-1"></span>
        <p class="font-medium">{{ title }}</p>
    <span class="mdi mdi-creation pr-1"></span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    type: string,
}>();

const badgeClass = computed(() => {
    switch (props.type) {
        case 'green':
            return 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400';
        case 'red':
            return 'bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400';
        case 'gray':
            return 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700';
        case 'yellow':
            return 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400';
        case 'purple':
            return 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400';
        default:
            return 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-700';
    }
});
</script>
