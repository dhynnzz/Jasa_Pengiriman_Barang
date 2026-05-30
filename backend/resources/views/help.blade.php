<x-layout>
    <!-- Header Section -->
    <div class="bg-blue-950 pt-32 pb-20 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 C30,50 70,50 100,0 L100,100 Z" fill="currentColor"/>
            </svg>
        </div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6">Pusat Bantuan</h1>
            <p class="text-xl text-blue-200 mb-8">Temukan jawaban atas pertanyaan Anda atau hubungi tim dukungan kami.</p>
            
            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
                <svg class="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Ketik topik bantuan (misal: asuransi, resi, barang hilang)..." class="w-full bg-transparent border-none focus:ring-0 text-gray-700 ml-3 py-2" />
                <button class="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors">
                    Cari
                </button>
            </div>
        </div>
    </div>

    <!-- FAQ & Contact Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- FAQ Section -->
            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-blue-950 mb-8">Pertanyaan yang Sering Diajukan (FAQ)</h2>
                
                <div class="space-y-4">
                    <!-- FAQ Item 1 -->
                    <details class="group bg-white rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                            <h2 class="font-bold text-lg text-blue-950">Bagaimana cara melacak paket saya?</h2>
                            <span class="relative h-5 w-5 shrink-0">
                                <svg class="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <svg class="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                </svg>
                            </span>
                        </summary>
                        <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                            Anda dapat melacak paket dengan memasukkan Nomor Resi (misal: NBL-8829441029) di halaman Tracking kami. Sistem akan menampilkan status real-time, lokasi saat ini, serta estimasi waktu kedatangan.
                        </div>
                    </details>

                    <!-- FAQ Item 2 -->
                    <details class="group bg-white rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                            <h2 class="font-bold text-lg text-blue-950">Apa saja barang yang dilarang untuk dikirim?</h2>
                            <span class="relative h-5 w-5 shrink-0">
                                <svg class="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <svg class="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                </svg>
                            </span>
                        </summary>
                        <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                            Kami tidak menerima pengiriman barang berbahaya, senjata tajam/api, obat-obatan terlarang, bahan mudah meledak/terbakar, hewan hidup, dan barang ilegal lainnya sesuai dengan hukum yang berlaku di Indonesia.
                        </div>
                    </details>

                    <!-- FAQ Item 3 -->
                    <details class="group bg-white rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                            <h2 class="font-bold text-lg text-blue-950">Bagaimana jika paket saya mengalami kerusakan?</h2>
                            <span class="relative h-5 w-5 shrink-0">
                                <svg class="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <svg class="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                </svg>
                            </span>
                        </summary>
                        <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                            Jika paket Anda tiba dalam kondisi rusak, Anda dapat mengajukan klaim asuransi (jika Anda menggunakan layanan asuransi kami) maksimal 2x24 jam sejak paket diterima. Hubungi layanan pelanggan kami dan sertakan foto bukti kerusakan serta nomor resi.
                        </div>
                    </details>
                    
                    <!-- FAQ Item 4 -->
                    <details class="group bg-white rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
                        <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                            <h2 class="font-bold text-lg text-blue-950">Apakah saya bisa mengubah alamat tujuan saat paket sudah dikirim?</h2>
                            <span class="relative h-5 w-5 shrink-0">
                                <svg class="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <svg class="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                </svg>
                            </span>
                        </summary>
                        <div class="px-6 pb-6 text-gray-600 leading-relaxed">
                            Perubahan alamat tujuan hanya bisa dilakukan sebelum paket masuk ke pusat penyortiran regional (Hub). Hubungi Customer Service kami segera jika Anda perlu merevisi alamat penerima, mungkin akan dikenakan biaya tambahan rute.
                        </div>
                    </details>
                </div>
            </div>

            <!-- Contact Options -->
            <div class="space-y-6">
                <h2 class="text-2xl font-bold text-blue-950 mb-8">Hubungi Kami Langsung</h2>
                
                <a href="https://wa.me/6282340074645" target="_blank" class="block bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow group">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">WhatsApp CS</h3>
                            <p class="text-green-600 text-sm font-semibold">Respon Cepat (Online)</p>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm">Tim kami siap membantu Anda melalui chat WhatsApp kapan saja.</p>
                </a>

                <a href="tel:+6282340074645" class="block bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow group">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Panggilan Suara</h3>
                            <p class="text-blue-600 text-sm font-semibold">+62 823-4007-4645</p>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm">Bicarakan masalah Anda langsung dengan agen dukungan kami.</p>
                </a>
                
                <a href="mailto:support@nabilatrans.com" class="block bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-shadow group">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Email Dukungan</h3>
                            <p class="text-orange-500 text-sm font-semibold">support@nabilatrans.com</p>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm">Kirim keluhan atau klaim asuransi beserta file lampiran Anda.</p>
                </a>
            </div>
        </div>
    </div>
</x-layout>
