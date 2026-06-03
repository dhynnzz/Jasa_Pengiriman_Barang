<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RateController extends Controller
{
    public function index()
    {
        $rates = \App\Models\Rate::orderBy('origin')->orderBy('destination')->get();
        return response()->json([
            'success' => true,
            'data' => $rates
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'regular_price' => 'required|numeric|min:0',
            'express_price' => 'required|numeric|min:0',
            'cargo_price' => 'required|numeric|min:0',
            'estimated_time' => 'nullable|string'
        ]);

        $rate = \App\Models\Rate::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Rate created successfully',
            'data' => $rate
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $rate = \App\Models\Rate::findOrFail($id);

        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'regular_price' => 'required|numeric|min:0',
            'express_price' => 'required|numeric|min:0',
            'cargo_price' => 'required|numeric|min:0',
            'estimated_time' => 'nullable|string'
        ]);

        $rate->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Rate updated successfully',
            'data' => $rate
        ]);
    }

    public function destroy(string $id)
    {
        $rate = \App\Models\Rate::findOrFail($id);
        $rate->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rate deleted successfully'
        ]);
    }
}
