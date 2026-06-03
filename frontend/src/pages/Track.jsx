import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Clock, Truck, Package } from 'lucide-react';

export default function Track() {
  const [resi, setResi] = useState('NT12345678');
  const [isSearched, setIsSearched] = useState(true);

  const trackingData = {
    status: 'In Transit',
    origin: 'Malang',
    destination: 'Jakarta',
    service: 'Express',
    progress: 60,
    history: [
      { id: 1, date: '15 Jun 2026', time: '14:30', status: 'In Transit', location: 'Gudang Transit Semarang', desc: 'Paket tiba di gudang sortir Semarang' },
      { id: 2, date: '14 Jun 2026', time: '20:15', status: 'In Transit', location: 'Hub Surabaya', desc: 'Paket diberangkatkan menuju Semarang' },
      { id: 3, date: '14 Jun 2026', time: '10:00', status: 'Picked Up', location: 'Agen Malang', desc: 'Paket telah diterima oleh agen' },
    ]
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-blue-950 mb-4">Lacak Pengiriman Anda</h1>
          <p className="text-gray-600">Pantau pergerakan paket Anda secara real-time</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-900/5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                placeholder="Masukkan Nomor Resi (Cth: NT...)" 
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 text-lg transition-colors bg-gray-50 focus:bg-white"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
            <button 
              onClick={() => setIsSearched(true)}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-lg"
            >
              Lacak Sekarang
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {isSearched && (
          <div className="bg-white rounded-2xl shadow-lg shadow-blue-900/5 overflow-hidden">
            {/* Header Result */}
            <div className="bg-blue-950 p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-blue-200 text-sm mb-1">Nomor Resi</p>
                <h2 className="text-3xl font-bold font-mono tracking-wider">{resi}</h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Layanan</p>
                  <p className="font-semibold text-lg">{trackingData.service}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-orange-500 rounded-full text-sm font-bold">
                    {trackingData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Route & Progress */}
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div className="text-center w-1/3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900">{trackingData.origin}</h3>
                  <p className="text-sm text-gray-500">Pengirim</p>
                </div>
                <div className="w-1/3 flex items-center justify-center relative">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${trackingData.progress}%` }}></div>
                  </div>
                  <Truck className="w-6 h-6 text-blue-600 absolute bg-white px-1" style={{ left: `calc(${trackingData.progress}% - 12px)` }} />
                </div>
                <div className="text-center w-1/3">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900">{trackingData.destination}</h3>
                  <p className="text-sm text-gray-500">Penerima</p>
                </div>
              </div>
            </div>

            {/* History Timeline */}
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Riwayat Perjalanan</h3>
              <div className="space-y-6">
                {trackingData.history.map((hist, index) => (
                  <div key={hist.id} className="flex relative">
                    {index !== trackingData.history.length - 1 && (
                      <div className="absolute top-8 left-[19px] bottom-[-24px] w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        index === 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {index === 0 ? <Truck className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                      </div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                        <h4 className={`font-bold text-lg ${index === 0 ? 'text-blue-600' : 'text-gray-800'}`}>
                          {hist.status} - {hist.location}
                        </h4>
                        <div className="text-sm text-gray-500 flex items-center mt-1 sm:mt-0">
                          <Clock className="w-4 h-4 mr-1" /> {hist.date}, {hist.time}
                        </div>
                      </div>
                      <p className="text-gray-600">{hist.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
