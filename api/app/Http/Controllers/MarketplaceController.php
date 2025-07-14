<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceCategory;
use App\Models\MarketplaceProduct;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function getProducts(Request $request)
    {
        $searchTerm = $request->query('searchTerm');
        $categories = $request->query('category_ids');

        $products = MarketplaceProduct::with('images')
            ->when($searchTerm, function($q) use($searchTerm) {
                $q->where('title', 'like', '%'.$searchTerm.'%');
            })
            ->when($categories, function($q) use ($categories) {
                $q->whereIn('category_id', $categories);
            })
            ->paginate(20, [
                'id',
                'title',
                'price',
                'discounted_price',
            ]);

        $products->transform(function ($product) {
            $product->image_url = $product->images()->where('position', 0)->first()?->value('image_url');
            unset($product->images);
            return $product;
        });


        $categories = MarketplaceCategory::get(['id', 'name']);

        return response()->json([
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function fetchItem($id)
    {
        $item = MarketplaceProduct::where('id', $id)->first();

        $images = $item->images()->orderBy('position')->get();

        $related_items = MarketplaceProduct::inRandomOrder()->take(8)->get();

        return response()->json([
            'data' => $item,
            'images' => $images,
            'related_items' => $related_items
        ]);
    }
}
