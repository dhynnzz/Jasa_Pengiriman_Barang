<x-layout>
    <div class="bg-gray-50 pb-20">
        <!-- Header -->
        <div class="text-center pt-16 pb-10">
            <span class="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2 block">Kalkulator Biaya Pengiriman</span>
            <h1 class="text-4xl font-extrabold text-blue-950 mb-4">Hitung Biaya Pengiriman Anda</h1>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Pastikan efisiensi biaya logistik dengan alat hitung kami yang mudah digunakan. Dapatkan estimasi harga akurat untuk semua tujuan.
            </p>
        </div>

        <!-- Calculator Form -->
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-10 flex flex-col lg:flex-row gap-10">
                <form class="w-full lg:w-2/3">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label class="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Asal Kota</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <input type="text" id="input-asal" class="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500" value="Jakarta, Indonesia">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Tujuan Kota</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <input type="text" id="input-tujuan" class="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500" value="Surabaya, Indonesia">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Berat Barang (kg)</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                                </span>
                                <input type="number" id="input-berat" class="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500" value="5">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Jenis Pengiriman</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </span>
                                <select id="input-layanan" class="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-blue-500 appearance-none">
                                    <option value="Ekonomi">Ekonomi</option>
                                    <option value="Standar" selected>Standar (Rekomendasi)</option>
                                    <option value="Express">Express</option>
                                </select>
                                <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="button" id="btn-hitung" class="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 mt-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span id="btn-text">Hitung Biaya</span>
                        <svg id="btn-spinner" class="hidden animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </button>

                    <!-- Result Box -->
                    <div id="hasil-kalkulasi" class="hidden mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center transform transition-all duration-500">
                        <h4 class="text-sm font-bold text-green-800 uppercase tracking-wider mb-2">Estimasi Biaya Pengiriman</h4>
                        <div class="text-4xl font-extrabold text-green-600 mb-2" id="harga-hasil">Rp 0</div>
                        <p class="text-sm text-green-700 font-medium" id="rute-hasil">Jakarta ke Surabaya</p>
                        <div class="mt-4 inline-block bg-white px-4 py-2 rounded-full border border-green-100 shadow-sm">
                            <p class="text-xs text-green-800">Estimasi Tiba: <span id="waktu-hasil" class="font-bold text-green-600">1-2 Hari</span></p>
                        </div>
                        <p class="text-xs text-green-600 mt-3" id="jarak-hasil"></p>
                    </div>
                </form>
                
                <div class="w-full lg:w-1/3 bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                    <h3 class="font-bold text-blue-950 mb-4">Mengapa Memilih Solusi Kami</h3>
                    <ul class="space-y-3 mb-6">
                        <li class="flex gap-2">
                            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span class="text-sm text-gray-600">Tarif transparan, tanpa biaya tersembunyi</span>
                        </li>
                        <li class="flex gap-2">
                            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span class="text-sm text-gray-600">Keamanan maksimal, asuransi penuh</span>
                        </li>
                        <li class="flex gap-2">
                            <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            <span class="text-sm text-gray-600">Jaringan luas lebih dari 500 kota di seluruh Indonesia</span>
                        </li>
                    </ul>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                        <span class="text-orange-500 text-xs font-bold uppercase tracking-wider block mb-1">Promo Khusus!</span>
                        <p class="text-xs text-gray-600">Diskon 10% untuk pengiriman pertama Anda menggunakan kode <strong>NBL10</strong>.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pricing Cards -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                <!-- Ekonomi -->
                <div class="bg-green-900 rounded-2xl shadow-xl p-8 relative hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 border-green-400">
                    <div class="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">Ekonomi</h3>
                    <p class="text-green-200 text-sm mb-6">Layanan hemat yang andal untuk barang tanpa tenggat waktu ketat.</p>
                    <div class="flex items-end gap-1 mb-6">
                        <span class="text-3xl font-extrabold text-white">Rp 12.500</span>
                        <span class="text-green-200 font-medium">/kg</span>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            <span class="text-sm text-white font-medium">3-5 Hari Kerja</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            <span class="text-sm text-white font-medium">Pelacakan standar</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            <span class="text-sm text-white font-medium">Asuransi dasar</span>
                        </li>
                    </ul>
                </div>

                <!-- Standar (Popular) -->
                <div class="bg-blue-950 rounded-2xl shadow-xl p-8 relative transform scale-105 hover:scale-110 transition-transform duration-300 border-t-4 border-orange-500 hover:shadow-2xl z-10">
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                        Rekomendasi
                    </div>
                    <div class="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">Standar</h3>
                    <p class="text-blue-200 text-sm mb-6">Keseimbangan ideal antara biaya dan kecepatan untuk pengiriman reguler.</p>
                    <div class="flex items-end gap-1 mb-6">
                        <span class="text-3xl font-extrabold text-white">Rp 25.000</span>
                        <span class="text-blue-200 font-medium">/kg</span>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span class="text-sm text-white font-medium">1-2 Hari Kerja</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span class="text-sm text-white font-medium">Pelacakan real-time</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span class="text-sm text-white font-medium">Asuransi komprehensif</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span class="text-sm text-white font-medium">Penanganan khusus/packaging</span>
                        </li>
                    </ul>
                </div>

                <!-- Ekspres -->
                <div class="bg-red-900 rounded-2xl shadow-xl p-8 relative hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500">
                    <div class="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">express</h3>
                    <p class="text-red-200 text-sm mb-6">Layanan prioritas untuk pengiriman mendesak, tiba esok hari.</p>
                    <div class="flex items-end gap-1 mb-6">
                        <span class="text-3xl font-extrabold text-white">Rp 45.000</span>
                        <span class="text-red-200 font-medium">/kg</span>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span class="text-sm text-white font-medium">Pengiriman Hari Berikutnya</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span class="text-sm text-white font-medium">Prioritas utama</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span class="text-sm text-white font-medium">Asuransi maksimum</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span class="text-sm text-white font-medium">Penanganan ahli</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Estimasi Waktu Pengiriman -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div class="flex flex-col lg:flex-row gap-12 items-center">
                <div class="w-full lg:w-1/2">
                    <div class="flex justify-between items-end mb-8">
                        <div>
                            <h2 class="text-2xl font-extrabold text-blue-950 mb-2">Estimasi Waktu Pengiriman</h2>
                            <p class="text-gray-500 text-sm">Estimasi waktu rata-rata pengiriman antar kota besar di Indonesia.</p>
                        </div>
                        <div class="bg-gray-100 p-1 rounded-lg flex text-sm">
                            

                        </div>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between text-sm font-bold text-blue-950 mb-2">
                                <span>Jakarta - Surabaya</span>
                                <span class="text-orange-500">18 Jam</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-900 h-2 rounded-full" style="width: 75%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm font-bold text-blue-950 mb-2">
                                <span>Jakarta - Bandung</span>
                                <span class="text-orange-500">4 Jam</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-900 h-2 rounded-full" style="width: 20%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm font-bold text-blue-950 mb-2">
                                <span>Semarang - Yogyakarta</span>
                                <span class="text-orange-500">3 Jam</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-900 h-2 rounded-full" style="width: 15%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm font-bold text-blue-950 mb-2">
                                <span>Surabaya - Denpasar</span>
                                <span class="text-orange-500">24 Jam</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-900 h-2 rounded-full" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-1/2">
                    <div class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative">
                        <img src="{{ asset('images/map.png') }}" alt="Route Map" class="w-full h-auto">
                        <div class="absolute bottom-6 left-6 text-white text-sm">
                            <p class="font-bold">Jaringan Distribusi Teroptimal</p>
                            <p class="opacity-80">Lebih dari 50 rute utama dengan ratusan jalur pendukung</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Keunggulan Tabel -->
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-extrabold text-blue-950 mb-4">Lihat Keunggulannya</h2>
                <p class="text-gray-500">Bandingkan perbedaan jenis layanan kami dan sesuaikan dengan kebutuhan Anda.</p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-blue-950 text-white">
                            <th class="py-4 px-6 font-bold text-sm">Kategori Layanan</th>
                            <th class="py-4 px-6 font-bold text-sm">Rata-Rata Tarif/Kg</th>
                            <th class="py-4 px-6 font-bold text-sm">Kecepatan Rata-Rata</th>
                            <th class="py-4 px-6 font-bold text-sm">Kelebihan Utama</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50">
                            <td class="py-4 px-6 text-blue-950 font-bold text-sm">Tarif Kota-Wilayah Sama (Khusus Jawa)</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">Rp 12.500</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">1-3 Hari</td>
                            <td class="py-4 px-6 text-green-600 font-bold text-sm">Lebih Cepat, Murah</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="py-4 px-6 text-blue-950 font-bold text-sm">Layanan Penanganan Kargo</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">Rp 30.000</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">Hari Ke-3 / Ke-5</td>
                            <td class="py-4 px-6 text-green-600 font-bold text-sm">Kapasitas Besar, Stabil</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="py-4 px-6 text-blue-950 font-bold text-sm">Via Udara (Asuransi)</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">Lebih dari Rp 50.000</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">10-15 Jam / Esok Hari</td>
                            <td class="py-4 px-6 text-green-600 font-bold text-sm">Sangat Cepat, Aman Terasuransi</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="py-4 px-6 text-blue-950 font-bold text-sm">Rute Pengiriman Jarak Jauh/Luar Jawa</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">Dihitung Khusus</td>
                            <td class="py-4 px-6 text-gray-600 text-sm">3-10 Hari Kerja</td>
                            <td class="py-4 px-6 text-green-600 font-bold text-sm">Fleksibel Tarif, Jangkauan Luas</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- FAQ -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-extrabold text-blue-950 text-center mb-10">Pertanyaan yang Sering Diajukan</h2>
            <div class="space-y-4">
                <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h4 class="font-bold text-blue-950 text-lg mb-2">Apakah pengiriman via darat menanggung asuransi layaknya via udara?</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        Pengiriman darat umumnya mendapatkan asuransi dasar. Jika barang sangat berharga atau rawan rusak, sangat disarankan untuk membeli asuransi penuh yang kami sediakan untuk menutupi kehilangan atau kerusakan sepenuhnya sesuai nilai barang.
                    </p>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h4 class="font-bold text-blue-950 text-lg mb-2 flex justify-between items-center cursor-pointer">
                        Bagaimana cara menghitung berat volumetrik?
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </h4>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h4 class="font-bold text-blue-950 text-lg mb-2 flex justify-between items-center cursor-pointer">
                        Apakah asuransi wajib untuk semua pengiriman?
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </h4>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <h4 class="font-bold text-blue-950 text-lg mb-2 flex justify-between items-center cursor-pointer">
                        Apa batasan berat maksimum untuk pengiriman express?
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</x-layout>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const btnHitung = document.getElementById('btn-hitung');
    const resultBox = document.getElementById('hasil-kalkulasi');
    const hargaHasil = document.getElementById('harga-hasil');
    const ruteHasil = document.getElementById('rute-hasil');
    const waktuHasil = document.getElementById('waktu-hasil');
    const jarakHasil = document.getElementById('jarak-hasil');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if (btnHitung) {
        btnHitung.addEventListener('click', async function() {
            // Tampilkan loading spinner
            btnText.innerText = 'Menghitung Rute Peta...';
            btnSpinner.classList.remove('hidden');
            btnHitung.disabled = true;

            // Get values
            const asal = document.getElementById('input-asal').value || 'Jakarta';
            const tujuan = document.getElementById('input-tujuan').value || 'Surabaya';
            const berat = parseFloat(document.getElementById('input-berat').value) || 1;
            const layanan = document.getElementById('input-layanan').value;

            try {
                // CSRF Token dari Laravel (bisa ditaruh di meta tag atau dikirim otomatis jika setup axios, disini kita fetch biasa)
                // Kita tambahkan di meta tag jika belum ada, atau ambil dari meta tag 'csrf-token'.
                const tokenElement = document.querySelector('meta[name="csrf-token"]');
                const csrfToken = tokenElement ? tokenElement.getAttribute('content') : '';

                // Memanggil Backend (Laravel Controller)
                const response = await fetch("{{ route('rates.calculate') }}", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken || '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        asal: asal,
                        tujuan: tujuan,
                        berat: berat,
                        layanan: layanan
                    })
                });

                const result = await response.json();

                if (result.success) {
                    // Format as Rupiah
                    const formattedTotal = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(result.data.total);

                    // Update UI
                    hargaHasil.innerText = formattedTotal;
                    ruteHasil.innerText = result.data.rute;
                    waktuHasil.innerText = result.data.estimasi;
                    jarakHasil.innerText = result.data.teks_jarak;
                    
                    // Beri tahu pengguna jika gagal mengambil data peta dan fallback
                    if (!result.data.is_map_success) {
                        jarakHasil.classList.replace('text-green-600', 'text-yellow-600');
                    } else {
                        jarakHasil.classList.replace('text-yellow-600', 'text-green-600');
                    }
                } else {
                    alert("Terjadi kesalahan saat menghitung. Coba lagi.");
                }

            } catch (error) {
                console.error("Fetch error:", error);
                alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
            } finally {
                // Matikan loading
                btnText.innerText = 'Hitung Biaya';
                btnSpinner.classList.add('hidden');
                btnHitung.disabled = false;

                // Show with animation
                resultBox.classList.remove('hidden');
                
                // Add a quick pulse animation to grab attention
                resultBox.classList.add('scale-105');
                setTimeout(() => {
                    resultBox.classList.remove('scale-105');
                }, 200);
            }
        });
    }
});
</script>
