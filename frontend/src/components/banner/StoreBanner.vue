<template>
  <div
    :class="[
      'relative w-full overflow-hidden rounded-xl px-2 py-0.5 text-sm font-medium mt-1 md:mt-0',
      `bg-${theme}-100 text-${theme}-600 border border-${theme}-300`,
      `dark:bg-${theme}-600 dark:text-white`
    ]"
  >
    <div class="flex justify-between whitespace-nowrap animate-marquee min-w-full">
      <div v-for="i in 2" :key="i" class="flex items-center gap-2">
        <i class="mdi mdi-sale text-base opacity-80"></i>
        <span>{{ title }} - {{ sale }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    theme: string,
    type: string | undefined,
    value: number | undefined
}>();

const sale = computed(() => {
    if(props.type === 'percentage') {
        return `${props.value}% OFF`
    } else if(props.type === 'fixed') {
        return `₹${props.value} OFF`
    } else {
        return props.value
    }
})


</script>


<style scoped>
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  display: inline-flex;
  animation: marquee 20s linear infinite;
}
</style>
