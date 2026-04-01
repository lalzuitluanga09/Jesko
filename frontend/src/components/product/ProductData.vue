<template>
    <div class="flex flex-col justify-between">
        <div class="relative cursor-default">
            <button
                @click.stop="handleWishlistAction(
                auth.userMeta.wishlists.includes(productData.item?.id || 0) ? 'remove' : 'add'
                )"
                :class="`absolute top-3 right-10 z-30 text-xl text-${productData.seller?.theme}-600 hover:bg-${productData.seller?.theme}-100 border border-${productData.seller?.theme}-400 px-1 rounded-lg shadow-sm cursor-pointer transition-colors duration-200`"
            >
                <span
                :class="auth.userMeta.wishlists.includes(productData.item?.id || 0)
                    ? 'mdi mdi-heart'
                    : 'mdi mdi-heart-outline'"
                ></span>
            </button>
            <!-- <button
                :class="`absolute right-2 md:right-0 cursor-pointer top-3 text-xl text-${productData.seller?.theme}-600 hover:bg-${productData.seller?.theme}-100 border border-${productData.seller?.theme}-400 px-1 rounded-lg`">
                <span class="mdi mdi-share-variant"></span>
            </button> -->
            <h1 class="text-xl md:text-3xl font-bold my-2">{{ productData.item?.name }}</h1>
            <p :class="`mb-2 text-sm md:text-base text-${productData.seller?.theme}-600 truncate`">
                <span class="font-bold">Seller: </span><span class="hover:underline cursor-pointer" @click="goToStore">{{ productData.seller?.name }}</span>
            </p>
            <p v-if="productData.item?.category_ids ? productData.item?.category_ids?.length > 0 : false" class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2"><span class="font-bold">Category:</span>
                {{
                    productData.item?.category_ids
                        ?.map(id => storeData.categories.find(c => String(c.id) === String(id))?.name)
                        ?.filter(Boolean)
                        ?.join(', ') || '—'
                }}
            </p>
            <p v-if="productData.item?.tag_ids ? productData.item?.tag_ids?.length > 0 : false" class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4"><span class="font-bold">Tag:</span>
                #{{
                    productData.item?.tag_ids
                        ?.map(id => storeData.tags.find(c => String(c.id) === String(id))?.name)
                        ?.filter(Boolean)
                        ?.join(', #') || '—'
                }}
            </p>
            <div class="mb-4 flex gap-2 items-center">
              <div>
                <span :class="`text-xl md:text-2xl font-semibold text-${productData.seller?.theme}-600`">
                  ₹{{ variantPrice || (productData.item?.isSale && productData.item.discount?.type != 'bogo' ? productData.item?.discount_price : productData.item?.price) }}
                </span>
                <span v-if="productData.item?.isSale && productData.item.discount?.type != 'bogo'" class="ml-2 text-sm text-gray-400 line-through" >
                  {{ productData.item?.price }}
                </span>
              </div>
              <div :title="productData.item?.discount?.name">
                <span v-if="badgeTitle" class="border px-2 py-1 rounded-xl text-sm text-primary border-primary dark:text-gray-300 dark:border-gray-300">
                  <span v-if="productData.item?.badge === 'red'" class="mdi mdi-creation "></span>
                  <span v-else-if="productData.item?.badge === 'yellow'" class="mdi mdi-flare "></span>
                  {{ badgeTitle }}
                </span>
              </div>
            </div>
            <div class="mb-4" v-if="productData.attribute.length">
              <div class="mb-4"  v-for="(item, idx) in productData.attribute" :key="idx" >
                  <label class="block mb-2 font-medium">{{ item.name }}</label>
                  <div class="flex flex-wrap gap-2" v-if="item.name.toLowerCase() === 'color' || item.name.toLowerCase() === 'colour'">
                      <span
                          v-for="(color, idx) in item.values"
                          :key="idx"
                          :title="color"
                          class="w-6 h-6 inline-block border border-gray-400 rounded-full cursor-pointer mr-2 transition-all duration-200"
                          @click="select(item.name, color)"
                          :style="{ backgroundColor: color}"
                          :class="[
                              selectedItems.find(sel => sel[item.name] === color)
                              ? 'ring-2 ring-offset-2 ring-primary'
                              : 'hover:ring-2 hover:ring-offset-2 hover:ring-primary/30'
                          ]"
                          ></span>
                  </div>
                  <div class="flex flex-wrap gap-2" v-else>
                      <span v-for="(label, idx) in item.values" :key="idx"
                          class="px-3 py-1 border border-primary text-primary rounded-xl cursor-pointer"
                          @click="select(item.name, label)"
                          :class="[
                              selectedItems.find(sel => sel[item.name] === label)
                              ? 'bg-primary/20 dark:bg-primary/30'
                              : 'hover:bg-primary/10 dark:hover:bg-primary/20'
                          ]"
                          >
                          {{ label }}
                      </span>
                  </div>
              </div>
            </div>
            <div
                class="mb-4 pt-4 flex flex-col gap-4 ">
                <div class="flex items-center md:items-start gap-4 md:gap-2 ">
                    <div class="flex flex-col">
                        <label class="block mb-2 font-medium">Quantity</label>
                        <div class="flex items-center rounded w-fit">
                            <button
                                :class="`text-lg border border-${productData.seller?.theme}-400 rounded-lg text-${productData.seller?.theme}-600 cursor-pointer hover:bg-${productData.seller?.theme}-100 px-3`"
                                @click="quantity > 1 && quantity--" type="button">-</button>
                            <input disabled v-model.number="quantity" class="w-8 md:w-12 text-center bg-transparent" />
                            <button
                                :class="`text-lg border border-${productData.seller?.theme}-400 rounded-lg text-${productData.seller?.theme}-600 cursor-pointer hover:bg-${productData.seller?.theme}-100 px-3`"
                                @click="quantity++" type="button">+</button>
                        </div>
                    </div>
                </div>
                <div :class="`flex flex-row gap-4 mx-2 md:mx-0 mb-20 md:mb-0 fixed md:static left-0 right-0 z-20 bottom-0 text-${productData.seller?.theme}-600`">
                    <button
                      @click="handleCartAction(auth.userMeta.cart_items.includes(productData.item?.id || 0) ? 'remove' : 'add')"
                      :class="`flex items-center justify-center gap-2 px-4 py-2 md:px-6 rounded-xl text-sm md:text-base font-medium transition-all duration-300 shadow w-full sm:w-auto cursor-pointer backdrop-blur-md border hover:bg-${productData.seller?.theme}-100`"
                    >
                    <i
                        :class="auth.userMeta.cart_items.includes(productData.item?.id || 0)
                        ? 'mdi mdi-shopping'
                        : 'mdi mdi-shopping-outline'"
                        class="text-lg md:text-xl"
                    ></i>
                      <span class="truncate">
                          {{
                          auth.userMeta.cart_items.includes(productData.item?.id || 0)
                              ? 'Added to Cart'
                              : 'Add to Cart'
                          }}
                      </span>
                    </button>
                    <!-- <button
                        :class="`w-full md:w-auto bg-${productData.seller?.theme}-400 dark:bg-${productData.seller?.theme}-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-${productData.seller?.theme}-500 transition-colors flex items-center justify-center gap-3 cursor-pointer`">
                        <span class="mdi mdi-cart-arrow-right"></span>
                        Buy Now
                    </button> -->
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  *  Add to cart to proceed with purchase
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed, ref } from 'vue';
import { useStore } from '@/composables/useStore';
import type { ProductVariation, VariationAttributes } from '@/types/product';
import { useNotify } from '@/composables/useNotify';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useWishlist } from '@/stores/wishlist';

