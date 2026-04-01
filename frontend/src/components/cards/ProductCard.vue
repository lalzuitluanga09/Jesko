<template>
    <div @click.prevent="gotTo"
        :class="`relative w-full h-fit max-w-sm rounded-2xl overflow-hidden cursor-pointer hover:bg-${theme}-50 dark:hover:bg-gray-700 border border-${theme}-300  transition`">

        <SaleBadge
          v-if="item.badge"
          :title="badgeTitle"
          :type="item.badge ?? ''"
          class="absolute top-2 md:top-2.5 left-0"
        />

        <div v-if="!auth.userMeta.wishlists.includes(item.id)" @click.stop="handleWishlistAction('add')" title="Add to Wishlist"
            :class="`absolute top-2 right-2 bg-${theme}-50 hover:bg-${theme}-200 dark:bg-${theme}-500 dark:hover:bg-${theme}-400 rounded-full px-1 md:px-2 md:py-1 z-10 cursor-pointer`">
            <span :class="`mdi mdi-heart-outline text-base md:text-xl text-${theme}-500 dark:text-white`"></span>
        </div>
        <div v-else @click.stop="handleWishlistAction('remove')"
            title="Remove from Wishlist"
            :class="`absolute top-2 right-2 bg-${theme}-50 hover:bg-${theme}-200 dark:bg-${theme}-500 dark:hover:bg-${theme}-400 rounded-full px-1 md:px-2 md:py-1 z-10 cursor-pointer`">
            <span :class="`mdi mdi-heart text-base md:text-xl text-${theme}-500 dark:text-white`"></span>
        </div>
        <img class="w-full lg:h-48 md:h-40 h-36 object-cover rounded-t-xl" :src="item.default_image_url ? storageUrl(item.default_image_url) : '/images/image.png'"
            alt="Store Image">
        <div class="px-3 md:px-4 pt-2 pb-1">
            <div class="text-base font-medium md:mb-1 truncate">{{ item.name }}</div>
            <p class="text-gray-500 dark:text-gray-400 text-xs md:text-sm truncate" v-if="item.category_ids?.length && categories?.length">
                {{
                    item.category_ids
                        ?.map(id => categories?.find(c => String(c.id) === String(id))?.name)
                        ?.filter(Boolean)
                        ?.join(', ') || '—'
                }}
            </p>
        </div>
        <div class="relative px-4 pb-2 flex items-center" >
            <template v-if="item.isSale && item.discount?.type !== 'bogo'">
              <p class="font-medium text-sm md:text-base line-through text-gray-400 mr-2">₹ {{ toNumber(item.price) }}</p>
              <p class="font-medium text-base md:text-lg ">₹{{ toNumber(item.discount_price) }}</p>
            </template>
            <template v-else>
              <p class="font-medium text-base md:text-lg">₹{{ toNumber(item.price) }}</p>
            </template>
            <div v-if="item.type == 'simple'">
                <button v-if="!auth.userMeta.cart_items.includes(item.id)"
                  @click.stop="handleCartAction('add')"
                  :disabled="cart.loading"
                  title="Add to Cart"
                  :class="`cursor-pointer absolute bottom-3 right-3 bg-${theme}-100 dark:bg-${theme}-500 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-${theme}-200 dark:hover:bg-${theme}-400 transition-colors duration-200 flex items-center shadow-sm`">
                  <span :class="`mdi mdi-shopping-outline text-md md:text-xl text-${theme}-500 dark:text-white`"></span>
              </button>
              <button v-else
                  @click.stop="handleCartAction('remove')"
                  :disabled="cart.loading"
                  title="Remove from Cart"
                  :class="`cursor-pointer absolute bottom-3 right-3 bg-${theme}-100 dark:bg-${theme}-500 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-${theme}-200 dark:hover:bg-${theme}-400 transition-colors duration-200 flex items-center shadow-sm`">
                  <span :class="`mdi mdi-shopping text-md md:text-xl text-${theme}-500 dark:text-white`"></span>
              </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { storageUrl } from '@/config'
import type { Category } from '@/types/category';
import type { Product } from '@/types/product';
import { toNumber } from 'lodash-es';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useNotify } from '@/composables/useNotify';
import { useWishlist } from '@/stores/wishlist';
import { useStore } from '@/composables/useStore';
import SaleBadge from '../badge/SaleBadge.vue';
import { computed } from 'vue';

const props = defineProps<{
    slug: string | undefined,
    item: Product,
    categories?: Category[],
    theme?: string
}>();

const badgeTitle = computed(() => {
  if (props.item.discount?.type == 'bogo') {
    return `Buy ${props.item.discount?.rules?.bogoX} get ${props.item.discount?.rules?.bogoY} free`;
  } else if (props.item.badge == 'green') {
    return 'New';
  } else if (props.item.discount?.value) {
    return props.item.discount?.type === 'percentage'
      ? `${props.item.discount?.value}% off`
      : `₹${props.item.discount?.value} off`;
  } else {
    return '';
  }
});

const cart = useCartStore()
const auth = useAuthStore()
const wishlist = useWishlist()

const { getProductData } = useStore()

const { notifyWarning } = useNotify()

const gotTo = () => {
  getProductData(props.item.id)
    router.push({
        name: 'product-detail',
        params: {
          storeslug: props.slug,
          id: props.item.id,
        }
    })
}

const handleCartAction = (action: 'add' | 'remove') => {
  if (!auth.isAuthenticated) {
    notifyWarning('Please log in to manage your cart.');
    auth.openDialog();
    return;
  }

  const productId = props.item.id;

  if (action === 'add') {
    cart.addToCart(productId);
  } else if (action === 'remove') {
    cart.removeItem(productId);
  }
};


const handleWishlistAction = (action: 'add' | 'remove') => {

  if (!auth.isAuthenticated) {
    notifyWarning('Please log in to manage your wishlist.');
    auth.openDialog();
    return;
  }

  const productId = props.item.id;

  if (action === 'add') {
    wishlist.addToWishlist(productId)
  } else if (action === 'remove') {
    wishlist.removeItem(productId)
  }
};

</script>