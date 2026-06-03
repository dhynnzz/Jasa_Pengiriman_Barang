<?php

namespace App\Http\Controllers;

use App\Models\Partnership;
use Illuminate\Http\Request;

class PartnershipController extends Controller
{
    public function index()
    {
        return response()->json(Partnership::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'place_status' => 'required|string|max:50',
        ]);

        $partnership = Partnership::create($validated);
        return response()->json($partnership, 201);
    }

    public function update(Request $request, $id)
    {
        $partnership = Partnership::findOrFail($id);
        $partnership->update($request->all());
        return response()->json($partnership);
    }

    public function destroy($id)
    {
        Partnership::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