const selectedItems = ref<VariationAttributes []>([]);

const selectedVariation = ref<ProductVariation | null>(null)

const quantity = ref<number>(1)

const { notifyWarning } = useNotify()
const auth = useAuthStore()
const cart = useCartStore()
const wishlist = useWishlist()

const variantPrice = ref<string | undefined >('')
const variantId = ref<number | undefined>()
const product_id = ref<number | undefined>()

const {
    productData,
    storeData
} = useStore()

const goToStore = () => {
    router.push({
        name: 'store',
        params: {
            slug: productData.value.seller?.slug,
        }
    })
}

const badgeTitle = computed(() => {
  const item = productData.value?.item;
  if (!item) return '';

  if (item.discount?.type === 'bogo') {
    return `Buy ${item.discount?.rules?.bogoX} get ${item.discount?.rules?.bogoY} free`;
  } else if (item.discount?.value) {
    return item.discount?.type === 'percentage'
      ? `${item.discount?.value}% off`
      : `₹${item.discount?.value} off`;
  } else {
    return '';
  }
});


const select = (key: string, value: string) => {
  const index = selectedItems.value.findIndex(obj => Object.keys(obj)[0] === key);

  if (index !== -1) {
    const existingVal = selectedItems.value[index][key];

    if (existingVal === value) {
      // Deselect
      selectedItems.value.splice(index, 1);
    } else {
      // Replace
      selectedItems.value[index][key] = value;
    }
  } else {
    // Add new
    selectedItems.value.push({ [key]: value });
  }

  matchSelectedVariation();
  //continue below
  if(productData.value.attribute.length == selectedItems.value.length) {
    variantPrice.value = selectedVariation.value?.price
    variantId.value = selectedVariation.value?.id
  } else {
    variantPrice.value = undefined
    variantId.value = undefined
  }
};

const flattenSelectedItems = (): VariationAttributes => {
  return selectedItems.value.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    acc[key] = curr[key];
    return acc;
  }, {} as VariationAttributes);
};

const matchSelectedVariation = () => {
  const flattened = flattenSelectedItems();

  const variations = productData.value?.variations as ProductVariation[] || [];

  selectedVariation.value = variations.find(variation => {
    const attrs = variation.attributes;
    return Object.entries(flattened).every(
      ([key, val]) => attrs[key] === val
    );
  }) || null;
};

const handleCartAction = (action: 'add' | 'remove') => {
  console.log(action)
  if (!auth.isAuthenticated) {
    notifyWarning('Please log in to manage your cart.');
    auth.openDialog();
    return;
  }
  if(productData.value.item?.type == 'simple') {
    product_id.value = productData.value.item?.id;
  } else {
    product_id.value = variantId.value
  }
  
  if(!product_id.value) {
    notifyWarning('Please select variant.');
    return
  }

  if (action === 'add' && product_id.value) {
    cart.addToCart(product_id.value, quantity.value);
  } else if (action === 'remove' && product_id.value) {
    cart.removeItem(product_id.value);
  }
};


const handleWishlistAction = (action: 'add' | 'remove') => {
    if (!auth.isAuthenticated) {
        notifyWarning('Please log in to manage your wishlist.');
        auth.openDialog();
        return;
    }
    
    const productId = productData.value.item?.id;
    
    if (action === 'add' && productId) {
    wishlist.addToWishlist(productId)
  } else if (action === 'remove' && productId) {
    wishlist.removeItem(productId)
  }
};

</script>