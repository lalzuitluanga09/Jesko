<?php

namespace App\Http\Middleware;

use App\Models\Store;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureStoreAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $storeSlug = $request->route('storeslug');

        if (!$storeSlug) {
            return response()->json(['message' => 'Missing store identifier'], 400);
        }

        $store =Store::where('slug', $storeSlug)->first();

        if (!$store) {
            return response()->json(['message' => 'Invalid store'], 404);
        }

        if (!session("store_access_{$store->id}")) {
            return response()->json(['message' => 'Unauthorized: PIN required'], 403);
        }
        
        return $next($request);
    }
}
