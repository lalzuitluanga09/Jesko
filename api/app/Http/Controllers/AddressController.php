<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Address::where('user_id', request()->user()->id)
            ->orderBy('is_default', 'desc')
            ->get(
                ['id', 'label', 'name', 'phone', 'address', 'landmark', 'district_id', 'postal_code', 'city', 'is_default']
            );
        return response()->json($addresses);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->all();
        $data['user_id'] = $user->id;

        $address = Address::create($data);

        if(!$request->user()->defaultAddress) {
            $address->is_default = true;
            $address->save();
        }

        return response()->json(['message' => 'Address created successfully', 'data' => $address], 201);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        $address = Address::where('id', $id)->where('user_id', $user->id)->first();

        if (!$address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $data = $request->all();
        $address->update($data);

        return response()->json(['message' => 'Address updated successfully', 'data' => $address]);
    }

    public function destroy($id)
    {
        $user = request()->user();
        $address = Address::where('id', $id)->where('user_id', $user->id)->first();

        if (!$address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $address->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }

    public function setDefault($id)
    {
        $user = request()->user();
        $address = Address::where('id', $id)->where('user_id', $user->id)->first();

        if (!$address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        Address::where('user_id', $user->id)->update(['is_default' => false]);
        $address->is_default = true;
        $address->save();

        return response()->json(['message' => 'Address set as default successfully']);
    }
}
