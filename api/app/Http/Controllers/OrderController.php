<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Coupon;
use App\Models\CouponUser;
use App\Models\Order;
use App\Models\OrderAddress;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');
        $status = $request->query('status');
        $from = $request->query('from');
        $to = $request->query('to');

        $store = Store::where('slug', $storeSlug)->first();

        $orders = Order::with(['user', 'billingAddress', 'shippingAddress', 'latestPayment'])
            ->where('store_id', $store->id)
            ->when($searchTerm, function ($query, $searchTerm) {
                $query->where('order_number', 'like', "%{$searchTerm}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($from, function ($query, $from) {
                $query->where('placed_at', '>=', Carbon::parse($from)->startOfDay());
            })
            ->when($to, function ($query, $to) {
                $query->where('placed_at', '<=', Carbon::parse($to)->endOfDay());
            })
            ->orderBy('placed_at', 'desc')
            ->paginate(10)
            ->through(function ($order) {
                return [
                    'data' => $order->only([
                        'id',
                        'user_id',
                        'store_id',
                        'order_number',
                        'status',
                        'subtotal',
                        'tax',
                        'shipping_fee',
                        'discount',
                        'coupon_discount',
                        'total',
                        'note',
                        'placed_at',
                        'created_at',
                        'updated_at'
                    ]),
                    'customer'   => $order->user,
                    'billingAddress'   => $order->billingAddress,
                    'shippingAddress' => $order->shippingAddress,
                    'orderItems' => $order->orderItems->map(function ($item) {
                        return [
                            'id'           => $item->id,
                            'order_id'     => $item->order_id,
                            'product_id'   => $item->product_id,
                            'product_name' => $item->product_name,
                            'quantity'     => $item->quantity,
                            'paid_quantity' => $item->paid_quantity,
                            'free_quantity' => $item->free_quantity,
                            'unit_price'   => $item->unit_price,
                            'total_price'  => $item->total_price,
                        ];
                    }),
                    'payment' => $order->latestPayment?->only(['id', 'payment_mode', 'status' ]),
                ];
            });

        return response()->json($orders);
    }


    public function store(Request $request, $storeSlug)
    {
        return response()->json(['status' => 'success'], 201);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $storeSlug, $id)
    {
        $status = $request->status;
        $order = Order::findOrFail( $id);

        $order->update([
            'status' => $status
        ]);

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($storeSlug, $id)
    {

        return response()->json(['status' => 'deleted'], 200);
    }


    // User Routes ->

    public function placeOrder(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $items = $request->input('items');
            $paymentMode = $request->input('paymentMode');
            $deliveryAddress = $request->input('deliveryAddress');
            $appliedCoupons = $request->input('appliedCoupons');

            foreach ($items as $item) {
                $order = Order::create([
                    'user_id'       => $request->user()->id,
                    'store_id'      => $item['store_id'],
                    'order_number'  => 'ORD-' . strtoupper(uniqid()),
                    'payment_mode'  => $paymentMode,
                    'note'          => $request->input('note', ''),
                    'placed_at'     => now(),
                ]);

                $productIds = collect($item['items'])->pluck('product_id');
                $products = Product::whereIn('id', $productIds)
                                ->get(['id', 'store_id', 'name', 'price', 'sku', 'parent_id', 'type'])
                                ->keyBy('id');

                $orderItems = [];
                foreach ($item['items'] as $product) {
                    $originalItem = $products[$product['product_id']];

                    $paid_quantity = $product['quantity'];
                    $free_quantity = 0;
                    $final_price = 0;

                    if (isset($product['bogoX']) && isset($product['bogoY'])) {
                        $bogoX = $product['bogoX'] ?? 0;
                        $bogoY = $product['bogoY'] ?? 0;

                        if ($bogoX > 0 && $bogoY > 0) {
                            $sets = intdiv($paid_quantity, $bogoX);
                            $free_quantity = $sets * $bogoY;
                            $final_price = $paid_quantity * $originalItem->price;
                        }
                    }

                    if ($final_price === 0) {
                        $discountedUnitPrice = $originalItem->getDiscountedPrice();
                        $final_price = $paid_quantity * $discountedUnitPrice;
                    }

                    $discountAmount = (($paid_quantity + $free_quantity) * $originalItem->price) - $final_price;

                    $orderItems[] = [
                        'order_id'          => $order->id,
                        'product_id'        => $product['product_id'],
                        'product_name'      => $originalItem->name,
                        'product_sku'       => $originalItem->sku,
                        'paid_quantity'     => $paid_quantity,
                        'free_quantity'     => $free_quantity,
                        'quantity'          => $paid_quantity + $free_quantity,
                        'unit_price'        => $originalItem->price,
                        'discount_amount'   => $discountAmount,
                        'total_price'       => $final_price,
                        'discount_snapshot' => $originalItem->getActiveSale() ? json_encode($originalItem->getActiveSale()) : null,
                        'snapshot'          => $originalItem,
                    ];
                }

                OrderItem::insert($orderItems);

                $coupon_discount = 0;
                $appliedCoupon = null;

                foreach ($appliedCoupons as $coupon) {
                    if ($item['store_id'] === $coupon['store_id']) {
                        $appliedCoupon = Coupon::findOrFail($coupon['id']);
                        break;
                    }
                }

                $subtotal = collect($orderItems)->sum(function ($item) {
                    return $item['unit_price'] * $item['quantity'];
                });

                $discount = collect($orderItems)->sum('discount_amount');

                if ($appliedCoupon) {
                    if ($appliedCoupon->discount_type === 'percentage') {
                        $coupon_discount = min(
                            $subtotal * ($appliedCoupon->discount_value / 100),
                            $appliedCoupon->max_discount_value ?? $subtotal
                        );
                    } 
                    else if ($appliedCoupon->discount_type === 'fixed') {
                        $coupon_discount = min(
                            $appliedCoupon->discount_value,
                            $appliedCoupon->max_discount_value ?? $appliedCoupon->discount_value
                        );
                    }

                    if ($appliedCoupon->min_order_value && $subtotal < $appliedCoupon->min_order_value) {
                        $coupon_discount = 0;
                    }

                    $appliedCoupon->increment('used_count');

                    CouponUser::updateOrCreate(
                        [
                            'coupon_id' => $appliedCoupon->id,
                            'user_id'   => $request->user()->id,
                        ],
                        [
                            'times_used' => DB::raw('times_used + 1'),
                        ]
                    );
                }

                $total = $subtotal - $discount - $coupon_discount;

                $order->update([
                    'subtotal'        => $subtotal,
                    'discount'        => $discount,
                    'total'           => $total,
                    'coupon_id'       => $appliedCoupon?->id,
                    'coupon_discount' => $coupon_discount,
                ]);

                $address = Address::find($deliveryAddress);
                $billingAddress = Address::where('user_id', $request->user()->id)
                                        ->where('is_default', true)
                                        ->first();

                $addressesToInsert = [];

                if ($billingAddress) {
                    $addressesToInsert[] = [
                        'order_id'    => $order->id,
                        'type'        => 'billing',
                        'label'       => $billingAddress->label,
                        'name'        => $billingAddress->name,
                        'phone'       => $billingAddress->phone,
                        'address'     => $billingAddress->address,
                        'landmark'    => $billingAddress->landmark,
                        'postal_code' => $billingAddress->postal_code,
                        'district'    => $billingAddress->district,
                        'city'        => $billingAddress->city,
                        'state'       => $billingAddress->state,
                        'country'     => $billingAddress->country,
                    ];
                }

                $addressesToInsert[] = [
                    'order_id'    => $order->id,
                    'type'        => 'shipping',
                    'label'       => $address->label,
                    'name'        => $address->name,
                    'phone'       => $address->phone,
                    'address'     => $address->address,
                    'landmark'    => $address->landmark,
                    'postal_code' => $address->postal_code,
                    'district'    => $address->district,
                    'city'        => $address->city,
                    'state'       => $address->state,
                    'country'     => $address->country,
                ];

                OrderAddress::insert($addressesToInsert);

                Payment::create([
                    'order_id'      => $order->id,
                    'payment_mode'  => $paymentMode,
                    'amount'       => $order->total,
                    'status'       => 'pending',
                ]);
            }
        });
    }

    public function getOrders(Request $request)
    {
        $searchTerm = $request->query('searchTerm');
        $status = $request->query('status');

        $pendingOrderCount = $request->user()->orders()->where('status', 'pending')->count();

        $orders = Order::where('user_id', $request->user()->id)->with(['orderItems', 'shippingAddress', 'billingAddress', 'latestPayment'])
            ->when($searchTerm, function ($query, $searchTerm) {
                $query->where('order_number', 'like', "%{$searchTerm}%")
                      ->orWhereHas('orderItems.product', function ($q) use ($searchTerm) {
                          $q->where('name', 'like', "%{$searchTerm}%");
                      })->orWhereHas('store', function ($q) use ($searchTerm) {
                          $q->where('name', 'like', "%{$searchTerm}%");
                      });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('placed_at', 'desc')
            ->paginate(10)
            ->through(function ($order) {
                return [
                    'data' => $order->only([
                        'id',
                        'user_id',
                        'store_id',
                        'order_number',
                        'status',
                        'subtotal',
                        'tax',
                        'shipping_fee',
                        'discount',
                        'total',
                        'note',
                        'placed_at',
                    ]),
                    'store' => $order->store->only(['id', 'name', 'slug']),
                    'billingAddress'   => $order->billingAddress,
                    'shippingAddress' => $order->shippingAddress,
                    'orderItems' => $order->orderItems->map(function ($item) {
                        return [
                            'id'           => $item->id,
                            'order_id'     => $item->order_id,
                            'product_id'   => $item->product_id,
                            'product_name' => $item->product->name ?? null,
                            'quantity'     => $item->quantity,
                            'unit_price'   => $item->unit_price,
                            'total_price'  => $item->total_price,
                        ];
                    }),
                    'payment' => $order->latestPayment?->only(['id', 'payment_mode', 'status' ]),
                ];
            });

        return response()->json([
            'data' => $orders,
            'pendingCount' => $pendingOrderCount
        ]);
    }
}
