<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$shipment = \App\Models\Shipment::create([
    'tracking_number' => 'NBL-8829441029',
    'status' => 'Dalam Perjalanan',
    'driver_name' => 'Bambang Wijaya',
    'current_location' => 'Hub Semarang, Jawa Tengah',
    'progress_percentage' => 75,
    'estimated_time' => '24 Oktober 2025 - 16:00',
    'weight' => 12.50,
    'dimensions' => '45 x 30 x 20 cm',
    'service_type' => 'Ekspres Hari Berikutnya',
    'insurance' => 'Aktif (Standar)',
    'origin' => 'Pusat Distribusi Gempol',
    'destination' => 'PT. Solusi Teknologi Utama',
    'origin_address' => 'Gempol, Pasuruan',
    'destination_address' => 'Kecamatan Gubeng, Surabaya, Jawa Timur, 60281'
]);

$shipment->histories()->createMany([
    [
        'status_title' => 'Paket tiba di Hub Semarang',
        'description' => 'Kiriman Anda telah sampai di pusat penyortiran regional di Semarang dan saat ini sedang diproses untuk tahap transit berikutnya.',
        'location' => 'Jl. Siliwangi No. 12, Semarang',
        'occurred_at' => now(),
    ],
    [
        'status_title' => 'Berangkat dari Pusat Penyortiran Jakarta',
        'description' => 'Paket tersebut telah meninggalkan fasilitas asal dan sekarang sedang dalam perjalanan melalui angkutan darat.',
        'location' => null,
        'occurred_at' => now()->subDay(),
    ],
    [
        'status_title' => 'Paket Diambil',
        'description' => 'Agen CV Nabila Trans telah berhasil mengambil kiriman dari pengirim.',
        'location' => null,
        'occurred_at' => now()->subDays(2),
    ],
    [
        'status_title' => 'Info Pengiriman Elektronik Diterima',
        'description' => 'Pengirim telah membuat label pengiriman dan data telah diterima oleh sistem kami.',
        'location' => null,
        'occurred_at' => now()->subDays(3),
    ]
]);

echo "Seeded NBL-8829441029 successfully.";
