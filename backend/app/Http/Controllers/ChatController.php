<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['error' => 'API Key not configured'], 500);
        }

        $systemInstruction = "Anda adalah Nabila AI, asisten virtual cerdas, sopan, dan ramah yang dimiliki oleh CV Nabila Trans (perusahaan jasa pengiriman barang / logistik di Indonesia). Tugas Anda adalah menjawab pertanyaan pelanggan seputar pengiriman barang, cek resi, tarif, dan informasi layanan. Berikan jawaban yang singkat, padat, dan jelas (maksimal 2 paragraf). Jika ada pertanyaan di luar topik pengiriman barang, mohon maaf dan katakan bahwa Anda hanya bisa membantu seputar layanan Nabila Trans.";

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" . $apiKey;

        $response = Http::withoutVerifying()->timeout(15)->withHeaders([
            'Content-Type' => 'application/json',
        ])->post($url, [
            'system_instruction' => [
                'parts' => [
                    ['text' => $systemInstruction]
                ]
            ],
            'contents' => [
                [
                    'parts' => [
                        ['text' => $userMessage]
                    ]
                ]
            ]
        ]);

        if ($response->successful()) {
            $data = $response->json();
            
            // Periksa apakah response diblokir karena safety
            if (isset($data['candidates'][0]['finishReason']) && $data['candidates'][0]['finishReason'] !== 'STOP') {
                return response()->json(['reply' => 'Maaf, pertanyaan Anda melanggar kebijakan keamanan sistem kami.']);
            }

            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                $aiText = $data['candidates'][0]['content']['parts'][0]['text'];
            } else {
                $aiText = 'Maaf, saya tidak mengerti atau API gagal mengembalikan teks.';
            }

            return response()->json(['reply' => $aiText]);
        }

        return response()->json(['error' => 'Gagal menghubungi server AI'], 500);
    }
}
