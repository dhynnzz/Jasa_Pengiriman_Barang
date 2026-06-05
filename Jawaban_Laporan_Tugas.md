# Laporan Implementasi Web Jasa Pengiriman Barang (Nabila Trans)

### 1. Alamat URL yang Telah Dihosting
Website Nabila Trans telah berhasil di-deploy dan dapat diakses publik melalui tautan berikut:
*(Silakan ganti bagian ini dengan URL Vercel asli milik Anda, contoh: `https://nabila-trans.vercel.app`)*

---

### 2. Penjelasan Site Map yang Ada Pada Web
Sitemap (Peta Situs) pada website Jasa Pengiriman Barang (Nabila Trans) dirancang untuk memisahkan antara bagian *Front-End* (untuk publik/pelanggan), *Driver Panel* (untuk kurir), dan *Admin Panel* (untuk pengelola). Berikut adalah struktur halamannya:

**A. Halaman Publik:**
- **Beranda (`/`)**: Menampilkan *hero section*, layanan utama, dan keunggulan perusahaan.
- **Lacak (`/tracking`)**: Halaman khusus untuk memasukkan nomor resi dan melihat riwayat lokasi paket.
- **Biaya Pengiriman (`/rates`)**: Halaman kalkulator tarif dinamis antar kota.
- **Kemitraan (`/partnership`)**: Formulir untuk pendaftaran menjadi mitra/agen pengiriman.
- **Tentang Kami (`/about`)**: Profil perusahaan Nabila Trans.

**B. Halaman Kurir (Driver):**
- **Login & Register Kurir (`/driver/login` & `/driver/register`)**: Gerbang autentikasi.
- **Asisten Kurir (`/driver`)**: Dasbor dengan sistem tab untuk memantau paket yang sedang diantar, kontrol GPS *real-time*, dan tab "Performa Saya" untuk memantau komisi/pendapatan.

**C. Halaman Admin:**
- **Admin Panel (`/admin/*`)**: Dasbor manajemen pusat untuk mengelola Data Pengguna, Resi (*Shipments*), Tarif, Cabang, Laporan, dan mencetak Label Pengiriman (*Waybill*).

---

### 3. Fungsi dan Menu pada Website
Website ini difungsikan sebagai *Sistem Manajemen Logistik dan Pengiriman Barang* terpadu.

- **Menu Navigasi Utama**: Beranda, Lacak, Biaya Pengiriman, Kemitraan, Tentang Kami.
- **Fungsi Utama (Fitur Unggulan)**:
  - **Live Tracking Interaktif**: Memungkinkan pengguna melacak paket dan melihat titik pergerakannya secara visual di atas Peta Interaktif.
  - **Kalkulator Ongkos Kirim Dinamis (Geocoding)**: Tidak sekadar mematok harga flat, sistem ini mampu menghitung **jarak asli (KM)** jalan darat antar kota asal dan tujuan secara akurat. Sistem kemudian mengalkulasikan tarif dan menentukan estimasi waktu ketibaan paket berdasarkan jarak yang sebenarnya.
  - **Portal Asisten Kurir (Driver GPS)**: Kurir dapat membagikan posisi lokasinya (GPS Tracking), menekan tombol *"Selesaikan Pengiriman"*, dan dapat mengirim pesan langsung lewat *WhatsApp* kepada penerima paket hanya dengan satu kali klik.
  - **Cetak Label Barcode & Waybill**: Kemampuan pada sisi admin untuk mencetak label paket pengiriman berformat PDF. Struk ini dilengkapi *Barcode* nomor resi yang dapat di-*scan* dengan alat pemindai (scanner).

---

### 4. Konten yang Ada Pada Website
Konten yang tersedia dan dimuat pada website ini meliputi:
- **Informasi Layanan**: Penjabaran kategori layanan (Ekonomi, Standar, Express) beserta tarif, estimasi durasi, dan keunggulannya.
- **Informasi Jaringan**: Data cabang operasional Nabila Trans.
- **FAQ (Pertanyaan Umum)**: Edukasi untuk pelanggan terkait perhitungan berat volumetrik, kewajiban asuransi, dan batas pengiriman.
- **Formulir Interaktif**: Form cek tarif, kotak pelacakan resi, form pemesanan kurir jemput paket, hingga registrasi agen yang terkoneksi langsung ke *Database*.
- **Status Logistik**: Teks deskriptif riwayat perjalanan resi (misalnya: *"Paket telah diterima di fasilitas penyortiran Jakarta"*).

