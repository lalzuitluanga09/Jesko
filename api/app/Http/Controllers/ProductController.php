<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\ProductImage;
use App\Models\ProductVariationAttribute;
use Illuminate\Http\Request;

class ProductController extends Controller
{
public function index()
{
    $products = Product::with(['categories:id', 'tags:id'])
        ->whereNull('parent_id')
        ->get(['id', 'name', 'price', 'stock', 'sku', 'status', 'type']);

    $products->transform(function ($product) {
        $product->category_ids = $product->categories->pluck('id')->toArray();
        $product->tag_ids = $product->tags->pluck('id')->toArray();
        unset($product->categories, $product->tags);
        return $product;
    });

    return response()->json($products);
}


    public function store(Request $request)
    {
        $request->validate([
            'product.name' => 'required|string|max:255',
            'defaultImage' => 'image',
            'images.*' => 'image'
        ]);

        $productData = $request->product;
        $productData['store_id'] = 1;
        $productData['parent_id'] = null;
        $productData['type'] = 'simple';

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

        if ($request->has('variations') && $request->has('variation_items')) {
            $product->type = 'variable';
            $product->save();

            $variationAttributes = [];
            
            foreach (json_decode($request->variations, true) as $variation) {
                $attribute = ProductAttribute::create([
                    'product_id' => $product->id,
                    'name' => $variation['option'],
                ]);
                $variationAttributes[] = [
                    'id' => $attribute->id,
                    'name' => $variation['option'],
                    'values' => $variation['values'],
                ];
                foreach ($variation['values'] as $option_value) {
                    ProductAttributeValue::create([
                        'attribute_id' => $attribute->id,
                        'value' => $option_value
                    ]);
                }
            }

            foreach (json_decode($request->variation_items, true) as $item) {
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

                foreach ($item['values'] as $i => $value) {
                    $attribute = $variationAttributes[$i] ?? null;
                    if ($attribute) {
                            ProductVariationAttribute::create([
                                'product_id' => $variationProduct->id,
                                'attribute_id' => $attribute['id'],
                                'value' => $value,
                            ]);
                    }
                }
            }
        }

        return response()->json(['status' => 'success'], 201);
    }

    public function show($id)
    {
        $product = Product::select(['id', 'name', 'description', 'price', 'stock', 'sku', 'parent_id', 'status', 'type'])
            ->findOrFail($id);
        $categories = $product->categories()->pluck('categories.id')->toArray();
        $tags = $product->tags()->pluck('tags.id')->toArray();

        $attributes = $product->attributes()->with('values')->get();
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


    public function update(Request $request, $id)
    {
        info($request->all());
        info($request->defautImage);
        info($request->defaultImage);
        $product = Product::findOrFail($id);

        $productData = $request->product;
        $productData['store_id'] = 1;
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

    public function destroy($id)
    {
        Product::find($id)->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
