<template>
  <div class="lg:px-10">
    <Banner />
    <TopStores />
    <!-- <StoreProducts /> -->
  </div>
</template>


<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import TopStores from '@/components/TopStores.vue';
import { useStore } from '@/composables/useStore';
import { onMounted } from 'vue';

const {
  getTopStores
} = useStore()

onMounted(async() => {
  await getTopStores()
})

</script>
