import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Navigation, ShieldCheck, Activity, Users, Globe, Layers } from 'lucide-react';

// --- Dummy Data ---
const locations = [
    { id: 1, city: 'Gempol, Pasuruan', region: 'Jawa & Bali', type: 'pusat', lat: -7.5925, lng: 112.6953, address: 'Kawasan Industri Gempol, Pasuruan, Jawa Timur', status: 'Active 24/7', mapsUrl: 'https://maps.app.goo.gl/sbG6o7GHrpga9kHF8' },
    { id: 2, city: 'Surabaya', region: 'Jawa & Bali', type: 'regional', lat: -7.2504, lng: 112.7688, address: 'Jl. Tunjungan No. 45, Surabaya', status: 'Active' },
    { id: 3, city: 'Bandung', region: 'Jawa & Bali', type: 'cabang', lat: -6.9175, lng: 107.6191, address: 'Jl. Asia Afrika No. 12, Bandung', status: 'Active' },
    { id: 4, city: 'Medan', region: 'Sumatra', type: 'regional', lat: 3.5952, lng: 98.6722, address: 'Jl. Putri Hijau No. 10, Medan', status: 'Active' },
    { id: 5, city: 'Makassar', region: 'Sulawesi', type: 'regional', lat: -5.1477, lng: 119.4327, address: 'Jl. Boulevard Panakkukang, Makassar', status: 'Active' },
    { id: 6, city: 'Balikpapan', region: 'Kalimantan', type: 'cabang', lat: -1.2379, lng: 116.8529, address: 'Jl. Sudirman No. 88, Balikpapan', status: 'Active' },
    { id: 7, city: 'Jayapura', region: 'Papua', type: 'mitra', lat: -2.5337, lng: 140.7181, address: 'Jl. Raya Abepura, Jayapura', status: 'Limited Hours' },
];

const legendColors = {
    pusat: { label: 'Kantor Pusat', color: 'bg-orange-500' },
    regional: { label: 'Regional', color: 'bg-blue-500' },
    cabang: { label: 'Cabang', color: 'bg-cyan-500' },
    mitra: { label: 'Mitra', color: 'bg-purple-500' },
};

// --- Custom Icon Creator ---
const createCustomIcon = (type) => {
    return L.divIcon({
        className: 'custom-glow-marker',
        html: `<div class="marker-pulse type-${type}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
};

// Component to dynamically change map view
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom, { duration: 1.5 });
    return null;
};

export default function CoverageMapApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [mapCenter, setMapCenter] = useState([-2.5489, 118.0149]); // Center of Indonesia
    const [mapZoom, setMapZoom] = useState(5);

    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || loc.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    const handleCityClick = (loc) => {
        setMapCenter([loc.lat, loc.lng]);
        setMapZoom(12);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-950 text-slate-200 overflow-hidden font-sans relative">
            
            {/* Main Area: Map & Sidebar Container */}
            <div className="flex flex-1 relative z-0">
                
                {/* Sidebar - Glassmorphism */}
                <div className="absolute top-6 left-6 z-[1000] w-80 max-h-[calc(100vh-160px)] flex flex-col gap-4">
                    {/* Header Panel */}
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <Globe size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide">Peta Distribusi</h2>
                        </div>
                        
                        <div className="relative mb-5">
                            <input 
                                type="text" 
                                placeholder="Cari kota / cabang..." 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['All', 'Jawa & Bali', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Papua'].map(region => (
                                <button 
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                                        selectedRegion === region 
                                        ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Results / Location List */}
                    <div className="flex-1 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col hidden md:flex">
                        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-slate-300">Lokasi ({filteredLocations.length})</h3>
                            <button className="text-xs text-blue-400 hover:text-blue-300" onClick={() => {
                                setMapCenter([-2.5489, 118.0149]);
                                setMapZoom(5);
                            }}>Reset Map</button>
                        </div>
                        <div className="overflow-y-auto p-2 max-h-48 custom-scrollbar">
                            {filteredLocations.map(loc => (
                                <div 
                                    key={loc.id} 
                                    className="p-3 mb-1 hover:bg-slate-800/60 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-700"
                                    onClick={() => handleCityClick(loc)}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-white">{loc.city}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 border ${
                                            loc.type === 'pusat' ? 'border-orange-500/50 text-orange-400' :
                                            loc.type === 'regional' ? 'border-blue-500/50 text-blue-400' :
                                            loc.type === 'cabang' ? 'border-cyan-500/50 text-cyan-400' :
                                            'border-purple-500/50 text-purple-400'
                                        }`}>
                                            {loc.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">{loc.address}</p>
                                </div>
                            ))}
                            {filteredLocations.length === 0 && (
                                <div className="text-center p-4 text-slate-500 text-sm">Lokasi tidak ditemukan.</div>
                            )}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-2xl">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Layers size={14} /> Legenda
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(legendColors).map(([key, info]) => (
                                <div key={key} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${info.color} shadow-[0_0_8px_currentColor] opacity-80`}></div>
                                    <span className="text-xs text-slate-300">{info.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leaflet Map Area */}
                <div className="w-full h-full bg-slate-950">
                    <MapContainer 
                        center={mapCenter} 
                        zoom={mapZoom} 
                        zoomControl={false}
                        className="w-full h-full"
                    >
                        {/* Using Standard OpenStreetMap tile layer */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        
                        <ChangeView center={mapCenter} zoom={mapZoom} />

                        {filteredLocations.map(loc => (
                            <Marker 
                                key={loc.id} 
                                position={[loc.lat, loc.lng]} 
                                icon={createCustomIcon(loc.type)}
                            >
                                <Popup closeButton={false}>
                                    <div className="p-4 w-full">
                                        <div className="w-full h-24 bg-slate-800 rounded-lg mb-3 overflow-hidden relative">
                                            {/* Using Unsplash source for generic city/office placeholder */}
                                            <img src={`https://source.unsplash.com/400x200/?city,${loc.city},building`} alt={loc.city} className="w-full h-full object-cover opacity-60 mix-blend-overlay" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80'}} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                                <h4 className="text-lg font-bold text-white leading-tight">{loc.city}</h4>
                                                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded uppercase font-bold">{loc.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 mb-2">
                                            <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                            <p className="text-xs text-slate-300 leading-relaxed">{loc.address}</p>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <a href={loc.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-500 !text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
                                                <Navigation size={14} className="!text-white" /> Navigasi ke Lokasi
                                            </a>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

            </div>

            {/* Bottom Stats Bar */}
            <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 relative z-[1000] flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-8 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Activity size={20} className="text-orange-500" />
                        </div>
                        <div>
                            <div className="text-xl font-extrabold text-white">500+</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Titik Layanan</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-700"></div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <MapPin size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <div className="text-xl font-extrabold text-white">34</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Provinsi</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-700 hidden md:block"></div>
                    <div className="flex items-center gap-3 hidden md:flex">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <Users size={20} className="text-cyan-500" />
                        </div>
                        <div>
                            <div className="text-xl font-extrabold text-white">100+</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Kota Besar</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-700 hidden md:block"></div>
                    <div className="flex items-center gap-3 hidden lg:flex">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <ShieldCheck size={20} className="text-green-500" />
                        </div>
                        <div>
                            <div className="text-xl font-extrabold text-white">98%</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Jalur Keselamatan</div>
                        </div>
                    </div>
                </div>
                
                <div className="text-xs text-slate-500 flex items-center gap-2 hidden md:flex">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Sistem Aktif & Terhubung
                </div>
            </div>
            
        </div>
    );
}
