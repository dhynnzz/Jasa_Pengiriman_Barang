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
        
        $oldStatus = $partnership->status;
        $partnership->update($request->all());
        $newStatus = $partnership->status;

        // Fonnte API Integration
        if ($oldStatus !== $newStatus && in_array($newStatus, ['Disetujui', 'Ditolak'])) {
            $token = env('FONNTE_TOKEN');
            
            if ($token) {
                // Format phone number to 62...
                $phone = preg_replace('/\D/', '', $partnership->phone);
                if (str_starts_with($phone, '0')) {
                    $phone = '62' . substr($phone, 1);
                }

                $message = '';
                if ($newStatus === 'Disetujui') {
                    $message = "Halo {$partnership->name},\n\nSelamat! Pengajuan Anda sebagai Agen Nabila Trans telah *DISETUJUI*. 🎉\n\nTim kami akan segera menghubungi Anda kembali untuk proses penandatanganan kontrak dan setup sistem aplikasi.\n\nTerima kasih,\n*Nabila Trans*";
                } else if ($newStatus === 'Ditolak') {
                    $message = "Halo {$partnership->name},\n\nTerima kasih atas minat Anda bergabung bersama Nabila Trans. Mohon maaf, setelah melakukan evaluasi, pengajuan agen Anda *BELUM DAPAT KAMI TERIMA* pada saat ini karena belum memenuhi kriteria penempatan wilayah kami.\n\nTetap semangat dan sukses selalu untuk Anda!\n\nTerima kasih,\n*Nabila Trans*";
                }

                try {
                    \Illuminate\Support\Facades\Http::withHeaders([
                        'Authorization' => $token
                    ])->post('https://api.fonnte.com/send', [
                        'target' => $phone,
                        'message' => $message,
                        'delay' => '1',
                        'countryCode' => '62', // Optional
                    ]);
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Fonnte send failed: ' . $e->getMessage());
                }
            }
        }

        return response()->json($partnership);
    }

    public function destroy($id)
    {
        Partnership::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
