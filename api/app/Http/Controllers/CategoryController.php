<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('store_id', 1)->get(['id', 'name','slug']);

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $name = Str::ucfirst(Str::lower($request->name));
        
        Category::create([
            'name' => $name,
            'store_id' => Store::first()->id,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'success'], 201);
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $name = Str::ucfirst(Str::lower($request->name));
        $category->update([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($id)
    {
        Category::find($id)->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
