<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment;
use Illuminate\Support\Str;

class PublicShipmentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'required|string',
            'receiver_name' => 'required|string',
            'origin' => 'required|string',
            'destination' => 'required|string',
            'origin_address' => 'required|string',
            'destination_address' => 'required|string',
            'weight' => 'required|numeric',
            'dimensions' => 'required|string',
            'service_type' => 'required|string',
            'insurance' => 'required|string',
        ]);

        $validated['tracking_number'] = 'NBL-' . strtoupper(Str::random(8));
        $validated['status'] = 'Menunggu Penjemputan';
        $validated['current_location'] = $validated['origin'];
        $validated['progress_percentage'] = 0;

        $shipment = Shipment::create($validated);

        // Auto create first history
        $shipment->histories()->create([
            'status_title' => 'Menunggu Penjemputan',
            'location' => $validated['origin'],
            'description' => 'Permintaan pengiriman telah diterima dan menunggu dijemput kurir.',
            'occurred_at' => now()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pesanan berhasil dibuat',
            'tracking_number' => $shipment->tracking_number,
            'data' => $shipment
        ], 201);
    }
}
