<template>
    <button
        @click="handleClick"
        :class="btnClass"
        class="w-full sm:w-auto px-6 py-2 font-medium rounded-md shadow transition duration-200 cursor-pointer"
      >
      <span :class="icon"></span>
        {{ !loading ? title : '' }}
        <Loading v-if="loading"/>
      </button>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loading from '../others/Loading.vue';

const props = defineProps<{
  title: string,
  type: string,
  icon?: string,
  loading?: boolean
}>();

const btnClass = ref('')

const typeClassMap: Record<string, string> = {
    primary: "bg-pink-600 hover:bg-pink-700 text-white",
    negative: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border hover:bg-pink-100 dark:hover:bg-gray-600"
};

onMounted(() => {
    btnClass.value = typeClassMap[props.type] || "";
});

const emit = defineEmits<{
  (e: 'click'): void
}>();

const handleClick = () => {
  emit('click');
}
</script>
