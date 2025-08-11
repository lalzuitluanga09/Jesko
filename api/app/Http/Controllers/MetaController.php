<?php

namespace App\Http\Controllers;

use App\Models\StoreCategory;
use App\Models\StoreTheme;

class MetaController extends Controller
{
    public function getMeta()
    {
        $storeCategories = StoreCategory::whereNull('parent_id')
            ->where('is_active', true)
            ->get(['id', 'name', 'slug', 'icon', 'is_active', 'parent_id']);

        $storeThemes = StoreTheme::select('name', 'id')->get();

        return response()->json([
            'store_categories' => $storeCategories,
            'store_themes' => $storeThemes
        ]);
    }
}
