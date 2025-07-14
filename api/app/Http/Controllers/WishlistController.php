<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $products = Product::with([
            'categories:id',
            'tags:id',
            'store:id,slug'
        ])
        ->whereIn('id', function ($query) use ($user) {
            $query->select('product_id')
                ->from('wishlists')
                ->where('user_id', $user->id);
        })
        ->get(['id', 'name', 'price', 'stock', 'sku', 'status', 'type', 'store_id', 'created_at']);

        $products->transform(function (Product $product) {
            $product->category_ids = $product->categories->pluck('id')->toArray();
            $product->tag_ids = $product->tags->pluck('id')->toArray();
            $product->default_image_url = $product->defaultImage()->value('image_path');
            $product->store_slug = optional($product->store)->slug;
            unset($product->categories, $product->tags, $product->store);
            return $product;
        });

        return response()->json($products);
    }
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user();

        $wishlist = Wishlist::firstOrCreate([
            'user_id'    => $user->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => $wishlist->wasRecentlyCreated
                ? 'Item added to wishlist'
                : 'Item already in wishlist',
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $deleted = Wishlist::where([
            ['user_id', '=', $user->id],
            ['product_id', '=', $id],
        ])->delete();

        return $deleted
            ? response()->json(['message' => 'Item removed from wishlist.'], 200)
            : response()->json(['error' => 'Item not found.'], 404);
    }
}
