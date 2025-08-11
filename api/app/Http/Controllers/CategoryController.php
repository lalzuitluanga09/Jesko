<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        info($request->all());
        $store = Store::where('slug', $storeSlug)->first();
        $categories = Category::where('store_id', $store->id)->get(['id', 'name','slug']);

        return response()->json($categories);
    }

    public function store(Request $request, $storeSlug)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $name = Str::ucfirst(Str::lower($request->name));

        $store = Store::where('slug', $storeSlug)->first();
        
        Category::create([
            'name' => $name,
            'store_id' => $store->id,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'success'], 201);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $storeSlug, $id)
    {
        $category = Category::findOrFail($id);
        $name = Str::ucfirst(Str::lower($request->name));
        $category->update([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($storeSlug, $id)
    {
        Category::find($id)->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
