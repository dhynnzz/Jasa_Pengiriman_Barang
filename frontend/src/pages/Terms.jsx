import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <Layout>
      <SEO title="Ketentuan Layanan" description="Syarat dan ketentuan layanan pengiriman logistik CV Nabila Trans." />
      {/* Header Section */}
      <div className="bg-blue-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,50 70,50 100,0 L100,100 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ketentuan Layanan</h1>
          <p className="text-xl text-blue-200">Syarat dan ketentuan yang berlaku dalam penggunaan layanan CV Nabila Trans.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-blue max-w-none">
          
          <p className="text-gray-500 mb-8">Pembaruan Terakhir: 15 Agustus 2023</p>

          <h2 className="text-2xl font-bold text-blue-950 mb-4">1. Penerimaan Syarat</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Dengan mengakses dan menggunakan layanan pengiriman yang disediakan oleh CV Nabila Trans, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
          </p>

          <h2 className="text-2xl font-bold text-blue-950 mb-4">2. Layanan Pengiriman</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Kami menyediakan berbagai layanan pengiriman B2B, logistik, dan distribusi. Kami berhak untuk menolak menerima kiriman apa pun berdasarkan pertimbangan kami sendiri, termasuk namun tidak terbatas pada barang-barang berbahaya, ilegal, atau yang melanggar kebijakan pengangkutan kami.
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li>Pengirim bertanggung jawab penuh atas keakuratan informasi penerima dan detail barang.</li>
            <li>Barang harus dikemas dengan aman dan memadai oleh pengirim. Kerusakan akibat pengepakan yang buruk bukan merupakan tanggung jawab CV Nabila Trans.</li>
            <li>Berat dan dimensi paket akan diverifikasi oleh sistem kami. Perbedaan data dapat mengakibatkan penyesuaian tarif akhir.</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-950 mb-4">3. Tanggung Jawab & Asuransi</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Tanggung jawab kami atas kehilangan atau kerusakan kiriman dibatasi sesuai dengan standar nilai klaim yang berlaku dalam industri logistik, kecuali jika pengirim memilih untuk mengasuransikan kirimannya dengan biaya tambahan yang disepakati bersama.
          </p>

          <h2 className="text-2xl font-bold text-blue-950 mb-4">4. Kebijakan Privasi</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Penggunaan informasi pribadi Anda oleh kami tunduk pada Kebijakan Privasi kami. Dengan menggunakan layanan kami, Anda menyetujui pengumpulan dan penggunaan informasi tersebut sesuai dengan regulasi perlindungan data yang berlaku di Indonesia.
          </p>

          <h2 className="text-2xl font-bold text-blue-950 mb-4">5. Perubahan Ketentuan</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            CV Nabila Trans berhak untuk merevisi syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Dengan terus menggunakan layanan kami setelah perubahan tersebut, Anda menyetujui untuk terikat oleh versi revisi dari Syarat dan Ketentuan ini.
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-950 mb-2">Punya Pertanyaan?</h3>
            <p className="text-gray-600">Jika Anda memiliki pertanyaan terkait ketentuan layanan kami, silakan hubungi tim dukungan kami melalui <a href="mailto:support@nabilatrans.com" className="text-orange-500 font-semibold hover:underline">support@nabilatrans.com</a> atau telepon ke kantor pusat kami.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
