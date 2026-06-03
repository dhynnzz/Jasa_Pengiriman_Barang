import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import axios from 'axios';

export default function Branches() {
  const [search, setSearch] = useState('');
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await axios.get(`${API_URL}/branches`);
        setBranches(response.data);
      } catch (error) {
        console.error('Failed to fetch branches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const filteredBranches = branches.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.address.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">Temukan Lokasi Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kami memiliki berbagai kantor cabang dan agen yang tersebar untuk memudahkan Anda mengirimkan paket.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* List Section */}
          <div className="w-full lg:w-1/3 flex flex-col h-[600px]">
            <div className="relative mb-6">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kota, jalan, atau nama agen..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {loading ? (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500">Memuat data cabang...</p>
                </div>
              ) : filteredBranches.map(branch => (
                <div key={branch.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{branch.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      branch.type === 'Kantor Pusat' ? 'bg-purple-100 text-purple-700' :
                      branch.type === 'Cabang Utama' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {branch.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mt-4 text-sm text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full flex items-center justify-center py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                    <Navigation className="w-4 h-4 mr-2" /> Arahkan ke Lokasi
                  </button>
                </div>
              ))}
              
              {filteredBranches.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500">Cabang atau kota tidak ditemukan.</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Section Dummy */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner border border-gray-300">
            {/* Background Map Pattern (Dummy) */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <MapPin className="w-16 h-16 text-blue-600 mb-4 opacity-50" />
              <p className="text-gray-600 font-medium text-lg bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm">Peta Interaktif (Dalam Pengembangan)</p>
            </div>
            
            {/* Dummy Pin */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 cursor-pointer transition-transform hover:scale-110">
              <MapPin className="w-10 h-10" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-900 whitespace-nowrap">
                Kantor Pusat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
