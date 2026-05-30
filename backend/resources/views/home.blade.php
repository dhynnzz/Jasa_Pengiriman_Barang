<x-layout>
    <!-- Hero Section -->
    <div class="bg-gray-50 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                <div class="w-full lg:w-1/2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold tracking-wide mb-6">
                        <span class="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                        Next-Gen Logistics
                    </span>
                    <h1 class="text-4xl lg:text-5xl font-extrabold text-blue-950 leading-tight mb-6">
                        Layanan Pengiriman Cepat, Aman, dan Terpercaya di Seluruh Indonesia
                    </h1>
                    <p class="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                        Permudah logistik Anda dengan solusi pengiriman berbasis teknologi kami. Kami menghadirkan konsistensi layanan yang setara dengan tenaga profesional terbaik.
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="{{ url('/tracking') }}" class="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2">
                            Lacak Paket
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a href="{{ url('/rates') }}" class="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
                            Kirim Paket
                        </a>
                    </div>
                </div>
                <div class="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 relative">
                    <img src="{{ asset('images/truck.png') }}" alt="Logistic Truck" class="w-full h-auto object-cover rounded-xl" />
                </div>
            </div>
            
            <!-- Quick Track -->
            <div class="mt-16 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-2 flex items-center">
                <form action="{{ route('tracking.search') }}" method="POST" class="w-full flex">
                    @csrf
                    <div class="flex-grow flex items-center px-4">
                        <svg class="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <input type="text" name="tracking_number" placeholder="Enter Tracking Number (e.g. NBL-123456789)" class="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 py-3" required />
                    </div>
                    <button type="submit" class="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap">
                        Lacak Sekarang
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Stats -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                <h3 class="text-3xl font-extrabold text-blue-900 mb-2">10k+</h3>
                <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Pengantaran</p>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                <h3 class="text-3xl font-extrabold text-orange-400 mb-2">500+</h3>
                <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Kota Cakupan Layanan</p>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                <h3 class="text-3xl font-extrabold text-blue-900 mb-2">99%</h3>
                <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Persentase Keberhasilan<br>Pengiriman</p>
            </div>
            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center">
                <h3 class="text-3xl font-extrabold text-orange-400 mb-2">24/7</h3>
                <p class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Support Team</p>
            </div>
        </div>
    </div>

    <!-- Features -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="max-w-2xl mb-12">
            <h2 class="text-3xl lg:text-4xl font-extrabold text-blue-950 leading-tight mb-4">
                Dirancang untuk bekerja cerdas, bukan hanya bergerak cepat
            </h2>
            <p class="text-gray-600 text-lg leading-relaxed">
                Solusi logistik komprehensif kami dirancang untuk mengoptimalkan setiap proses pengiriman, mengevaluasi distribusi barang, serta memastikan pengiriman yang lebih cepat dan konsisten.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
                    <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-blue-950 mb-3">Express Delivery</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">
                    Layanan pengiriman super cepat untuk kebutuhan mendesak. Kami mengutamakan kecepatan tanpa mengorbankan keamanan pengiriman.
                </p>
                <a href="#" class="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
                    Learn more 
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            <!-- Card 2 -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-blue-950 mb-3">Layanan Kargo Berat</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">
                    Penanganan khusus untuk pengiriman barang berukuran besar dan berat dengan solusi rute yang disesuaikan.
                </p>
                <a href="#" class="text-blue-900 font-semibold text-sm flex items-center gap-1 hover:text-blue-800">
                    Learn more 
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            <!-- Card 3 -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
                    <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-blue-950 mb-3">Same Day</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">
                    Pengiriman dalam kota dengan jaminan tiba hanya dalam hitungan jam. Sangat cocok untuk bisnis lokal dan pengiriman dokumen penting.
                </p>
                <a href="#" class="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
                    Learn more 
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </div>

    <!-- Delight Customers -->
    <div class="bg-gray-900 py-24 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row gap-16">
                <div class="w-full lg:w-1/2">
                    <h2 class="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">Delight your customers</h2>
                    <p class="text-gray-400 text-lg mb-12 leading-relaxed">
                        Fokus kami pada penanganan masalah sejak dini memastikan setiap kendala dapat diselesaikan sebelum berkembang lebih besar, sehingga pelanggan Anda tetap mendapatkan informasi tanpa Anda harus repot menangani semuanya sendiri.
                    </p>
                    
                    <ul class="space-y-8">
                        <li class="flex gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Real-time tracking</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">Melacak status pengiriman secara real-time dengan pembaruan langsung dan data lokasi yang akurat.</p>
                            </div>
                        </li>
                        <li class="flex gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Keamanan Penanganan Barang</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">Layanan dukungan premium dan pengaturan khusus yang disesuaikan dengan standar keamanan Anda.</p>
                            </div>
                        </li>
                        <li class="flex gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Tarif Pengiriman Kompetitif</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">Mengidentifikasi peluang konsolidasi pengiriman untuk memastikan kapasitas yang lebih stabil dengan biaya yang lebih efektif.</p>
                            </div>
                        </li>
                        <li class="flex gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <div class="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Expert team</h4>
                                <p class="text-gray-400 text-sm leading-relaxed">Tim operasional kami siap melayani 24/7 untuk mendukung setiap pengiriman, awalnya: tim logistik profesional yang bekerja khusus untuk bisnis Anda.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div class="w-full lg:w-1/2 flex items-center">
                    <div class="bg-blue-950 border border-blue-900/50 rounded-2xl p-10 w-full relative">
                        <div class="absolute -top-4 -left-4 w-8 h-8 text-blue-500 opacity-50">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        </div>
                        <p class="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                            "CV Nabila Trans memberikan solusi logistik lengkap dalam satu layanan terpadu. Mereka selalu memastikan pelanggan kami mendapatkan informasi terbaru, dan kami berhasil mengurangi hingga 83% tiket keluhan terkait pengiriman."
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Asep Ganteng" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <h5 class="font-bold text-white text-sm">Asep Ganteng</h5>
                                <p class="text-blue-400 text-xs">Direktur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-900 py-24 text-center text-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">Anda fokus mengembangkan bisnis.<br>Biarkan kami menangani logistiknya.</h2>
            <p class="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
                Serahkan proses penawaran harga, pelacakan, dan koordinasi pengiriman kepada kami—tanpa kerumitan dalam pengelolaannya. Siap mengirim paket Anda.
            </p>
            <a href="{{ url('/rates') }}" class="inline-block bg-orange-500 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
                Ajukan Penawaran Sekarang
            </a>
        </div>
    </div>
</x-layout>
