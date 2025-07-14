<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\StoreFollower;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getFollowedStores(Request $request)
    {
        $user = $request->user();
        $followedStores = $user->followedStores()
            ->withCount(['followers', 'products'])->get();
        return response()->json($followedStores);
    }

    public function follow(Request $request, Store $store)
    {
        $user = $request->user();

        if (! $user->followedStores()->where('store_id', $store->id)->exists()) {
            $user->followedStores()->attach($store->id);
        }

        return 'Success';
    }

    public function unfollow(Request $request, Store $store)
    {
        $user = $request->user();

        $user->followedStores()->detach($store->id);

        return 'Success';

    }

    public function getUserData(Request $request) 
    {
        $user = $request->user();

        $userStores = $user->storeUsers()
            ->with('store:id,name,slug,logo')
            ->get(['id', 'store_id', 'role', 'status', 'joined_at']);

        return response()->json([
            'user' => $user,
            'userStores' => $userStores
        ]);

    }

    public function getUserMeta(Request $request)
    {
        $user = $request->user();

        $followings = $user->followedStores()->pluck('store_id')->toArray();

        $userCart = $user->carts()->where('status', 'active')->first();

        $cartItems = $userCart ? $userCart->items->pluck('product_id') : collect();

        $wishlists = Wishlist::where('user_id', $user->id)->pluck('product_id');


        return response()->json([
            'followings' => $followings,
            'cart_items' => $cartItems,
            'wishlists' => $wishlists
        ]);

    }
}
