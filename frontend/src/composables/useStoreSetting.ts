import { ref } from 'vue'
import { useAdmin } from './useAdmin';
import { adminApi } from '@/lib/axios';
import { useNotify } from './useNotify';

const loading = ref<boolean>(false)

interface StoreForm {
  name: string;
  slug: string;
  logo: File | null,
  logo_preview?: string
  cover_image: File | null,
  cover_preview?: string
  description: string;
  launch_at: Date | null;
  category_id: number | null;
  theme_id: number | null;
}

const form = ref<StoreForm>({
  name: '',
  slug: '',
  logo: null,
  cover_image: null,
  description: '',
  launch_at: null,
  category_id: null,
  theme_id: null,
});

const preview = ref<{
    logo: string | undefined,
    cover: string | undefined
}>({
    logo: undefined,
    cover: undefined
})

const {
    currentStore
} = useAdmin()

const {
    notifySuccess
} = useNotify()

export function useStoreSetting() {


    const updateForm = () => {
        form.value.name = currentStore.value?.name || ''
        form.value.slug = currentStore.value?.slug || ''
        form.value.description = currentStore.value?.description || ''
        form.value.category_id = currentStore.value?.category_id || null 
        form.value.theme_id = currentStore.value?.theme_id || null 
        preview.value.logo = currentStore.value?.logo
        preview.value.cover = currentStore.value?.cover_image
        form.value.logo_preview = preview.value.logo
        form.value.cover_preview = preview.value.cover
    }

      const save = async () => {
        const formData = new FormData()
        Object.entries(form.value).forEach(([key, value]) => {
            if (Array.isArray(value)) {
            value.forEach((v) => {
                formData.append(`store[${key}][]`, v instanceof File || v instanceof Blob ? v : v.toString());
            });
            } else if (value !== null && value !== undefined) {
            if (value instanceof File || value instanceof Blob) {
                formData.append(`store[${key}]`, value);
            } else {
                formData.append(`store[${key}]`, value.toString());
            }
            }
        });
        loading.value = true
        try {
          await adminApi.post(`/${currentStore.value?.slug}/store-data/${currentStore.value?.id}`, formData);
          notifySuccess('Updated Successfully')
        } catch (error) {
            console.log(error)
        }
      }

  return {
    form,
    preview,
    save,
    updateForm,
  }
}
