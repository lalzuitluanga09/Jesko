<template>
    <MobileCheckout v-if="isMobile" />
    <div v-else class="flex flex-col w-full max-w-6xl mx-auto py-2 space-y-4">
        <!-- Header -->
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                Review your details before placing the order
            </p>
        </div>
        <div class="md:grid md:grid-cols-5 gap-2">
            <div class="flex flex-col gap-2 col-span-3">
                <!-- Items  -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-pink-700 dark:text-pink-400 mb-4">
                        <span class="mdi mdi-package-variant-closed-check"></span> Items
                    </h2>

                    <div class="space-y-4">
                        <div v-for="item in cart.cart?.items" :key="item.store_id" class="space-y-4">
                            <div v-for="product in item.items" :key="product.id"
                                class="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                                <img src="/images/product.png" alt="Wireless Earbuds"
                                    class="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                                <div class="flex-1 px-4">
                                    <h3 class="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        {{ product.product_name }}
                                    </h3>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Sold by: <span class="font-medium">{{ item.store_name }}</span>
                                    </p>
                                    <p class="flex items-baseline gap-0.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Qty: {{ product.quantity }} 
                                        <span v-if="product.discount?.type === 'bogo' && product.discount?.bogo">
                                            <template v-if="Math.floor(product.quantity / product.discount.bogo.bogoX) * product.discount.bogo.bogoY > 0">
                                                + {{ Math.floor(product.quantity / product.discount.bogo.bogoX) * product.discount.bogo.bogoY }} free
                                            </template>
                                        </span>
                                    </p>
                                </div>
                                <div class="text-right">
                                    <div class="flex items-baseline gap-1">
                                        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                            ₹ {{ product.discount && product.discount.type != 'bogo'
                                            ? product.discount_price
                                            : product.price_at_addition }}
                                        </p>

                                        <p v-if="product.discount && product.discount.type != 'bogo'"
                                            class="text-xs line-through text-gray-800 dark:text-gray-100">
                                            ₹{{ product.price_at_addition }}
                                        </p>
                                    </div>
                                    <div>
                                        <button title="Remove Item" @click="cart.removeItem(product.product_id)"
                                            class="text-red-500 cursor-pointer mt-2 bg-red-100 dark:bg-red-200 hover:bg-red-200 dark:hover:bg-red-300 rounded-full px-1 transition-colors">
                                            <span class="mdi mdi-close"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <!-- Shipping Address with Accordion -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <!-- Header -->
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-pink-700 dark:text-pink-400">
                            <span class="mdi mdi-map-marker"></span> Shipping Address
                        </h2>
                        <button v-if="addresses.length > 1" @click="showAddresses = !showAddresses"
                            class="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                            <span v-if="!showAddresses" class="mdi mdi-square-edit-outline"><span
                                    class="pl-1">Change</span></span>
                            <span v-else class="mdi mdi-close"><span class="pl-1">Close</span></span>
                        </button>
                    </div>

                    <!-- Current Address -->
                    <div v-if="deliveryAddress" class="space-y-1 mt-2">
                        <p class="font-medium text-gray-900 dark:text-white">{{ deliveryAddress.label }}</p>
                        <p class="text-gray-700 dark:text-gray-400 leading-tight">
                            {{ deliveryAddress.name }}<br>
                            {{ deliveryAddress.address }} - {{ deliveryAddress.postal_code }} <br>
                            {{ deliveryAddress.landmark }}<br>
                            Phone: {{ deliveryAddress.phone }}
                        </p>
                        <button v-if="addresses.length == 1" @click="openDialog"
                            class="w-full text-center px-4 py-2 border border-dashed border-gray-400 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                            + Add New Address
                        </button>
                    </div>
                    <div v-else>
                        <div class="text-gray-500 dark:text-gray-400 text-center py-4">
                            Please add address
                        </div>
                        <button @click="openDialog"
                            class="w-full text-center px-4 py-2 border border-dashed border-gray-400 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                            + Add New Address
                        </button>
                    </div>

                    <!-- Accordion -->
                    <transition name="fade">
                        <div v-if="showAddresses" class="mt-5 space-y-3">
                            <div v-for="item in otherAddress" :key="item.id"
                                class="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">{{ item.label }}</p>
                                    <p class="text-gray-700 dark:text-gray-300">
                                        {{ item.address }}
                                    </p>
                                    <p class="text-gray-500 dark:text-gray-400">Phone: {{ item.phone }}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button @click="openEditDialog(item)"
                                        class="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                                        <span class="mdi mdi-square-edit-outline"></span><span v-if="!isMobile">
                                            Edit</span>
                                    </button>
                                    <button @click="showAddresses = false; setDeliveryAddress(item.id)"
                                        class="text-sm px-4 py-1 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-sm transition cursor-pointer">
                                        <span class="mdi mdi-check"></span><span v-if="!isMobile"> Select</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Add New Address -->
                            <button @click="openDialog"
                                class="w-full text-center px-4 py-2 border border-dashed border-gray-400 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                                + Add New Address
                            </button>
                        </div>
                    </transition>
                </section>

                <!-- Payment Method -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold space-y-4d text-pink-700 dark:text-pink-400 mb-4">
                        <span class="mdi mdi-cash"></span> Payment Method
                    </h2>
                    <div class="space-y-3 text-sm font-medium">
                        <label
                            class="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600">
                            <input type="radio" name="payment" v-model="paymentMode" value="cod"
                                class="w-4 h-4 text-pink-600 focus:ring-pink-500" />
                            <span class="text-gray-800 dark:text-gray-200">Cash on Delivery (COD)</span>
                        </label>
                        <label
                            class="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600">
                            <input type="radio" name="payment" v-model="paymentMode" value="upi"
                                class="w-4 h-4 text-pink-600 focus:ring-pink-500" />
                            <span class="text-gray-800 dark:text-gray-200">UPI</span>
                        </label>
                        <label
                            class="flex items-center gap-3 cursor-pointer p-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600">
                            <input type="radio" name="payment" v-model="paymentMode" value="card"
                                class="w-4 h-4 text-pink-600 focus:ring-pink-500" />
                            <span class="text-gray-800 dark:text-gray-200">Credit/Debit Card</span>
                        </label>
                    </div>
                </section>
            </div>

            <div class="flex flex-col gap-2 col-span-2 mt-3 md:mt-0 md:h-fit md:sticky md:top-2">
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-pink-700 dark:text-pink-400 mb-4">
                        <span class="mdi mdi-ticket-percent"></span> Apply Coupon
                    </h2>

                    <div class="flex gap-2">
                        <input type="text" placeholder="Enter coupon code" v-model="couponCode"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400" />

                        <button @click="check"
                            class="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl shadow-sm transition-colors cursor-pointer">
                            <Loading v-if="isCheckingCoupon" />
                            <span v-else>Apply</span>
                        </button>
                    </div>
                    <div class="mt-2 text-sm" v-if="isCouponFound != null">
                        <p class="text-green-600 dark:text-green-400" v-if="isCouponFound" id="coupon-success">
                            <span class="mdi mdi-party-popper"></span> Coupon is active!
                        </p>
                        <p class="text-red-600 dark:text-red-400" v-else id="coupon-error">
                            <span class="mdi mdi-close-circle"></span> Invalid coupon code.
                        </p>
                    </div>

                    <div class="mt-4 space-y-2" v-if="appliedCoupons">
                        <div id="coupon-applied-area" v-for="item in appliedCoupons" :key="item.id"
                            class="flex items-center justify-between bg-green-100 dark:bg-green-900 px-4 py-2 rounded-xl ">
                            <span class="text-green-800 dark:text-green-200 text-sm">
                                <span class="mdi mdi-party-popper"></span> Coupon <strong>{{ item.code }}</strong> applied!
                            </span>
                            <button @click="removeCoupon(item.id)"
                                class="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer">
                                Remove
                            </button>
                        </div>
                    </div>
                </section>
                <!-- Order Summary -->
                <section
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-pink-700 dark:text-pink-400 mb-4">
                        <span class="mdi mdi-card-text-outline"></span> Order Summary
                    </h2>
                    <div class="space-y-2 text-gray-700 dark:text-gray-300">
                        <div class="flex justify-between">
                            <span>Sub Total</span>
                            <span class="text-gray-800 dark:text-gray-200">₹{{ cart.subTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Discount</span>
                            <span class="text-green-600 dark:text-green-400">- ₹{{ cart.discountTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between" v-if="additionDiscount > 0">
                            <span>Additional Discount - <span class="italic">Coupon</span></span>
                            <span class="text-green-600 dark:text-green-400">- ₹ {{ additionDiscount }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span class="text-neutral-600 dark:text-neutral-400">+ ₹50</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Taxes</span>
                            <span class="text-neutral-600 dark:text-neutral-400">+ ₹ 0</span>
                        </div>
                        <hr class="my-2 border-gray-300 dark:border-gray-600" />
                        <div class="flex justify-between font-semibold text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span>₹{{ (cart.total - additionDiscount).toFixed(2) }}</span>
                        </div>
                    </div>
                </section>

                <!-- Continue Button -->
                <div class="flex justify-center md:justify-end items-center">
                    <button @click="openConfirmDialog"
                        class="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg shadow transition cursor-pointer">
                        Continue <span class="mdi mdi-arrow-right"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <AddAddressDialog />
    <ConfirmOrderDialog />
</template>

<script setup lang="ts">
import AddAddressDialog from '@/components/dialogs/AddAddressDialog.vue';
import ConfirmOrderDialog from '@/components/dialogs/ConfirmOrderDialog.vue';
import MobileCheckout from '@/components/MobileCheckout.vue';
import Loading from '@/components/others/Loading.vue';
import { useAddress } from '@/composables/useAddress';
import { useCoupon } from '@/composables/useCoupon';
import { useOrder } from '@/composables/useOrder';
import { useSetting } from '@/composables/useSetting';
import { useCartStore } from '@/stores/cart';
import { onMounted, ref } from 'vue';

const showAddresses = ref(false)

const { isMobile } = useSetting()

const cart = useCartStore()

const {
    addresses,
    deliveryAddress,
    otherAddress,
    fetchAddresses,
    openDialog,
    setDeliveryAddress,
    openEditDialog
} = useAddress()

const {
    paymentMode,
    openConfirmDialog
} = useOrder()

const {
    couponCode,
    appliedCoupons,
    isCouponFound,
    isCheckingCoupon,
    additionDiscount,
    checkCoupon,
    removeCoupon,
} = useCoupon()

const check = () => {
    if(!isCheckingCoupon.value) {
        console.log('presseras sin')
        checkCoupon()
    }
}

onMounted(() => {
    fetchAddresses()
    if (!cart.cart) {
        cart.getCartItems()
    }
})

</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>