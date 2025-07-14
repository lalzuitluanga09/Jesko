<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Store;
use App\Models\StoreUser;
use App\Models\Tag;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function getStores(Request $request)
    {
        $categoryId = $request->query('category_id');
        $searchTerm = $request->query('searchTerm');
        $stores = Store::select([
                'id',
                'name',
                'slug',
                'logo',
                'description',
                'cover_image',
                'is_published',
                'is_featured',
                'launch_at',
                'category_id'
            ])
            ->when($categoryId, function($q) use ($categoryId) {
                $q->where('category_id', $categoryId);
            })
            ->when($searchTerm, function ($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->withCount(['followers', 'products'])
            ->paginate(16);

        return response()->json($stores);
    }

    public function getStoreProducts(Request $request)
    {
        $storeId = $request->query('store_id');

        $filter = $request->query('filter');

        $searchTerm   = $filter['searchTerm'];
        $sort         = $filter['sort'];
        $category_ids   = $filter['categories'] ?? [];
        $tag_ids   = $filter['tags'] ?? [];
        $priceRange   = $filter['price_range'] ?? null;

        $products = Product::where('store_id', $storeId)
            ->where('status', 'active')
            ->with(['categories:id', 'tags:id'])
            ->whereNull('parent_id')
            ->when($searchTerm, fn($q) =>
                $q->where('name', 'like', '%' . $searchTerm . '%')
            )
            ->when($priceRange, fn($q) =>
                $q->whereBetween('price', [$priceRange[0], $priceRange[1]])
            )
            ->when(!empty($category_ids), fn($q) =>
                $q->whereHas('categories', fn($q2) =>
                    $q2->whereIn('categories.id', $category_ids)
                )
            )
            ->when(!empty($tag_ids), fn($q) =>
                $q->whereHas('tags', fn($q2) =>
                    $q2->whereIn('tags.id', $tag_ids)
                )
            )
            ->when(in_array($sort, ['price_low_high', 'price_high_low', 'newest']), function ($q) use ($sort) {
                return match ($sort) {
                    'price_low_high' => $q->orderBy('price', 'asc'),
                    'price_high_low' => $q->orderBy('price', 'desc'),
                    'newest'         => $q->orderBy('created_at', 'desc'),
                };
            })
            ->paginate(16, ['id', 'name', 'price', 'stock', 'sku', 'status', 'type', 'created_at']);

        $products->transform(function ($product) {
            $product->category_ids = $product->categories->pluck('id')->toArray();
            $product->tag_ids = $product->tags->pluck('id')->toArray();
            $product->default_image_url = $product->defaultImage()->value('image_path');
            unset($product->categories, $product->tags);
            return $product;
        });

        return response()->json($products);
    }

    public function getTopStores()
    {
        $topStores = Store::select([
                'id',
                'name',
                'slug',
                'logo',
                'description',
                'cover_image',
                'is_published',
                'is_featured',
                'launch_at'
            ])
            ->withCount(['followers', 'products'])
            ->orderBy('followers_count', 'desc')
            ->limit(10)
            ->get();

        return response()->json($topStores);
    }

    public function getStoreData(Request $request, $slug)
    {
        $store = Store::where('slug', $slug)
            ->select([
                'id',
                'name',
                'slug',
                'logo',
                'description',
                'cover_image',
                'is_published',
                'is_featured',
                'launch_at'
            ])->withCount(['followers', 'products'])
             ->firstOrFail();
        
        $owner = StoreUser::with('user:id,name,email,phone')
            ->where('store_id', $store->id)
            ->where('role', 'owner')
            ->first();

        $ownerData = $owner
            ? [
                'id'     => $owner->user->id,
                'name'   => $owner->user->name,
                'email'  => $owner->user->email,
                'phone'  => $owner->user->phone,
                'role'   => $owner->role,
                'status' => $owner->status,
            ]
            : null;

        $maxPrice = (float) Product::where('store_id', $store->id)
            ->where('status', 'active')
            ->max('price');

        $categories = Category::where('store_id', $store->id)->get(['id', 'name','slug']);
        $tags = Tag::where('store_id', $store->id)->get(['id', 'name','slug']);


        return response()->json([
            'store' => $store,
            'owner' => $ownerData,
            'max_price' => $maxPrice,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function getProductData(Request $request, $id) {
        $product = Product::with(['categories:id', 'tags:id',
                'variations.variationAttributes.attribute'
            ])
            ->where('id', $id)
            ->whereNull('parent_id')
            ->first(['id', 'store_id', 'name', 'description', 'price', 'stock', 'sku', 'status', 'type', 'created_at']);

        if ($product) {
            $product->category_ids = $product->categories->pluck('id')->toArray();
            $product->tag_ids = $product->tags->pluck('id')->toArray();
            unset($product->categories, $product->tags);
        }

        $seller = Store::where('id', $product->store_id)
            ->select([
                'id',
                'name',
                'slug',
            ])
             ->firstOrFail();

      $images = ProductImage::where('product_id', $product->id)
                ->orderByDesc('is_primary')
                ->get(['id', 'image_path', 'is_primary']);


        $attributes = [];

        foreach ($product->variations as $variation) {
            foreach ($variation->variationAttributes as $attr) {
                $attrName = $attr->attribute->name ?? null;
                $attrValue = $attr->value;

                if ($attrName) {
                    $attributes[$attrName][] = $attrValue;
                }
            }
        }
        
        foreach ($attributes as $key => $vals) {
            $attributes[$key] = array_values(array_unique($vals));
        }
        
        $variations = $product->variations->map(function ($variation) {
            $attributes = [];

            foreach ($variation->variationAttributes as $attr) {
                $attrName = $attr->attribute->name ?? null;
                if ($attrName) {
                    $attributes[$attrName] = $attr->value;
                }
            }

            return [
                'id' => $variation->id,
                'price' => $variation->price,
                'stock' => $variation->stock,
                'sku' => $variation->sku,
                'attributes' => $attributes,
            ];
        });

        unset($product->variations);

        return response()->json([
            'product' => $product,
            'seller' => $seller,
            'images' => $images,
            'attribute' => $attributes,
            'variations' => $variations
        ]);
    }
}
