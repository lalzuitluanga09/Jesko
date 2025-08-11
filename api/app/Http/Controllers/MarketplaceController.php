<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceCategory;
use App\Models\MarketplaceImage;
use App\Models\MarketplaceProduct;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function getItems(Request $request)
    {
        $searchTerm = $request->query('searchTerm');
        $categories = $request->query('category_ids');

        $products = MarketplaceProduct::with('images')
            ->where('status', 'active')
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
            $product->image_url = $product->images
                ->firstWhere('position', 0)?->image_url;
            unset($product->images);
            return $product;
        });


        $categories = MarketplaceCategory::get(['id', 'name']);

        return response()->json([
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function getUserItems(Request $request)
    {
        $user = $request->user();

        $products = MarketplaceProduct::with('images')
            ->where('user_id', $user->id)
            ->paginate(20, [
                'id',
                'title',
                'price',
                'discounted_price',
            ]);

        $products->transform(function ($product) {
            $product->image_url = $product->images
                ->firstWhere('position', 0)?->image_url;
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

        $images = $item->images;

        $related_items = MarketplaceProduct::inRandomOrder()->take(8)->get();

        $related_items->transform(function ($item) {
            $item->image_url = $item->images
                ->firstWhere('position', 0)?->image_url;
            unset($item->images);
            return $item;
        });

        return response()->json([
            'data' => $item,
            'images' => $images,
            'related_items' => $related_items
        ]);
    }

    public function storeItem(Request $request)
    {
        $user = $request->user();
        $item = $request->item;

        $item['user_id'] = $user->id;

        $product = MarketplaceProduct::create($item);


        if ($request->has('images')) {
            foreach ($request->input('images') as $index => $imgData) {
                $imageFile = $request->file("images.$index.file");
                $position = $imgData['position'] ?? 0;

                if ($imageFile) {
                    $path = $imageFile->store('marketplace', 'public');

                    MarketplaceImage::create([
                        'marketplace_product_id' => $product->id,
                        'image_url' => $path,
                        'position' => $position,
                    ]);
                }
            }
        }

         return response()->json(['status' => 'success'], 201);
    }

    public function updateItem(Request $request)
    {
        $item = $request->item;

        $product = MarketplaceProduct::findOrFail($item['id']);
        $product->update($item);


        if ($request->has('deleted_image_ids')) {
            MarketplaceImage::whereIn('id', $request->deleted_image_ids)->delete();
        }

        if ($request->has('images')) {
            foreach ($request->input('images') as $index => $imgData) {
                $imageFile = $request->file("images.$index.file");
                $position = $imgData['position'] ?? 0;

                if ($imageFile) {
                    $path = $imageFile->store('marketplace', 'public');

                    MarketplaceImage::create([
                        'marketplace_product_id' => $product->id,
                        'image_url' => $path,
                        'position' => $position,
                    ]);
                }
            }
        }

         
        return response()->json(['status' => 'updated'], 200);
    }

    public function getItem($id)
    {
        $item = MarketplaceProduct::where('id', $id)->first();
        $images = $item->images()->orderBy('position')->get();

        return response()->json([
            'data' => $item,
            'images' => $images,
        ]);
    }

    public function deleteItem($id)
    {
        $item = MarketplaceProduct::findOrFail($id);
        $item->delete();

        $item->images()->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
