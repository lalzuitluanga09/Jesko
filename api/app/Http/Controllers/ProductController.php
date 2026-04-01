<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Models\ProductVariationAttribute;
use App\Models\Store;
use App\Models\Tag;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');
        $status = $request->query('status');
        $categoryId = $request->query('category');
        $tagId = $request->query('tag');

        $store = Store::where('slug', $storeSlug)->first();

        if (!$store) abort(404, 'Store not found');

        $products = Product::with(['categories:id', 'tags:id'])
            ->whereNull('parent_id')
            ->where('store_id', $store->id)
            ->when($searchTerm, function ($q) use ($searchTerm) {
                $q->where(function ($query) use ($searchTerm) {
                    $query->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('sku', 'like', "%{$searchTerm}%");
                });
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->when($categoryId, function ($q) use ($categoryId) {
                $q->whereHas('categories', function ($c) use ($categoryId) {
                    $c->where('categories.id', $categoryId);
                });
            })
            ->when($tagId, function ($q) use ($tagId) {
                $q->whereHas('tags', function ($t) use ($tagId) {
                    $t->where('tags.id', $tagId);
                });
            })
            ->paginate(10,['id', 'name', 'price', 'stock', 'sku', 'status', 'type']);

        $products->transform(function ($product) {
            $product->category_ids = $product->categories->pluck('id')->toArray();
            $product->tag_ids = $product->tags->pluck('id')->toArray();
            unset($product->categories, $product->tags);
            return $product;
        });

        $categories = Category::where('store_id', $store->id)->orderBy('name')->get(['id', 'name']);
        $tags = Tag::where('store_id', $store->id)->orderBy('name')->get(['id', 'name']);

        return response()->json([
            'products' => $products,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }


    public function store(Request $request, $storeSlug)
    {
        $request->validate([
            'product.name' => 'required|string|max:255',
            'defaultImage' => 'image',
            'images.*' => 'image'
        ]);
        $store = Store::where('slug', $storeSlug)->first();

        $productData = $request->product;
        $productData['store_id'] = $store->id;
        $productData['parent_id'] = null;
        $productData['type'] = 'simple';


        $productData['sku'] = $storeSlug . '-' . ($productData['sku'] ?? $productData['name']);

        $product = Product::create($productData);

        $categories = $request->product['category_ids'] ?? [];
        $tags = $request->product['tag_ids'] ?? [];

        if (is_array($categories) && count($categories)) {
            $product->categories()->attach($categories);
        }

        if (is_array($tags) && count($tags)) {
            $product->tags()->attach($tags);
        }


        if ($request->hasFile('defaultImage')) {
            $defaultPath = $request->file('defaultImage')->store('products', 'public');

            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $defaultPath,
                'is_primary' => true
            ]);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_primary' => false
                ]);
            }
        }
        // Variation input
        // 'variations' => '[{"option":"size","values":["sm","l"]},{"option":"color","values":["green","blue"]}]',
        // 'variation_items' => '[{"values":["sm","green"],"stock":0,"price":0},{"values":["l","green"],"stock":0,"price":0},{"values":["sm","blue"],"stock":0,"price":0},{"values":["l","blue"],"stock":0,"price":0}]',

        $variations = json_decode($request->variations, true);
        $variationItems = json_decode($request->variation_items, true);

        if ($request->has('variations') && $request->has('variation_items') && !empty($variationItems)) {
            $product->type = 'variable';
            $product->save();

            $variationAttributes = [];
            
            foreach ($variations as $variation) {
                $attribute = ProductAttribute::create([
                    'product_id' => $product->id,
                    'name' => $variation['option'],
                ]);
                $variationAttributes[] = [
                    'id' => $attribute->id,
                    'name' => $variation['option'],
                    'values' => $variation['values'],
                ];
            }
            $stocks = 0;
            $price = 0;

            foreach ($variationItems as $item) {
                $variationProduct = Product::create([
                    'name' => $product->name,
                    'store_id' => $product->store_id,
                    'parent_id' => $product->id,
                    'price' => $item['price'],
                    'stock' => $item['stock'],
                    'sku' => $item['sku'] ?? null,
                    'status' => $product->status,
                    'type' => 'variant'
                ]);

                $sufix = [];
                $stocks += $item['stock'];
                $price = $price == 0 ? $item['price'] : min($price, $item['price']);

                foreach ($item['values'] as $i => $value) {
                    $sufix [] = $value;
                    $attribute = $variationAttributes[$i] ?? null;
                    if ($attribute) {
                            ProductVariationAttribute::create([
                                'product_id' => $variationProduct->id,
                                'attribute_id' => $attribute['id'],
                                'value' => $value,
                            ]);
                    }
                }

                $variationProduct->name = $product->name . ' - ( ' . implode(', ', array: $sufix) . ' )';
                $variationProduct->sku = $variationProduct->sku ?? ($product->sku . '-' . implode('-', array: $sufix));
                $variationProduct->save();  
            }
            $product->stock = $stocks;
            $product->price = $price;
            $product->save();
        }

        return response()->json(['status' => 'success'], 201);
    }

    public function show($storeSlug, $id)
    {
        $product = Product::select(['id', 'name', 'description', 'price', 'stock', 'sku', 'parent_id', 'status', 'type'])
            ->findOrFail($id);
        $categories = $product->categories()->pluck('categories.id')->toArray();
        $tags = $product->tags()->pluck('tags.id')->toArray();

        $attributes = $product->attributes()->with('values')->get();
        $attributes->each(function ($attribute) {
            $attribute->setRelation(
                'values',
                $attribute->values->unique('value')->values()
            );
        });
        $variations = $product->variations()->with('variationAttributes.attribute')->get();

        $imagesData = ProductImage::where('product_id', $product->id)
            ->get(['id', 'image_path', 'is_primary']);

        $defaultImage = optional($imagesData->firstWhere('is_primary', true))->image_path;
        $images = $imagesData->where('is_primary', false)->map(function ($img) {
            return [
                'id' => $img->id,
                'image_path' => $img->image_path,
            ];
        })->values()->all();

        return response()->json([
            'product' => $product,
            'categories' => $categories,
            'tags' => $tags,
            'defaultImage' => $defaultImage,
            'images' => $images,
            'attributes' => $attributes->map(function ($attr) {
                return [
                    'name' => $attr->name,
                    'values' => $attr->values->pluck('value')
                ];
            }),
            'variations' => $variations->map(function ($variation) {
                return [
                    'id' => $variation->id,
                    'price' => $variation->price,
                    'stock' => $variation->stock,
                    'sku' => $variation->sku,
                    'attributes' => $variation->variationAttributes->mapWithKeys(function ($attr) {
                        return [$attr->attribute->name => $attr->value];
                    }),
                ];
            }),
        ]);
    }


    public function update(Request $request, $storeSlug, $id)
    {
        $product = Product::findOrFail($id);
        $storeId = Store::where('slug', $storeSlug)->value('id');

        $productData = $request->product;
        $productData['store_id'] = $storeId;
        $productData['parent_id'] = null;

        $product->update($productData);

       $categories = $request->product['category_ids'] ?? [];
        $tags = $request->product['tag_ids'] ?? [];

        if (is_array($categories)) {
            $product->categories()->sync($categories);
        }

        if (is_array($tags)) {
            $product->tags()->sync($tags);
        }

        if($productData['status']) {
            $product->children()->update([
                'status' => $productData['status']
            ]);
        }

        if (!$request->has('defaultImage')) {
            $oldImage = ProductImage::where('product_id', $product->id)->where('is_primary', true)->first();
            if ($oldImage) {
                $oldImage->delete();
            }
        }

        if ($request->file('defaultImage')) {
            $oldImage = ProductImage::where('product_id', $product->id)->where('is_primary', true)->first();
            if ($oldImage) {
                $oldImage->delete();
            }
            $defaultPath = $request->file('defaultImage')->store('products', 'public');

            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $defaultPath,
                'is_primary' => true
            ]);
        }

        if ($request->has('deleted_image_ids')) {
            ProductImage::whereIn('id', $request->deleted_image_ids)->delete();
        }

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['image_path' => $path]);
            }
        }

        if($request->has('variations')) {
            foreach (json_decode($request->variations, true) as $variation) {
                $variationProduct = Product::find($variation['id']);
                if ($variationProduct) {
                    $variationProduct->update([
                        'price' => $variation['price'],
                        'stock' => $variation['stock']
                    ]);
                }
            }
        }

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($storeSlug, $id)
    {
        $product = Product::find($id);
        $product->delete();

        $product->images()->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
