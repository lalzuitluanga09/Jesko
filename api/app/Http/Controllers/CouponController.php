<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');
        $type = $request->query('type');
        $status = $request->query('status');
        $from = $request->query('from');
        $to = $request->query('to');

        $storeId = Store::where('slug', $storeSlug)->value('id');

        $this->updateStatus($storeId);

        $coupons = Coupon::where('store_id', $storeId)
            ->when($searchTerm, fn($q) => $q->where('code', 'like', "%{$searchTerm}%"))
            ->when($type, fn($q) => $q->where('discount_type', $type))
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($from, fn($q) => $q->where('created_at', '>=', $from))
            ->when($to, fn($q) => $q->where('created_at', '<=', $to))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(
                fn($coupon) => [
                    'id' => $coupon->id,
                    'code' => $coupon->code,
                    'description' => $coupon->description,
                    'discountType' => $coupon->discount_type,
                    'discountValue' => $coupon->discount_value ?? 0,
                    'minOrderValue' => $coupon->min_order_value ?? 0,
                    'maxDiscountValue' => $coupon->max_discount_value ?? 0,
                    'usageLimit' => $coupon->usage_limit ?? 0,
                    'perUserLimit' => $coupon->per_user_limit ?? 0,
                    'usedCount' => $coupon->used_count ?? 0,
                    'startAt' => $coupon->start_at,
                    'endAt' => $coupon->end_at,
                    'status' => $coupon->status,
                ]
            );

        return response()->json([
            'coupons' => $coupons
        ]);
    }

    public function store(Request $request, $storeSlug)
    {
        $data = $request->all();

        $store = Store::where('slug', $storeSlug)->first();

        $coupon = Coupon::create([
            'store_id'          => $store->id,
            'code'              => $data['code'],
            'description'       => $data['description'],
            'discount_type'     => $data['discountType'],
            'discount_value'    => $data['discountValue'],
            'min_order_value'   => $data['minOrderValue'],
            'max_discount_value'=> $data['maxDiscountValue'],
            'usage_limit'       => $data['usageLimit'],
            'per_user_limit'    => $data['perUserLimit'],
            'used_count'        => $data['usedCount'] ?? 0,
            'start_at'          => $data['startAt'] ? Carbon::parse($data['startAt']) : null,
            'end_at'            => $data['endAt'] ? Carbon::parse($data['endAt']) : null,
        ]);

        $coupon->status = $coupon->start_at && Carbon::parse($coupon->start_at)->isFuture() ? 'inactive' : 'active';

        return response()->json(['message' => 'Coupon created successfully', 'coupon_id' => $coupon->id], 201);
    }

    public function update(Request $request, $storeSlug, $id)
    {
        $data = $request->all();

        $coupon = Coupon::findOrFail($id);

        $coupon->update([
            'code'              => $data['code'],
            'description'       => $data['description'],
            'discount_type'     => $data['discountType'],
            'discount_value'    => $data['discountValue'],
            'min_order_value'   => $data['minOrderValue'],
            'max_discount_value'=> $data['maxDiscountValue'],
            'usage_limit'       => $data['usageLimit'],
            'per_user_limit'    => $data['perUserLimit'],
            'used_count'        => $data['usedCount'] ?? $coupon->used_count,
            'start_at'          => $data['startAt'] ? Carbon::parse($data['startAt']) : null,
            'end_at'            => $data['endAt'] ? Carbon::parse($data['endAt']) : null,
        ]);

        return response()->json(['message' => 'Coupon updated successfully']);
    }

    public function destroy(Request $request, $storeSlug, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully']);
    }


    public function checkCoupons(Request $request)
    {
        $code = $request->code;
        $storeIds = $request->storeIds;

        $coupons = Coupon::where('code', $code)
            ->whereIn('store_id', $storeIds)
            ->get()
            ->map(fn($coupon) => [
                'id' => $coupon->id,
                'store_id' => $coupon->store_id,
                'code' => $coupon->code,
                'discountType' => $coupon->discount_type,
                'discountValue' => $coupon->discount_value,
                'minOrderValue' => $coupon->min_order_value,
                'maxDiscountValue' => $coupon->max_discount_value,
                'usageLimit' => $coupon->usage_limit,
                'perUserLimit' => $coupon->per_user_limit,
                'usedCount' => $coupon->used_count,
                'status' => $coupon->status,
            ]);

    if ($coupons->isEmpty()) {
        return response()->json([
                'valid' => false,
                'coupons' => [],
                'message' => 'No coupons found'
            ], 
        );
    }

    return response()->json([
            'valid' => true,
            'coupons' => $coupons
        ]);
    }

    public function updateStatus($storeId)
    {
        Coupon::where('store_id', $storeId)
            ->get()
            ->each(function ($coupon) {

                $status = $coupon->start_at && Carbon::parse($coupon->start_at)->isFuture()
                    ? 'inactive'
                    : ($coupon->end_at && Carbon::parse($coupon->end_at)->isPast()
                        ? 'expired'
                        : 'active');

                if ($coupon->status !== $status) {
                    $coupon->update([
                        'status' => $status
                    ]);
                }
            });
    }
}
