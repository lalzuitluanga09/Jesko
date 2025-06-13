<template>
    <div class="flex items-center">
        <i class="mdi mdi-map-marker text-gray-500 border border-gray-300 border-r-gray-50 p-1 rounded-l-lg"></i>
        <VueSelect class="w-[140px]" lable="test" :options="options" v-model="selected"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueSelect from "vue-select"

const options = [ 'Aizawl', 'Lunglei', 'Serchhip', 'Siaha']
const selected = ref('Aizawl')

</script>


<style scoped>


</style>
