<template>
    <div class="flex items-center justify-center py-2 mr-2 w-full">
        <div class="relative w-full">
            <input
                type="text"
                autofocus
                :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
                placeholder="Search store..."
                @keydown.enter.prevent="handleSearch()"
                :class="`w-full pl-10 pr-4 py-2 rounded-lg text-${theme || 'gray'}-400 border border-${theme || 'gray'}-300 focus:outline-none focus:ring-2 focus:ring-${theme || 'gray'}-500 shadow-sm transition`"
            />
            <span @click="handleSearch" :class="`absolute left-3 top-1/2 transform -translate-y-1/2 text-${theme || 'gray'}-400`">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>
            <span :class="`absolute right-3 top-1/2 transform -translate-y-1/2 text-${theme || 'gray'}-400 mdi mdi-close text-xl cursor-pointer`" v-if="modelValue"
               @click="clear"
            ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string,
  theme?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'search'): void
    (e: 'clear'): void
}>();

const clear = () => {
    emit('clear')
}

const handleSearch = () => {
    emit('search')
}

</script>

<style scoped>
</style>