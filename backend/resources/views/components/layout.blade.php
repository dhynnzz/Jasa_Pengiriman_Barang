<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Nabila Trans - Jasa Pengiriman Barang</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('head')
</head>
<body class="font-sans bg-gray-50 text-slate-800 antialiased min-h-screen flex flex-col">
    <x-navbar />
    <main class="flex-grow">
        {{ $slot }}
    </main>
    <x-footer />
</body>
</html>
