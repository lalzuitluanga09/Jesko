<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    public function index($storeSlug)
    {
        $store = Store::where('slug', $storeSlug)->first();
        
        if (!$store) abort(404, 'Store not found');

        $tags = Tag::where('store_id', $store->id)->get(['id', 'name','slug'] );

        return response()->json($tags);
    }

    public function store(Request $request, $storeSlug)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $store = Store::where('slug', $storeSlug)->first();

        if (!$store) abort(404, 'Store not found');
        
        $name = Str::ucfirst(Str::lower($request->name));
        Tag::create([
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
        $tag = Tag::findOrFail($id);
        $name = Str::ucfirst(Str::lower($request->name));
        $tag->update([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($storeSlug, $id)
    {
        Tag::find($id)->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}