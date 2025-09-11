<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Store;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');
        $type = $request->query('type');
        $status = $request->query('status');
        $from = $request->query('from');
        $to = $request->query('to');

        $storeId = Store::where('slug', $storeSlug)->value('id');

        $sales = Sale::where('store_id', $storeId)
            ->when($searchTerm, fn($q) => $q->where('name', 'like', "%{$searchTerm}%"))
            ->when($type, fn($q) => $q->where('type', $type))
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($from, fn($q) => $q->where('created_at', '>=', $from))
            ->when($to, fn($q) => $q->where('created_at', '<=', $to))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(
                fn($sale) => [
                    'id' => $sale->id,
                    'name' => $sale->name,
                    'type' => $sale->type,
                    'description' => $sale->description,
                    'discount_type' => $sale->discount_type,
                    'discount_value' => $sale->discount_value ?? 0,
                    'rules' => json_decode($sale->rules, true),
                    'start_at' => $sale->start_at,
                    'end_at' => $sale->end_at,
                    'status' => $sale->status,
                    'applyTo' => $sale->products->isNotEmpty() ? 'individual' : ($sale->categories->isNotEmpty() ? 'categories' : 'all'),
                    'selectedProducts' => $sale->products->pluck('id') ?? [],
                    'selectedCategories' => $sale->categories->pluck('id') ?? [],
                ]
            );

        $products = Product::where('store_id', $storeId)->orderBy('name')->get(['id', 'name']);
        $categories = Category::where('store_id', $storeId)->orderBy('name')->get(['id', 'name']);

        return response()->json([
            'sales' => $sales,
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function store(Request $request, $storeSlug)
    {
        $storeId = Store::where('slug', $storeSlug)->value('id');

        $request['rules'] = $request->discountType === 'bogo' ? json_encode(['bogoX' => $request->bogoX, 'bogoY' => $request->bogoY]) : null;

        $sale = Sale::create([
            'store_id' => $storeId,
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description,
            'discount_type' => $request->discountType,
            'discount_value' => $request->discountValue ?? 0,
            'rules' => $request->rules ?? null,
            'start_at' => $request->startDate,
            'end_at' => $request->endDate,
            'status' => $request->status ?? 'draft',
        ]);

        switch ($request->applyTo) {
            case 'all':
            $sale->products()->sync(Product::where('store_id', $storeId)->pluck('id'));
            break;
            case 'individual':
            if ($request->has('selectedProducts')) {
                $sale->products()->sync($request->selectedProducts);
            }
            break;
            case 'categories':
            if ($request->has('selectedCategories')) {
                $sale->categories()->sync($request->selectedCategories);
            }
            break;
        }

        return response()->json(['message' => 'Sale created successfully', 'sale_id' => $sale->id], 201);
    }

    public function update(Request $request, $storeSlug, $id)
    {
        $storeId = Store::where('slug', $storeSlug)->value('id');

        $sale = Sale::findOrFail($id);
        $request['discount_type'] = $request->discountType;
        $request['discount_value'] = $request->discountValue;
        $request['rules'] = $request->discountType === 'bogo' ? json_encode(['bogoX' => $request->bogoX, 'bogoY' => $request->bogoY]) : null;
        $sale->update($request->all());

        switch ($request->applyTo) {
            case 'all':
                $sale->products()->sync(Product::where('store_id', $storeId)->pluck('id'));
                break;
            case 'individual':
                if ($request->has('selectedProducts')) {
                    $sale->products()->sync($request->selectedProducts);
                }
                break;
            case 'categories':
                if ($request->has('selectedCategories')) {
                    $sale->categories()->sync($request->selectedCategories);
                }
                break;
        }

        return response()->json(['message' => 'Sale updated successfully']);
    }

    public function destroy($storeSlug, $id)
    {
        $sale = Sale::findOrFail($id);
        $sale->products()->detach();
        $sale->categories()->detach();
        $sale->delete();

        return response()->json(['message' => 'Sale deleted successfully']);
    }
}
