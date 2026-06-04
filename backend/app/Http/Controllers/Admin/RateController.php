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

    private function getCoordinates($city) {
        try {
            $response = \Illuminate\Support\Facades\Http::withHeaders([
                'User-Agent' => 'NabilaTrans/1.0'
            ])->timeout(5)->get('https://nominatim.openstreetmap.org/search', [
                'q' => $city . ', Indonesia',
                'format' => 'json',
                'limit' => 1
            ]);
            
            if ($response->successful() && count($response->json()) > 0) {
                $data = $response->json()[0];
                return [
                    'lat' => (float)$data['lat'],
                    'lon' => (float)$data['lon']
                ];
            }
        } catch (\Exception $e) {
            // Ignore timeout or errors
        }
        return null;
    }

    private function calculateHaversineDistance($lat1, $lon1, $lat2, $lon2) {
        $earthRadius = 6371; // Radius of earth in km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        $distance = $earthRadius * $c;
        return $distance;
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

        // Dapatkan koordinat nyata
        $asalCoords = $this->getCoordinates($validated['asal']);
        $tujuanCoords = $this->getCoordinates($validated['tujuan']);
        
        $is_real_distance = false;

        if ($asalCoords && $tujuanCoords) {
            $straight_jarak_km = $this->calculateHaversineDistance($asalCoords['lat'], $asalCoords['lon'], $tujuanCoords['lat'], $tujuanCoords['lon']);
            // Convert straight line to approximate driving distance (multiplier 1.4 for winding roads in Indonesia)
            $jarak_km = ceil($straight_jarak_km * 1.4);
            $is_real_distance = true;
        } else {
            // Fallback jika API Nominatim gagal atau kota tidak ditemukan
            $seed = md5(strtolower($validated['asal'] . $validated['tujuan']));
            $jarak_km = hexdec(substr($seed, 0, 4)) % 1000 + 10; // 10 to 1009 km
        }

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
                'is_map_success' => $is_real_distance,
                'teks_jarak' => "Jarak tempuh rute darat: " . $jarak_km . " km"
            ]
        ]);
    }
}
