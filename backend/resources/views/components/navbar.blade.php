<header class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="{{ url('/') }}" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-xl shadow-sm">
                        N
                    </div>
                    <span class="font-bold text-xl text-blue-950">CV Nabila Trans</span>
                </a>
            </div>

            <!-- Desktop Menu -->
            <nav class="hidden md:flex space-x-8">
                <a href="{{ url('/') }}" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Beranda</a>
                <a href="{{ url('/services') }}" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Layanan</a>
                <a href="{{ url('/tracking') }}" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Lacak</a>
                <a href="{{ url('/rates') }}" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Biaya Pengirim    </a>
                <a href="{{ url('/about') }}" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Tentang</a>
                <a href="#" class="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Kontak</a>
            </nav>

            <!-- CTA Button -->
            <div class="hidden md:flex items-center">
                <a href="{{ url('/rates') }}" class="bg-blue-900 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-800 transition-colors shadow-md">
                    Memulai
                </a>
            </div>

            <!-- Mobile menu button -->
            <div class="flex md:hidden items-center">
                <button type="button" class="text-gray-500 hover:text-gray-900 focus:outline-none p-2">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</header>
