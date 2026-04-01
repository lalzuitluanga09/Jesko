<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');

        $store = Store::where('slug', $storeSlug)->firstOrFail();

        $customers = User::query()
            ->whereHas('orders', function ($q) use ($store) {
                $q->where('store_id', $store->id);
            })
            ->with('defaultAddress')
            ->when($searchTerm, function ($q) use ($searchTerm) {
                $q->where(function ($query) use ($searchTerm) {
                    $query->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('email', 'like', "%{$searchTerm}%")
                        ->orWhere('phone', 'like', "%{$searchTerm}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(fn($customer) => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'address' => $customer->defaultAddress?->address ?? 'N/A',
            ]);

        return response()->json($customers);
    }

}
