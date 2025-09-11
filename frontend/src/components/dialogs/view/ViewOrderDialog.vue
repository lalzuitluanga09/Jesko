<template>
    <Transition name="bounce">
        <div v-show="isView" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeViewDialog">
            <div
                class="flex flex-col bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-2xl shadow-lg mx-2 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center tracking-tight">
                    <span class="inline-flex items-center gap-2">
                        <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Order Details
                    </span>
                </h2>
                <div class="space-y-4 mb-6">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Order ID:</span>
                        <span class="font-semibold text-blue-600 dark:text-blue-400">{{ selected?.data.order_number ||
                            '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Date:</span>
                        <span class="text-gray-800 dark:text-gray-100">{{ selected?.data.placed_at ?
                            formatToDatetime(selected?.data.placed_at) : '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Customer:</span>
                        <span class="text-gray-800 dark:text-gray-100">{{ selected?.customer.name || '—' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <!-- Label -->
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Payment Method:
                        </span>

                        <!-- Value -->
                        <div v-if="selected?.payment?.payment_mode" class="flex items-center gap-2">
                            <!-- Status Icon -->
                            <span
                                :class="{
                                    'text-amber-500 mdi mdi-clock-time-eight-outline': selected?.payment.status === 'pending',
                                    'text-green-500 mdi mdi-check-all': selected?.payment.status === 'paid',
                                    'text-red-500 mdi mdi-alert-circle-outline': selected?.payment.status === 'failed',
                                    'text-orange-500 mdi mdi-cash-refund': selected?.payment.status === 'refunded'
                                }"
                                class="text-lg" :title="selected.data.status"
                            ></span>

                            <!-- Payment Mode Badge -->
                            <span
                                :class="[
                                    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border',
                                    'border-gray-200 dark:border-gray-600',
                                    paymentBadgeClass(selected.payment.payment_mode)
                                ]"
                            >
                                <span :class="paymentIcon(selected.payment.payment_mode)" class="text-base"></span>
                                {{ selected.payment.payment_mode }}
                            </span>
                        </div>

                        <!-- Fallback -->
                        <span v-else class="text-gray-400">—</span>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 dark:text-gray-400">Status:</span>
                        <span :class="{
                            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': selected?.data.status === 'completed' || selected?.data.status === 'delivered',
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': selected?.data.status === 'pending' || selected?.data.status === 'shipped',
                            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': selected?.data.status === 'cancelled' || selected?.data.status === 'refunded',
                            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': selected?.data.status === 'processing'
                        }" class="px-3 py-1 rounded-full text-sm font-medium transition">
                            {{ selected?.data.status || '—' }}
                        </span>
                    </div>
                    <div v-if="(selected?.orderItems || []).length > 0" class="rounded-lg border border-gray-300 dark:border-gray-500 overflow-hidden">
                        <button @click="itemsOpen = !itemsOpen"
                            class="w-full flex justify-between items-center px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <span class="flex items-center gap-2">
                                <span class="mdi mdi-package-variant-closed"></span> Items
                                <span class="text-sm text-gray-500 dark:text-gray-400">
                                    ({{ selected?.orderItems?.length || 0 }})
                                </span>
                            </span>
                            <svg :class="{'rotate-180': itemsOpen}"
                                class="w-5 h-5 transform transition-transform text-gray-500" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div v-if="itemsOpen" class="p-4 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                            <ul v-if="Array.isArray(selected?.orderItems)" class="space-y-2">
                                <li v-for="(item, index) in selected.orderItems" :key="item.id"
                                    class="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-2 last:border-b-0">
                                    <div :title="item.product_name && item.product_name.length > 34 ? item.product_name : ''"
                                        class="max-w-[70%] truncate cursor-pointer hover:underline text-sm text-gray-800 dark:text-gray-300">
                                        {{ index+1 }}.  {{ item.product_name }}
                                    </div>
                                    <div class="text-sm text-gray-700 dark:text-gray-300">
                                        x {{ item.paid_quantity }}
                                        <span v-if="item.free_quantity > 0" class="ml-1 text-green-600 dark:text-green-400 font-medium">
                                            (+{{ item.free_quantity }} free)
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border border-gray-300 dark:border-gray-700 p-2 rounded-lg space-y-2">
                        <div
                            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Sub-total</span>
                            <span class="text-sm font-medium text-orange-600 dark:text-orange-400">
                                ₹{{ selected?.data?.subtotal ?? '0.00' }}
                            </span>
                        </div>

                        <div
                            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Discount</span>
                            <span class="text-sm font-medium text-green-600 dark:text-green-500">
                                - ₹{{ selected?.data?.discount ?? '0.00' }}
                            </span>
                        </div>
                        <div v-if="selected?.data.coupon_discount"
                            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Additional Discount - Coupon</span>
                            <span class="text-sm font-medium text-green-600 dark:text-green-500">
                                - ₹{{ selected?.data?.coupon_discount ?? '0.00' }}
                            </span>
                        </div>
                        <div
                            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Tax</span>
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                ₹{{ selected?.data?.tax ?? '0.00' }}
                            </span>
                        </div>
                        
                        <div
                            class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Shipping fee</span>
                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                ₹{{ selected?.data?.shipping_fee ?? '0.00' }}
                            </span>
                        </div>

                        <div class="flex justify-between items-center pt-2">
                            <span class="text-base font-semibold text-gray-900 dark:text-gray-100">Total</span>
                            <span class="text-base font-bold text-blue-500 dark:text-blue-400">
                                {{ selected?.data?.total ? '₹' + selected.data.total : '—' }}
                            </span>
                        </div>
                    </div>
                    <div class="w-full mx-auto space-y-4">
                        <!-- Billing Address -->
                        <details v-if="selected?.billingAddress"
                            class="group border border-gray-300 dark:border-gray-500 rounded-lg overflow-hidden transition-all">
                            <summary
                                class="cursor-pointer select-none flex justify-between items-center p-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <span class="text-neutral-600 dark:text-neutral-400">Billing Address</span>
                                <svg class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div
                                class="px-4 pt-2 pb-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm border-t border-gray-200 dark:border-gray-700">
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Label: </span> {{
                                    selected?.billingAddress.label }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Name: </span> {{
                                    selected?.billingAddress.name }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Phone: </span> +91 {{
                                    selected?.billingAddress.phone }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Address: </span> {{
                                    selected?.billingAddress.address }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Landmark: </span> {{
                                    selected?.billingAddress.landmark }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">District: </span> {{
                                    selected?.billingAddress.district }}
                                </p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">City: </span> {{
                                    selected?.billingAddress.city }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">State: </span> {{
                                    selected?.billingAddress.state }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Postal Code: </span>{{
                                    selected?.billingAddress.postal_code
                                    }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Country: </span> {{
                                    selected?.billingAddress.country }}</p>
                            </div>
                        </details>

                        <!-- Shipping Address -->
                        <details v-if="selected?.shippingAddress"
                            class="group border border-gray-300 dark:border-gray-500 rounded-lg overflow-hidden transition-all">
                            <summary
                                class="cursor-pointer select-none flex justify-between items-center p-3 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <span class="text-neutral-600 dark:text-neutral-400">Shipping Address</span>
                                <svg class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div
                                class="px-4 pt-2 pb-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm border-t border-gray-200 dark:border-gray-700">
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Label: </span> {{
                                    selected?.shippingAddress.label }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Name: </span> {{
                                    selected?.shippingAddress.name }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Phone: </span> +91 {{
                                    selected?.shippingAddress.phone }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Address: </span> {{
                                    selected?.shippingAddress.address }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Landmark: </span> {{
                                    selected?.shippingAddress.landmark }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">District: </span> {{
                                    selected?.shippingAddress.district }}
                                </p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">City: </span> {{
                                    selected?.shippingAddress.city }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">State: </span> {{
                                    selected?.shippingAddress.state }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Postal Code: </span>{{
                                    selected?.shippingAddress.postal_code
                                    }}</p>
                                <p><span class="font-medium text-gray-400 dark:text-gray-500">Country: </span> {{
                                    selected?.shippingAddress.country }}</p>
                            </div>
                        </details>
                    </div>
                </div>
                <div class="flex justify-center pt-2">
                    <button
                        class="px-6 py-2 text-base font-medium border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                        @click="close">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import { formatToDatetime } from '@/lib/formatDate';
import { ref } from 'vue'

const itemsOpen = ref(false)

function paymentBadgeClass(mode: string) {
    switch (mode?.toLowerCase()) {
        case "cod":
            return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
        case "card":
            return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
        case "upi":
            return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
        case "net_banking":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
    }
}
function paymentIcon(mode: string) {
    switch (mode?.toLowerCase()) {
        case "cod":
            return 'mdi mdi-cash-fast';
        case "card":
            return 'mdi mdi-credit-card-fast';
        case "upi":
            return 'mdi mdi-contactless-payment-circle';
        case "net_banking":
            return 'mdi mdi-bank-transfer';
        default:
            return 'mdi mdi-currency-inr';
    }
}

const {
    isView,
    selected,
    closeViewDialog,
} = useOrder();

const close = () => {
    itemsOpen.value = false
    closeViewDialog()
}
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