---

### 5. Penggunaan Add-on maupun Plugin Beserta Implementasinya
Pengembangan website ini menggunakan _tech stack_ modern MERN/PERN (*React.js* di Frontend dan *Laravel PHP* di Backend) yang ditunjang dengan integrasi beberapa *Add-on* tambahan:

- **Leaflet & React-Leaflet**: Diimplementasikan untuk merender Peta (*Maps*) interaktif pada halaman "Lacak", sehingga koordinat Longitude/Latitude paket dapat digambarkan di atas peta digital.
- **Framer Motion**: Add-on untuk mengimplementasikan animasi UI (*User Interface*) modern (seperti *fade-in*, *slide-up*, dan transisi tab mulus) pada halaman utama dan portal kurir.
- **React-Barcode**: Plugin khusus yang diinstal pada panel Admin untuk me-*render* otomatis *Barcode Type 128*. Ini membuat label pengiriman dapat dicetak dan kompatibel dengan alat *Barcode Scanner* di dunia nyata.
- **Nominatim API (OpenStreetMap)**: Add-on Eksternal yang dipanggil langsung oleh Backend Laravel. Ini diimplementasikan khusus pada fitur **Kalkulator Tarif** untuk fungsi _Geocoding_ (yakni membaca input teks seperti kata "Jakarta", mengubahnya menjadi titik koordinat lintang-bujur di atas bumi, lalu menghitung jarak KM aslinya menggunakan rumus matematika *Haversine*).
- **Axios**: Plugin di sisi *Frontend* untuk mengambil dan mengirim data *REST API* berformat JSON ke Backend Laravel secara efisien (tanpa _reload_ halaman).
- **React-Hot-Toast**: Implementasi *toast notification* elegan yang akan memunculkan popup interaktif jika suatu aksi berhasil atau gagal dilakukan (seperti aksi "Paket Berhasil Dikirim").

---

### 6. Implementasi SEO (Search Engine Optimization)
**Ya, website ini telah memikirkan dan mengimplementasikan SEO** (optimasi mesin pencari Google). Strategi optimasi yang diterapkan yaitu:

1. **Dynamic Meta Tags (`React-Helmet-Async`)**:
   Kami menginisiasi komponen `<SEO />` khusus pembungkus (_wrapper_). Pada setiap halamannya (Lacak, Biaya, Beranda), judul tab *browser* (`<title>`) dan `<meta name="description">` berubah secara dinamis untuk memudahkan Google membaca konteks spesifik masing-masing halaman.
2. **Semantic HTML**:
   Penulisan kerangka web sangat rapi. Setiap halaman menjamin hanya memiliki satu buah `<h1>` spesifik (sebagai Topik Utama) dan dibantu `<h2>` hingga `<h4>` untuk hierarki konten pendukung.
3. **Penyediaan Sitemap XML Statis**:
   Di dalam direktori `public/sitemap.xml`, telah disediakan file *sitemap* berisi daftar URL inti. Robot Google (*Googlebot*) dapat mengandalkan file ini guna merayapi _crawling_ rute situs dengan komprehensif, mengingat web *Single Page Application* (SPA) React butuh bantuan *sitemap* agar terindeks lebih cepat.
4. **Performa UX (Kecepatan dan Seluler)**:
   Google sangat mempertimbangkan *Core Web Vitals*. Website ini dirancang responsif, menggunakan teknologi pemuatan data _Asynchronous_ yang membuat pergantian halaman menjadi super instan (tidak _loading_ hitam putih), serta struktur antarmuka _Mobile-First_ (sangat bersahabat untuk layar HP). Ini akan mendongkrak peringkat secara organik.
