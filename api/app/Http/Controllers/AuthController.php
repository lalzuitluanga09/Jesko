<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\StoreUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid email or password.'
        ], 401);
    }

    $user = Auth::user();

    return response()->json([
        'message' => 'Login successful.',
        'user' => $user,
        'userStores' => $user->getStoreUsersWithStore,
    ]);
}

    public function logout()
    {
        Auth::guard('web')->logout();
        return response()->json([
            'message' => 'Logout successful.'
        ], 200);
    }

    public function checkPin(Request $request)
    {
        $request->validate([
            'pin' => 'required',
            'store_id' => 'required|integer|exists:stores,id',
        ]);

        $user = $request->user();
        $userStore = $user->stores()->where('store_id', $request->store_id)->first();

        if (! $userStore || ! Hash::check($request->pin, $userStore->pin)) {
            return response()->json(['message' => 'Invalid PIN or store access'], 403);
        }

        session()->put("store_access_{$request->store_id}", true);

        return response()->json(['message' => 'Access granted', 'store' => $userStore]);
    }

    public function forgetSession()
    {
        foreach (session()->all() as $key => $value) {
            if (str_starts_with($key, 'store_access_')) {
                session()->forget($key);
            }
        }

        return response()->json(['message' => 'Store access sessions cleared']);
    }
}
