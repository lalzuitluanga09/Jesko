<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    return response()->json([
        'message' => 'Login successful.',
        'user' => Auth::user()
    ]);
}

    public function logout()
    {
        Auth::guard('web')->logout();
        return response()->json([
            'message' => 'Logout successful.'
        ], 200);
    }
}
