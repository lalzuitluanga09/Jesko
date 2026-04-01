<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getFollowedStores(Request $request)
    {
        $user = $request->user();

        $followedStores = $user->followedStores()
            ->with([
                'storeTheme:id,name',
                'activeSale:id,store_id,name',
                'owner:users.id,name,phone',
                'location:id,name'
            ])
            ->withCount(['followers', 'products'])
            ->get();

        $followedStores->transform(function ($store) {
            $store['theme'] = $store->storeTheme?->name;
            $store['active_sale'] = $store->activeSale?->name;
            $store['isNew'] = $store->launch_at?->gt(now()->subMonth()) ?? false;

            $store['owner'] = $store->owner ? [
                'name' => $store->owner->name,
                'phone' => $store->owner->phone,
            ] : null;

            $store['location'] = $store->location ? [
                'id' => $store->location->id,
                'name' => $store->location->name,
            ] : null;

            unset($store->storeTheme);
            unset($store->activeSale);
            unset($store->theme_id);

            return $store;
        });

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
            ->with([
                'store:id,name,slug,logo,theme_id',
                'store.storeTheme:id,name'
            ])
            ->get(['id', 'store_id', 'role', 'status', 'joined_at'])
            ->map(function ($storeUser) {
                return [
                    'id' => $storeUser->id,
                    'role' => $storeUser->role,
                    'status' => $storeUser->status,
                    'joined_at' => $storeUser->joined_at,
                    'store' => [
                        'id' => $storeUser->store->id,
                        'name' => $storeUser->store->name,
                        'slug' => $storeUser->store->slug,
                        'logo' => $storeUser->store->logo,
                        'theme' => optional($storeUser->store->storeTheme)->name,
                    ],
                ];
            });

        $userProfile = $user->profile()->where('user_id', $user->id)->first(['id', 'user_id', 'date_of_birth', 'gender', 'profile_image']);

        return response()->json([
            'user' => $user,
            'userStores' => $userStores,
            'profile_image' => $userProfile?->profile_image,
            'date_of_birth' => $userProfile?->date_of_birth?->format('Y-m-d'),
            'gender' => $userProfile?->gender
        ]);

    }

    public function getUserMeta(Request $request)
    {
        $user = $request->user();

        $followings = $user->followedStores()->pluck('store_id')->toArray();

        $userCart = $user->carts()->where('status', 'active')->first();

        $cartItems = $userCart ? $userCart->items->pluck('product_id') : collect();

        $wishlists = Wishlist::where('user_id', $user->id)->pluck('product_id');

        $pendingOrders = $user->orders()->where('status', 'pending')->count();


        return response()->json([
            'followings' => $followings,
            'cart_items' => $cartItems,
            'wishlists' => $wishlists,
            'pendingOrders'=> $pendingOrders
        ]);

    }
    public function updateUserData(Request $request)
    {
        $user = $request->user();

        $data = $request->only(['name', 'email', 'phone']);
        $profileData = $request->only(['date_of_birth', 'gender']);

        if ($request->hasFile('profile_image')) {
            $request->validate([
                'profile_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $profileData['profile_image'] = $request->file('profile_image')->store('profile_images', 'public');
        }

        if ($request->has('delete_profile_image') && $request->input('delete_profile_image')) {
            $profileData['profile_image'] = null;
        }

        $data = array_filter($data, fn($value) => !is_null($value));

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|confirmed',
            ]);
            $data['password'] = bcrypt($request->input('password'));
        }

        if (!empty($data)) {
            $user->update($data);
        }

        if (!empty($profileData)) {
            $user->profile()->update($profileData);
        }

        return response()->json([
            'message' => 'User data updated successfully.',
            'user' => $user->fresh()
        ]);
    }

    public function getCurrentStore($storeSlug)
    {
        $store = Store::where('slug', $storeSlug)->first();

        return response()->json($store);
    }
}
