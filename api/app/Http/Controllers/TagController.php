<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
        public function index()
    {
        $tags = Tag::where('store_id', 1)->get(['id', 'name','slug'] );

        return response()->json($tags);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $name = Str::ucfirst(Str::lower($request->name));
        Tag::create([
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
        $tag = Tag::findOrFail($id);
        $name = Str::ucfirst(Str::lower($request->name));
        $tag->update([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);

        return response()->json(['status' => 'updated'], 200);
    }

    public function destroy($id)
    {
        Tag::find($id)->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}