<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index()
    {
        return response()->json(Driver::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'vehicle_type' => 'required|string|max:50',
            'plate_number' => 'required|string|max:20',
            'status' => 'nullable|string'
        ]);

        $driver = Driver::create($validated);
        return response()->json($driver, 201);
    }

    public function update(Request $request, $id)
    {
        $driver = Driver::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:20',
            'vehicle_type' => 'sometimes|required|string|max:50',
            'plate_number' => 'sometimes|required|string|max:20',
            'status' => 'sometimes|nullable|string'
        ]);

        $driver->update($validated);
        return response()->json($driver);
    }

    public function destroy($id)
    {
        Driver::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
