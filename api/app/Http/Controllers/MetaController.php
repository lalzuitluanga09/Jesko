<?php

namespace App\Http\Controllers;

use App\Models\StoreCategory;
use Illuminate\Http\Request;

class MetaController extends Controller
{
    public function getMeta()
    {
        $storeCategories = StoreCategory::whereNull('parent_id')
            ->where('is_active', true)
            ->get(['id', 'name', 'slug', 'icon', 'is_active', 'parent_id']);

        return response()->json([
            'store_categories' => $storeCategories
        ]);
    }
}
