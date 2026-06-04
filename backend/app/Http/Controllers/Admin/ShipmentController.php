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
            'progress_percentage' => 'nullable|integer',
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string',
            'insurance' => 'nullable|string',
            'origin_address' => 'nullable|string',
            'destination_address' => 'nullable|string',
            'sender_name' => 'nullable|string',
            'receiver_name' => 'nullable|string'
        ]);

        if (empty($validated['tracking_number'])) {
            $validated['tracking_number'] = 'NBL-' . strtoupper(Str::random(8));
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

    public function track(string $resi)
    {
        $shipment = Shipment::with(['histories' => function ($query) {
            $query->orderBy('occurred_at', 'desc');
        }])->where('tracking_number', $resi)->first();

        if (!$shipment) {
            return response()->json([
                'success' => false,
                'message' => 'Resi tidak ditemukan.'
            ], 404);
        }

        if ($shipment->status === 'Delivered') {
            return response()->json([
                'success' => false,
                'message' => 'Resi tidak ditemukan atau pesanan sudah selesai.'
            ], 404);
        }

        return response()->json([
            'success' => true,
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
            'progress_percentage' => 'nullable|integer',
            'weight' => 'nullable|numeric',
            'dimensions' => 'nullable|string',
            'insurance' => 'nullable|string',
            'origin_address' => 'nullable|string',
            'destination_address' => 'nullable|string',
            'sender_name' => 'nullable|string',
            'receiver_name' => 'nullable|string'
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

    public function updateLocation(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        $shipment = Shipment::where('tracking_number', $validated['tracking_number'])->first();
        if (!$shipment) {
            return response()->json(['success' => false, 'message' => 'Resi tidak ditemukan.'], 404);
        }

        $shipment->update([
            'current_lat' => $validated['latitude'],
            'current_lng' => $validated['longitude']
        ]);

        return response()->json([
            'success' => true, 
            'message' => 'Lokasi berhasil diperbarui.',
            'shipment' => $shipment
        ]);
    }

    public function markAsDelivered(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string',
        ]);

        $shipment = Shipment::where('tracking_number', $validated['tracking_number'])->first();
        if (!$shipment) {
            return response()->json(['success' => false, 'message' => 'Resi tidak ditemukan.'], 404);
        }

        $shipment->update([
            'status' => 'Delivered',
            'progress_percentage' => 100
        ]);

        $shipment->histories()->create([
            'status_title' => 'Delivered',
            'location' => $shipment->destination,
            'description' => 'Paket telah sampai dan diterima di lokasi tujuan.',
            'occurred_at' => now()
        ]);

        // Simulasi Notifikasi WhatsApp (Dalam implementasi asli bisa menggunakan Fonnte/Watzap API)
        \Illuminate\Support\Facades\Log::info("WHATSAPP SENT to Customer regarding Shipment " . $shipment->tracking_number . " - Paket Terkirim.");
        $shipment->histories()->create([
            'status_title' => 'WA Notification',
            'location' => 'Sistem Nabila Trans',
            'description' => 'Notifikasi WhatsApp otomatis telah dikirim ke pelanggan bahwa paket telah diterima.',
            'occurred_at' => now()->addSeconds(5)
        ]);

        return response()->json(['success' => true, 'message' => 'Pesanan berhasil diselesaikan dan Notifikasi WA telah dipicu.']);
    }

    public function autoHistory(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string',
            'location_name' => 'required|string'
        ]);

        $shipment = Shipment::where('tracking_number', $validated['tracking_number'])->first();
        if (!$shipment) {
            return response()->json(['success' => false, 'message' => 'Resi tidak ditemukan.'], 404);
        }

        if ($shipment->status === 'Delivered') {
            return response()->json(['success' => false, 'message' => 'Pesanan sudah selesai.']);
        }

        $lastHistory = $shipment->histories()->orderBy('occurred_at', 'desc')->first();

        if (!$lastHistory || strtolower($lastHistory->location) !== strtolower($validated['location_name'])) {
            $shipment->histories()->create([
                'status_title' => 'In Transit',
                'location' => $validated['location_name'],
                'description' => 'Paket terpantau sedang melintasi area ' . $validated['location_name'],
                'occurred_at' => now()
            ]);
            return response()->json(['success' => true, 'message' => 'Riwayat berhasil ditambahkan otomatis.']);
        }

        return response()->json(['success' => true, 'message' => 'Lokasi masih sama, tidak ada history baru.']);
    }

    public function customerShipments(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'customer') {
            return response()->json(['success' => false, 'message' => 'Akses ditolak.'], 403);
        }

        $shipments = $user->shipments()->orderBy('updated_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $shipments]);
    }

    public function saveCustomerShipment(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string'
        ]);

        $user = $request->user();
        if ($user->role !== 'customer') {
            return response()->json(['success' => false, 'message' => 'Akses ditolak.'], 403);
        }

        $shipment = Shipment::where('tracking_number', $validated['tracking_number'])->first();
        if (!$shipment) {
            return response()->json(['success' => false, 'message' => 'Resi tidak ditemukan.'], 404);
        }

        // Attach shipment to user if not already attached
        if (!$user->shipments()->where('shipment_id', $shipment->id)->exists()) {
            $user->shipments()->attach($shipment->id);
        }

        return response()->json(['success' => true, 'message' => 'Resi berhasil disimpan.']);
    }

    public function driverStats(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'driver') {
            return response()->json(['success' => false, 'message' => 'Akses ditolak.'], 403);
        }

        // Hitung statistik untuk kurir (Misalnya komisi Rp 5000 per paket Delivered hari ini)
        $todayStart = now()->startOfDay();
        $todayEnd = now()->endOfDay();

        // Cari total riwayat Delivered hari ini
        $todayDelivered = \App\Models\ShipmentHistory::where('status_title', 'Delivered')
            ->whereBetween('occurred_at', [$todayStart, $todayEnd])
            ->count();
            
        $totalDelivered = \App\Models\ShipmentHistory::where('status_title', 'Delivered')->count();

        $todayCommission = $todayDelivered * 5000;

        return response()->json([
            'success' => true,
            'data' => [
                'today_delivered' => $todayDelivered,
                'total_delivered' => $totalDelivered,
                'today_commission' => $todayCommission
            ]
        ]);
    }
}
