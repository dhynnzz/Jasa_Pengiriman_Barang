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

    public function calculatePublic(Request $request)
    {
        $validated = $request->validate([
            'asal' => 'required|string',
            'tujuan' => 'required|string',
            'berat' => 'required|numeric|min:1',
            'layanan' => 'required|string|in:Ekonomi,Standar,Express'
        ]);

        $berat = $validated['berat'];
        $layanan = $validated['layanan'];

        $tarif_per_kg = 25000;
        if ($layanan == 'Ekonomi') $tarif_per_kg = 12500;
        if ($layanan == 'Express') $tarif_per_kg = 45000;

        // Mock distance calculation based on string hash for consistency
        $seed = md5(strtolower($validated['asal'] . $validated['tujuan']));
        $jarak_km = hexdec(substr($seed, 0, 4)) % 1000 + 10; // 10 to 1009 km

        $biaya_berat = $tarif_per_kg * $berat;
        $biaya_jarak = $jarak_km * 200;
        $total = $biaya_berat + $biaya_jarak;

        // Estimasi waktu tiba berdasarkan jarak (asumsi 1 hari = 500 km tempuh)
        $base_days = max(1, ceil($jarak_km / 500));
        
        if ($layanan == 'Ekonomi') {
            $min = $base_days + 2;
            $max = $base_days + 3;
            $estimasi = "{$min}-{$max} Hari Kerja";
        } elseif ($layanan == 'Express') {
            if ($jarak_km < 150) {
                $estimasi = "Hari Ini (Sameday)";
            } else {
                $estimasi = "{$base_days} Hari Kerja";
            }
        } else { // Standar
            $min = $base_days + 1;
            $max = $base_days + 2;
            $estimasi = "{$min}-{$max} Hari Kerja";
        }

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'rute' => strtoupper($validated['asal']) . ' ➔ ' . strtoupper($validated['tujuan']),
                'estimasi' => $estimasi,
                'is_map_success' => true,
                'teks_jarak' => "Jarak tempuh rute darat: " . $jarak_km . " km"
            ]
        ]);
    }
}
