<template>
  <div>
    <div v-if="isDialogOpen" class="w-full h-[100vh] bg-black/20 fixed inset-0 z-10">
    </div>
    <Transition name="slide">
      <div v-if="isDialogOpen" class="fixed inset-0 flex my-1 justify-end z-20" @click.self="close('self')">
        <div class="bg-white dark:bg-gray-700 w-full max-w-5xl p-8 rounded-lg shadow-xl overflow-y-auto">
          <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{{ editId == 0 ? 'Add' : 'Edit' }} Product</h1>
          <form class="space-y-6" @submit.prevent="() => (editId === 0 ? save() : update()) ">
            <ProductDataInput />
            <VariationInput v-if="editId == 0"/>
            <VariationEdit v-if="selected?.type == 'variable'"/>
            <ImageInput />
            <div class="flex flex-col gap-1 text-sm">
              <label class="mr-4 text-gray-700 dark:text-gray-300 font-medium">Status:</label>
              <div class="flex items-center ">
                <button type="button" :class="[
                  'px-3 py-1.5 rounded-l-lg font-medium border transition',
                  formData.status == 'draft'
                    ? 'bg-gray-400 text-white border-gray-400'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300'
                ]" @click="formData.status = 'draft'">
                  Draft
                </button>
                <button type="button" :class="[
                  'px-3 py-1.5 rounded-r-lg font-medium border transition',
                  formData.status == 'active'
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300'
                ]" @click="formData.status = 'active'">
                  Active
                </button>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" @click="close('cancel')"
                class="px-5 py-2 rounded cursor-pointer border border-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Cancel
              </button>
              <button type="submit"
                class="px-5 py-2 rounded cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition font-semibold">
                {{ editId == 0 ? 'Create' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';
import ProductDataInput from '../product/ProductDataInput.vue';
import VariationInput from '../product/VariationInput.vue';
import ImageInput from '../product/ImageInput.vue';
import VariationEdit from '../product/VariationEdit.vue';

const {
  formData,
  isDialogOpen,
  editId,
  selected,
  save,
  update,
  closeAddDialog,
  closeEditDialog
} = useProduct()

const close = (key: string) => {
  if(editId.value> 0){
    closeEditDialog()
  } else if(key == 'self') {
    isDialogOpen.value = false
  } else if ( key == ' cancel') {
    closeAddDialog()
  }
}

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