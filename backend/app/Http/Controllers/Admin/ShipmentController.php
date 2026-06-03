<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shipment;
use App\Models\ShipmentHistory;
use Illuminate\Support\Str;

class ShipmentController extends Controller
{
    public function index()
    {
        $shipments = Shipment::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $shipments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'nullable|unique:shipments,tracking_number',
            'status' => 'required|string',
            'origin' => 'required|string',
            'destination' => 'required|string',
            'service_type' => 'nullable|string',
            'driver_name' => 'nullable|string',
            'estimated_time' => 'nullable|string',
            'current_location' => 'nullable|string',
            'progress_percentage' => 'nullable|integer'
        ]);

        if (empty($validated['tracking_number'])) {
            $validated['tracking_number'] = 'NT' . strtoupper(Str::random(8));
        }

        $shipment = Shipment::create($validated);

        // Auto create first history
        $shipment->histories()->create([
            'status_title' => 'Picked Up',
            'location' => $validated['origin'],
            'description' => 'Paket telah diterima oleh agen Nabila Trans',
            'occurred_at' => now()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Shipment created successfully',
            'data' => $shipment
        ]);
    }

    public function show(string $id)
    {
        $shipment = Shipment::with('histories')->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $shipment
        ]);
    }

    public function update(Request $request, string $id)
    {
        $shipment = Shipment::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'string',
            'origin' => 'string',
            'destination' => 'string',
            'service_type' => 'nullable|string',
            'driver_name' => 'nullable|string',
            'estimated_time' => 'nullable|string',
            'current_location' => 'nullable|string',
            'progress_percentage' => 'nullable|integer'
        ]);

        $shipment->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Shipment updated successfully',
            'data' => $shipment
        ]);
    }

    public function destroy(string $id)
    {
        $shipment = Shipment::findOrFail($id);
        $shipment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Shipment deleted successfully'
        ]);
    }

    public function addHistory(Request $request, string $id)
    {
        $shipment = Shipment::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|string',
            'location' => 'required|string',
            'description' => 'required|string'
        ]);

        $historyData = [
            'status_title' => $validated['status'],
            'location' => $validated['location'],
            'description' => $validated['description'],
            'occurred_at' => now(),
        ];

        $history = $shipment->histories()->create($historyData);

        // Auto update shipment current status
        $shipment->update([
            'status' => $validated['status'],
            'current_location' => $validated['location']
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'History added successfully',
            'data' => $history
        ]);
    }
}
