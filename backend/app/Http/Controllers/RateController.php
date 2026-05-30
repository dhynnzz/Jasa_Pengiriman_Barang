<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RateController extends Controller
{
    public function calculate(Request $request)
    {
        $request->validate([
            'asal' => 'required|string',
            'tujuan' => 'required|string',
            'berat' => 'required|numeric|min:0.1',
            'layanan' => 'required|string'
        ]);

        $asal = $request->asal;
        $tujuan = $request->tujuan;
        $berat = $request->berat;
        $layanan = $request->layanan;

        // Base Pricing
        $basePrice = 25000;
        $estimasi = "1-2 Hari Kerja";
        if ($layanan === 'Ekonomi') {
            $basePrice = 12500;
            $estimasi = "3-5 Hari Kerja";
        } else if ($layanan === 'Express') {
            $basePrice = 45000;
            $estimasi = "Esok Hari (Next Day)";
        }

        // Get Coordinates
        $coordAsal = $this->getCoordinates($asal);
        $coordTujuan = $this->getCoordinates($tujuan);

        $biayaJarak = 0;
        $teksJarak = "";
        $isSuccess = false;

        if ($coordAsal && $coordTujuan) {
            // Coba ambil jarak jalan raya (OSRM)
            $drivingData = $this->getDrivingDistance($coordAsal['lon'], $coordAsal['lat'], $coordTujuan['lon'], $coordTujuan['lat']);
            
            if ($drivingData && $drivingData['distance'] > 0) {
                // Jarak jalan raya berhasil
                $distanceKm = round($drivingData['distance']);
                $durationSec = $drivingData['duration'];
                
                // Hitung estimasi waktu berdasarkan durasi berkendara (OSRM)
                $hours = ceil($durationSec / 3600);
                
                if ($layanan === 'Ekonomi') {
                    $hours += 48; // Tambahan waktu sortir & antrean (2 Hari)
                } else if ($layanan === 'Express') {
                    $hours += 6; // Prioritas cepat
                } else {
                    $hours += 24; // Standar (1 Hari ekstra)
                }
                
                if ($hours >= 24) {
                    $days = floor($hours / 24);
                    $remainingHours = $hours % 24;
                    if ($remainingHours > 0) {
                        $estimasi = "{$days} Hari {$remainingHours} Jam";
                    } else {
                        $estimasi = "{$days} Hari Kerja";
                    }
                } else {
                    $estimasi = "{$hours} Jam";
                }

                $biayaJarak = $distanceKm * 200; // Rp 200/km Jarak Darat
                $teksJarak = "Jarak Darat (Jalan Raya): {$distanceKm} km (Tarif: Rp 200/km)";
                $isSuccess = true;
            } else {
                // Fallback ke jarak lurus (Haversine)
                $straightDistance = $this->calculateHaversineDistance($coordAsal['lat'], $coordAsal['lon'], $coordTujuan['lat'], $coordTujuan['lon']);
                $distanceKm = round($straightDistance);
                
                // Estimasi kasar jarak lurus (asumsi truk 40km/jam)
                $hours = ceil($distanceKm / 40);
                
                if ($layanan === 'Ekonomi') {
                    $hours += 48;
                } else if ($layanan === 'Express') {
                    $hours += 6;
                } else {
                    $hours += 24;
                }
                
                if ($hours >= 24) {
                    $days = floor($hours / 24);
                    $remainingHours = $hours % 24;
                    if ($remainingHours > 0) {
                        $estimasi = "{$days} Hari {$remainingHours} Jam";
                    } else {
                        $estimasi = "{$days} Hari Kerja";
                    }
                } else {
                    $estimasi = "{$hours} Jam";
                }

                $biayaJarak = $distanceKm * 200;
                $teksJarak = "Jarak Udara/Lurus: {$distanceKm} km (Tarif: Rp 200/km)";
                $isSuccess = true;
            }
        } else {
            // Fallback jika tidak ketemu
            $biayaJarak = 15000;
            $teksJarak = "*Lokasi tidak akurat, menggunakan tarif jarak rata-rata";
        }

        $totalBiaya = ($basePrice * $berat) + $biayaJarak;

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $totalBiaya,
                'biaya_berat' => $basePrice * $berat,
                'biaya_jarak' => $biayaJarak,
                'rute' => "{$asal} ➔ {$tujuan} (Berat: {$berat} kg)",
                'estimasi' => $estimasi,
                'teks_jarak' => $teksJarak,
                'is_map_success' => $isSuccess
            ]
        ]);
    }

    private function getCoordinates($city)
    {
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'NabilaTrans/1.0 (Shipping Calculator)'
            ])->timeout(5)->get('https://nominatim.openstreetmap.org/search', [
                'q' => $city,
                'countrycodes' => 'id',
                'format' => 'json',
                'limit' => 1
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if (count($data) > 0) {
                    return [
                        'lat' => (float) $data[0]['lat'],
                        'lon' => (float) $data[0]['lon'],
                        'name' => $data[0]['display_name']
                    ];
                }
            }
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    private function getDrivingDistance($lon1, $lat1, $lon2, $lat2)
    {
        try {
            $url = "https://router.project-osrm.org/route/v1/driving/{$lon1},{$lat1};{$lon2},{$lat2}?overview=false";
            $response = Http::timeout(5)->get($url);
            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['routes'][0]['distance'])) {
                    // OSRM mengembalikan distance dalam meter dan duration dalam detik
                    return [
                        'distance' => $data['routes'][0]['distance'] / 1000,
                        'duration' => $data['routes'][0]['duration']
                    ];
                }
            }
        } catch (\Exception $e) {
            // Log error
        }
        return null;
    }

    private function calculateHaversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // radius in km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $earthRadius * $c;
    }
}
