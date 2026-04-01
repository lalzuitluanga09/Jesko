<template>
  <div class="max-w-md mx-auto px-4 py-4 space-y-4">
    <div class="text-center">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">Checkout</h1>
    </div>

    <div class="flex justify-between items-center text-sm font-medium">
      <span :class="stepClass(1)"><span class="px-1 border rounded-full">1</span> Address & Payment</span>
      <span :class="stepClass(2)"><span class="px-1 border rounded-full">2</span> Order Summary</span>
      <span :class="stepClass(3)"><span class="px-1 border rounded-full">3</span> Payment</span>
    </div>

    <!-- Step 1: Shipping & Payment -->
    <div v-if="step === 1" class="space-y-4">
      <!-- Shipping Address -->
      <section class="rounded-xl p-4 border border-gray-300 shadow-sm">
        <h2 class="text-base font-semibold text-primary mb-2">
          <span class="mdi mdi-map-marker"></span> Shipping Address
        </h2>
        <div v-if="deliveryAddress">
          <p class="font-medium text-sm">{{ deliveryAddress?.label }}</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm">{{ deliveryAddress?.address }}</p>
          <p class="text-gray-500 text-sm dark:text-gray-300">Phone: {{ deliveryAddress?.phone }}</p>
          <button v-if="addresses.length > 1" @click="showAddresses = !showAddresses"
            class="flex w-full justify-center mt-2 text-sm px-3 py-1 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
            <span v-if="!showAddresses" class="mdi mdi-square-edit-outline"><span class="pl-1">Change</span></span>
            <span v-else class="mdi mdi-close"><span class="pl-1">Close</span></span>
          </button>
          <button v-else @click="openDialog"
            class="mt-2 w-full border border-dashed rounded-lg py-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            + Add New Address
          </button>
        </div>
        <div v-else class="text-gray-500 text-sm">
          <p>Please add new address to proceed.</p>
          <button @click="openDialog"
            class="mt-2 w-full border border-dashed rounded-lg py-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
            + Add New Address
          </button>
        </div>


        <transition name="fade">
          <div v-if="showAddresses" class="mt-4 space-y-3 text-sm">
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
                <button title="Edit" @click="openEditDialog(item)"
                  class="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition cursor-pointer">
                  <span class="mdi mdi-square-edit-outline"></span>
                </button>
                <button title="Select" @click="showAddresses = false; setDeliveryAddress(item.id)"
                  class="text-sm px-2 py-1 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-sm transition cursor-pointer">
                  <span class="mdi mdi-check"></span>
                </button>
              </div>
            </div>

            <button @click="openDialog"
              class="mt-2 w-full border border-dashed rounded-lg py-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              + Add New Address
            </button>
          </div>
        </transition>
      </section>

      <!-- Payment Method -->
      <section class="rounded-xl p-4 border border-gray-300 shadow-sm">
        <h2 class="text-md font-semibold text-primary mb-2">
          <span class="mdi mdi-cash"></span> Payment Method
        </h2>
        <div class="space-y-2 text-sm">
          <label class="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-xl">
            <input type="radio" name="payment" v-model="paymentMode" value="cod" class="w-4 h-4" />
            Cash on Delivery (COD)
          </label>
          <label class="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-xl">
            <input type="radio" name="payment" v-model="paymentMode" value="upi" class="w-4 h-4" />
            UPI
          </label>
          <label class="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-500 rounded-xl">
            <input type="radio" name="payment" v-model="paymentMode" value="card" class="w-4 h-4" />
            Credit/Debit Card
          </label>
        </div>
      </section>
      <button @click="step = 2" class="w-full bg-primary text-white font-medium py-2 rounded-lg">
        Continue <span class="mdi mdi-arrow-right"></span>
      </button>
    </div>

    <!-- Step 2: Items + Coupon + Summary -->
    <div v-if="step === 2" class="space-y-4">
      <!-- Items -->
      <section class="rounded-xl p-4 border border-gray-300 shadow-sm">
        <h2 class="text-base font-semibold text-primary mb-2">
          <span class="mdi mdi-cart-check"></span> Items
        </h2>
        <div v-for="item in cart.cart?.items" :key="item.store_id">
          <div v-for="product in item.items" :key="product.id" class="flex flex-col items-center justify-center">
            <div class="flex w-full justify-between mb-2 pt-2 ">
              <img src="/images/product.png" class="w-14 h-14 rounded-lg border border-gray-400" />
              <div class="flex-1 px-3">
                <p class="text-sm font-medium line-clamp-1">{{ product.product_name }}</p>
                <p class="text-xs text-gray-500">Qty: {{ product.quantity }}
                  <span v-if="product.discount?.type === 'bogo' && product.discount?.bogo">
                    <template
                      v-if="Math.floor(product.quantity / product.discount.bogo.bogoX) * product.discount.bogo.bogoY > 0">
                      + {{ Math.floor(product.quantity / product.discount.bogo.bogoX) * product.discount.bogo.bogoY }}
                      free
                    </template>
                  </span>
                </p>
                <p class="text-xs text-gray-500 line-clamp-1">Seller: {{ item.store_name }}</p>
              </div>
              <div class="flex flex-col items-end">
                <!-- <p class="text-sm font-semibold">₹{{ product.price_at_addition }}</p> -->
                <div class="flex items-baseline gap-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-gray-100">
                    ₹ {{ product.discount && product.discount.type != 'bogo'
                      ? product.discount_price
                      : product.price_at_addition }}
                  </p>
                  <p v-if="product.discount && product.discount.type != 'bogo'"
                    class="text-xs line-through text-gray-800 dark:text-gray-100">
                    ₹{{ product.price_at_addition }}
                  </p>
                </div>
                <button @click="cart.removeItem(product.product_id)"
                  class="bg-red-200 rounded-full px-1 text-red-500 mt-1">
                  <span class="mdi mdi-close"></span>
                </button>
              </div>
            </div>
            <hr class="w-full text-gray-300 dark:text-gray-500">
          </div>
        </div>
      </section>

      <!-- Coupon -->
      <section class="rounded-xl p-4 border border-gray-300 shadow-sm">
        <h2 class="text-base font-semibold text-primary mb-2">
          <span class="mdi mdi-ticket-percent"></span> Apply Coupon
        </h2>
        <div class="flex gap-2 text-sm">
          <input type="text" placeholder="Coupon code" class="flex-1 border border-gray-300 rounded-md px-3 py-2" />
          <button class="bg-primary text-white px-3 rounded-md">Apply</button>
        </div>
        <div class="mt-2 text-sm">
          <p class="text-green-600 dark:text-green-400 hidden" id="coupon-success">
            <span class="mdi mdi-party-popper"></span> Coupon applied successfully!
          </p>
          <p class="text-red-600 dark:text-red-400 hidden" id="coupon-error">
            <span class="mdi mdi-close-circle"></span> Invalid coupon code.
          </p>
        </div>

        <div class="mt-4">
          <div id="coupon-applied-area"
            class="flex items-center justify-between bg-green-200 dark:bg-green-600 px-3 py-1.5 rounded-xl ">
            <span class="text-green-800 dark:text-green-200 text-sm">
              <span class="mdi mdi-party-popper"></span> Coupon <strong>SAVE100</strong> applied!
            </span>
            <button class="text-red-500 text-sm font-medium cursor-pointer">
              <span class="mdi mdi-close bg-red-100 rounded-full px-0.5"></span>
            </button>
          </div>
        </div>
      </section>

      <!-- Order Summary -->
      <section class="rounded-xl p-4 border border-gray-300 shadow-sm">
        <h2 class="text-base font-semibold text-primary mb-2">
          <span class="mdi mdi-card-text-outline"></span> Order Summary
        </h2>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between"><span>Sub Total</span><span>₹{{ cart.subTotal.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Discount</span><span class="text-green-600 dark:text-green-400">- ₹{{
            cart.discountTotal.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Additional Discount</span><span
              class="text-green-600 dark:text-green-400">-
              ₹0</span>
          </div>
          <div class="flex justify-between"><span>Shipping</span><span class="text-neutral-600 dark:text-neutral-400">+
              ₹0</span></div>
          <div class="flex justify-between"><span>Taxes</span><span class="text-neutral-600 dark:text-neutral-400">+
              ₹0</span></div>
          <hr class="text-gray-300" />
          <div class="flex justify-between font-semibold text-primary">
            <span>Total</span><span>₹{{ cart.total.toFixed(2) }}</span>
          </div>
        </div>
      </section>

      <div class="flex justify-between gap-2 text-sm">
        <button @click="step = 1" class="flex-1 border border-gray-400 rounded-md py-2"><span
            class="mdi mdi-arrow-left"></span> Back</button>
        <button @click="step = 3" class="flex-1 bg-primary text-white py-2 rounded-md">Proceed <span
            class="mdi mdi-arrow-right"></span></button>
      </div>
    </div>

    <!-- Step 3: Payment & Confirmation -->
    <div v-if="step === 3">
      <div v-if="placingOrder" class="flex flex-col w-full items-center justify-center h-[30vh]">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="space-y-4">
        <!-- Confirm & Pay -->
        <div v-if="!isOrderConfirmed" class="rounded-xl p-4 border border-gray-300 shadow-sm text-center">
          <h2 class="text-base font-semibold text-primary">
            <span class="mdi mdi-check-circle"></span> Confirm & Pay
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Please confirm your order and proceed with payment.
          </p>

          <div class="mt-4 space-y-2">
            <h2 class="text-2xl font-bold">₹{{ cart.total }}</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Payment Method:
              <span class="font-semibold">
                {{ paymentMode === 'cod' ? 'Cash on Delivery' : (paymentMode === 'upi' ? 'UPI' : 'Card') }}
              </span>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Total Items:
              <span class="font-semibold">{{ auth.userMeta.cart_items.length }}</span>
            </p>
          </div>
        </div>

        <!-- Order Confirmed -->
        <div v-else
          class="flex flex-col items-center justify-center border border-gray-300 dark:border-gray-500 rounded-xl p-4">
          <span class="mdi mdi-check-decagram text-green-600 text-4xl mb-3"></span>
          <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            Order Confirmed Successfully!
          </h3>
          <p class="text-xs text-gray-600 dark:text-gray-300 mt-2 text-center">
            Thank you for your purchase. Your order is being processed.
          </p>
        </div>

        <!-- Action Buttons -->
        <div v-if="!isOrderConfirmed" class="flex justify-between gap-3 text-sm">
          <button @click="step = 2" class="flex-1 border border-gray-400 rounded-md py-2">
            <span class="mdi mdi-arrow-left"></span> Back
          </button>
          <button @click="placeOrder" class="flex-1 bg-green-600 text-white py-2 rounded-md">
            Confirm <span v-if="paymentMode !== 'cod'">& Pay</span>
          </button>
        </div>

        <div v-else class="flex justify-between gap-3 text-sm">
          <button @click="goToCart()" class="flex-1 border border-gray-400 rounded-md py-2">
            <span class="mdi mdi-arrow-left"></span> Go back to cart
          </button>
          <button @click="goToMyOrders()" class="flex-1 bg-green-600 text-white py-2 rounded-md">
            Go to My Orders
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddress } from '@/composables/useAddress';
import { useOrder } from '@/composables/useOrder';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';

const showAddresses = ref(false)

const cart = useCartStore()
const auth = useAuthStore()

const {
  addresses,
  deliveryAddress,
  otherAddress,
  openDialog,
  setDeliveryAddress,
  openEditDialog
} = useAddress()

const {
  isOrderConfirmed,
  paymentMode,
  placingOrder,
  placeOrder,
  goToCart,
  goToMyOrders
} = useOrder()

const step = ref(1)

function stepClass(n: number) {
  return step.value + 1 > n
    ? "text-primary font-bold"
    : "text-gray-500";
}


</script>