<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$apiKey = env('GEMINI_API_KEY');
echo "API KEY IS: " . $apiKey . "\n";

$systemInstruction = "Anda adalah Nabila AI.";
$userMessage = "Halo";
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" . $apiKey;

$response = Illuminate\Support\Facades\Http::withoutVerifying()->post($url, [
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
    echo "SUCCESS:\n";
    print_r($response->json());
} else {
    echo "FAILED:\n";
    echo $response->status() . "\n";
    echo $response->body() . "\n";
}
