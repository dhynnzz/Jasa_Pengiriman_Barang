import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Package, MapPin, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

export default function DriverGPS() {
  const [resi, setResi] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [lastGeocodedCoords, setLastGeocodedCoords] = useState(null);
  const [activeTab, setActiveTab] = useState('pengiriman');
  const [stats, setStats] = useState(null);

  const [shipmentData, setShipmentData] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('driver_token');
    if (!token) {
      navigate('/driver/login');
    } else {
      fetchStats(token);
    }
  }, [navigate]);

  const fetchStats = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/driver/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil statistik', error);
    }
  };

  const driverUser = JSON.parse(localStorage.getItem('driver_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('driver_token');
    localStorage.removeItem('driver_user');
    toast.success('Berhasil logout.');
    navigate('/driver/login');
  };

  // Haversine formula to calculate distance in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  
    const dLon = (lon2 - lon1) * Math.PI / 180; 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  };

  const startTracking = (e) => {
    e.preventDefault();
    if (!resi) {
      toast.error('Masukkan nomor resi terlebih dahulu.');
      return;
    }

    if (!navigator.geolocation) {
      toast.error('Browser Anda tidak mendukung GPS / Geolocation.');
      return;
    }

    setIsTracking(true);
    toast.success('Berbagi lokasi diaktifkan!');

    let currentLastGeocoded = null;

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        try {
          // Update live location (for map pin)
          const response = await axios.post(`${API_URL}/driver/update-location`, {
            tracking_number: resi,
            latitude: latitude,
            longitude: longitude
          });

          if (response.data && response.data.shipment) {
            setShipmentData(response.data.shipment);
          }
          
          // Auto History Logic
          let shouldGeocode = false;
          if (!currentLastGeocoded) {
            shouldGeocode = true;
          } else {
            const distance = calculateDistance(
              currentLastGeocoded.lat, currentLastGeocoded.lng,
              latitude, longitude
            );
            if (distance > 10) { // If moved more than 10 km
              shouldGeocode = true;
            }
          }

          if (shouldGeocode) {
            try {
              // Reverse geocode
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const data = await res.json();
              if (data && data.address) {
                const cityName = data.address.city || data.address.county || data.address.state_district || 'Area Tidak Diketahui';
                
                // Hit API to add auto history
                await axios.post(`${API_URL}/driver/auto-history`, {
                  tracking_number: resi,
                  location_name: cityName
                });

                currentLastGeocoded = { lat: latitude, lng: longitude };
                setLastGeocodedCoords(currentLastGeocoded);
              }
            } catch (geoError) {
              console.error("Geocoding failed", geoError);
            }
          }

        } catch (error) {
          console.error('Gagal mengirim lokasi', error);
          if (error.response && error.response.status === 404) {
            toast.error('Nomor resi tidak ditemukan di server.');
            stopTracking();
          }
        }
      },
      (error) => {
        console.error(error);
        toast.error('Gagal membaca GPS. Pastikan izin lokasi diaktifkan.');
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
    setCurrentLocation(null);
    setShipmentData(null);
    toast('Berbagi lokasi dihentikan.', { icon: '🛑' });
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-900/5 max-w-md w-full border border-gray-100 text-center relative"
      >
        {/* Header Profile */}
        <div className="flex justify-between items-center mb-6 bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50">
          <div className="flex flex-col text-left">
            <span className="text-xs text-gray-500">Masuk sebagai</span>
            <span className="text-sm font-bold text-gray-800">{driverUser.name || 'Kurir'}</span>
          </div>
          <button onClick={handleLogout} className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm" title="Keluar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('pengiriman')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'pengiriman' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pengiriman
          </button>
          <button 
            onClick={() => setActiveTab('performa')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'performa' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Performa Saya
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'pengiriman' ? (
            <motion.div 
              key="pengiriman"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Asisten Kurir Nabila</h2>
        <p className="text-gray-500 text-sm mb-8">Aktifkan GPS Anda saat mengantar barang agar pelanggan dapat melacak secara live.</p>

        {!isTracking ? (
          <form onSubmit={startTracking} className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">Nomor Resi Paket Saat Ini</label>
              <input
                type="text"
                value={resi}
                onChange={(e) => setResi(e.target.value)}
                placeholder="NBL-MB7XJR8N"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-bold text-center uppercase"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              Mulai Antar Barang
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-left">
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
              <p className="text-green-800 font-bold mb-1">GPS Aktif & Melacak 🛰️</p>
              <p className="text-xs text-green-600">Pelanggan bisa melihat Anda di peta.</p>
            </div>

            {shipmentData && (
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Detail Pengiriman</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Penerima</p>
                    <p className="font-semibold text-gray-900">{shipmentData.receiver_name || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Alamat Tujuan</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{shipmentData.destination_address || shipmentData.destination}</p>
                  </div>

                  <div className="flex justify-between pt-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Berat</p>
                      <p className="font-semibold text-gray-900">{shipmentData.weight ? `${shipmentData.weight} Kg` : '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Layanan</p>
                      <p className="font-semibold text-gray-900">{shipmentData.service_type || '-'}</p>
                    </div>
                  </div>

                  {/* WhatsApp Button Feature */}
                  {shipmentData.receiver_name && (
                    <a 
                      href={`https://wa.me/?text=Halo%20${shipmentData.receiver_name},%20Paket%20Anda%20dari%20Nabila%20Trans%20sedang%20dalam%20perjalanan%20menuju%20lokasi%20Anda.`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 w-full flex items-center justify-center text-sm font-medium text-green-600 bg-green-50 px-3 py-3 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                      Chat Penerima
                    </a>
                  )}
                </div>

                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shipmentData.destination_address || shipmentData.destination)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2 border border-indigo-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Buka Rute di Google Maps
                </a>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={stopTracking}
                className="w-1/3 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 font-semibold py-4 px-4 rounded-xl transition-colors flex flex-col items-center justify-center gap-1 text-xs"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                Berhenti
              </button>

              <button
                onClick={async () => {
                  if(window.confirm('Tandai pesanan ini Selesai (Delivered)?')) {
                    try {
                      await axios.post(`${API_URL}/driver/mark-delivered`, { tracking_number: resi });
                      toast.success('Pesanan berhasil diselesaikan!');
                      stopTracking();
                      setResi('');
                      fetchStats(localStorage.getItem('driver_token'));
                    } catch (error) {
                      toast.error('Gagal menyelesaikan pesanan.');
                    }
                  }
                }}
                className="w-2/3 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 font-bold py-4 px-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Paket Terkirim
              </button>
            </div>
          </div>
        )}
            </motion.div>
          ) : (
            <motion.div
              key="performa"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-left"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-6 shadow-lg shadow-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-blue-200" />
                  <span className="text-sm text-blue-100 font-medium">Estimasi Pendapatan Hari Ini</span>
                </div>
                <div className="text-3xl font-black mb-1">
                  Rp {(stats?.today_commission || 0).toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-blue-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Berdasarkan tarif komisi dasar
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats?.today_delivered || 0}</div>
                  <div className="text-xs text-gray-500 font-medium">Paket Selesai (Hari ini)</div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stats?.total_delivered || 0}</div>
                  <div className="text-xs text-gray-500 font-medium">Total Paket Diselesaikan</div>
                </div>
              </div>

              <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-orange-800 flex items-start gap-3">
                <DollarSign className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  <strong>Info:</strong> Komisi Anda dihitung berdasarkan tarif dasar Rp 5.000 untuk setiap pengiriman yang ditandai <b>Selesai</b>. Penarikan dana dapat dilakukan melalui kantor cabang Nabila Trans.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
