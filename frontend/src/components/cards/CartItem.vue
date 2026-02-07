<template>
    <div class="flex items-center p-4 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-gray-600 rounded-xl border border-gray-200 shadow-sm gap-3 cursor-pointer">
        <img :src="item.product_image ? storageUrl(item.product_image) : '/images/product.png'"  alt="Product" class="w-20 h-20 object-cover rounded-lg border border-gray-100" @click="handleClick"/>
        <div class="flex-1 min-w-0" @click="handleClick">
            <h3 class="text-base font-semibold truncate"> {{ item.product_name }}</h3>
            <p class="text-sm text-gray-400 truncate">
               {{ item.product_categories?.join(', ') || ''}}
            </p>
            <div class="flex items-center gap-1 md:gap-2">
                <h1 class="text-base md:text-lg">
                ₹ {{ displayPrice }}
                </h1>

                <p v-if="discount && discountType !== 'bogo'" class="text-xs line-through text-gray-500 dark:text-gray-400">
                ₹ {{ originalPrice }}
                </p>

                <span v-if="discountType === 'percentage'" class="mdi mdi-arrow-down text-sm text-green-600 dark:text-green-400">
                {{ discount?.value }}%
                </span>

                <span v-if="discountType === 'fixed'" class="mdi mdi-arrow-down text-sm text-green-600 dark:text-green-400">
                ₹{{ discount?.value }}
                </span>
            </div>
            <p v-if="discountType === 'bogo'" class="mdi mdi-star-four-points text-xs text-yellow-500" :title="'Buy ' + discount?.bogo?.bogoX + ' and get ' + discount?.bogo?.bogoY + ' free'">
                {{ bogoText }}
            </p>
        </div>
        <div class="flex flex-col items-end gap-2 ml-1">
            <button class="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-200 px-1 rounded-4xl transition-colors"
                @click="remove" title="Remove item">
                <span class="mdi mdi-trash-can text-2xl"></span>
            </button>
            <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
                <button class="p-0.5 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-base sm:text-lg"
                    @click="decrease" :disabled="localQuantity <= 1">
                    <span class="mdi mdi-minus"></span>
                </button>
                <span class="mx-2 w-4 text-center select-none text-sm md:text-base sm:mx-3 ">{{ localQuantity }}</span>
                <button class="p-0.5 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-base sm:text-lg"
                    @click="increase">
                    <span class="mdi mdi-plus"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@/types/cart';
import { computed, ref } from 'vue';
import { useNotify } from '@/composables/useNotify';
import { storageUrl } from '@/config';
import { useStore } from '@/composables/useStore';

const {
  notifyWarning
} = useNotify()

const props = defineProps<{
    item: CartItem,
    slug: string
}>();

const { getProductData } = useStore();

const discount = computed(() => props.item.discount);
const discountType = computed(() => discount.value?.type || null);

const displayPrice = computed(() => {
  return discount.value && discountType.value !== 'bogo'
    ? props.item.discount_price
    : props.item.price_at_addition;
});

const bogoText = computed(() => {
  if (discountType.value === 'bogo' && discount.value?.bogo) {
    const { bogoX, bogoY } = discount.value.bogo;
    const qty = props.item.quantity;

    if (qty < bogoX) {
      return `Add ${bogoX - qty} more to get ${bogoY} free`;
    }

    // Free items based only on X (not X+Y)
    const freeItems = Math.floor(qty / bogoX) * bogoY;

    return `You are eligible for ${freeItems} free`;
  }
  return '';
});



const originalPrice = computed(() => Math.round(props.item.price_at_addition));

const localQuantity = ref(props.item.quantity);

const increase = () => {
  if(localQuantity.value < props.item.stock) {
    localQuantity.value++;
    emitUpdate();
  } else {
    notifyWarning('Maximum order limit reached');
  }
};

const decrease = () => {
  if (localQuantity.value > 1) {
    localQuantity.value--;
    emitUpdate();
  }
};

const emit = defineEmits<{
  (e: 'update:quantity', value: number): void;
}>();

const emitUpdate = () => {
  emit('update:quantity', localQuantity.value);
};

const cart = useCartStore()

const handleClick = () => {
  getProductData(props.item.product_id)
    router.push({
        name: 'product-detail',
        params: {
            storeslug: props.slug,
            id: props.item.product_id
        }
    })
}

const remove = async() => {
    await cart.removeItem(props.item.product_id)
}
</script>

<style scoped></style>