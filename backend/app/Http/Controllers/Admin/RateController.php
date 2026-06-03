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
        // Clean up input values in case user typed dot as thousands separator
        $request->merge([
            'regular_price' => (int) str_replace('.', '', $request->regular_price),
            'express_price' => (int) str_replace('.', '', $request->express_price),
            'cargo_price' => (int) str_replace('.', '', $request->cargo_price),
        ]);

        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'regular_price' => 'required|integer|min:0',
            'express_price' => 'required|integer|min:0',
            'cargo_price' => 'required|integer|min:0',
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

        $request->merge([
            'regular_price' => (int) str_replace('.', '', $request->regular_price),
            'express_price' => (int) str_replace('.', '', $request->express_price),
            'cargo_price' => (int) str_replace('.', '', $request->cargo_price),
        ]);

        $validated = $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
            'regular_price' => 'required|integer|min:0',
            'express_price' => 'required|integer|min:0',
            'cargo_price' => 'required|integer|min:0',
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
