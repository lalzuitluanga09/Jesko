<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $cart = $user->carts()->where('status', 'active')->with('items.product.store')->first();

        if (! $cart) {
            return response()->json([]);
        }

        $grouped = $cart->items->groupBy('store_id')->map(function ($items, $storeId) {
            $store = $items->first()->store ?? $items->first()->product->store;

            return [
                'store_id' => $store->id,
                'store_name' => $store->name,
                'store_slug' => $store->slug,
                'items' => $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price_at_addition' => $item->price_at_addition,
                        'product_name' => $item->product->name ?? null,
                        'product_image' => $item->product->image ?? null,
                        'product_price' => $item->product->price ?? null,
                        'product_categories' => $item->product->categories->pluck('name')
                    ];
                })->values()
            ];
        })->values();

        unset($cart->items);
        $cart->items = $grouped;

        return response()->json($cart);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $cart = $user->carts()->firstOrCreate(
            ['status' => 'active'],
            ['status' => 'active']
        );

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if (!$cartItem) {
            $cart->items()->create([
                'product_id' => $product->id,
                'store_id' => $product->store_id,
                'quantity' => $validated['quantity'],
                'price_at_addition' => $product->price,
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart'
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $cart = $user->carts()->where('status', 'active')->first();

        if (!$cart) {
            return response()->json(['error' => 'Active cart not found.'], 404);
        }

        $deleted = CartItem::where('cart_id', $cart->id)
                    ->where('product_id', $id)
                    ->delete();

        if ($deleted) {
            return response()->json(['status' => 'deleted'], 200);
        }

        return response()->json(['error' => 'Cart item not found.'], 404);
    }
}
