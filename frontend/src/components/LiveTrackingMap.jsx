import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper to calculate intermediate points
const interpolate = (p1, p2, fraction) => {
    return [
        p1[0] + (p2[0] - p1[0]) * fraction,
        p1[1] + (p2[1] - p1[1]) * fraction
    ];
};

// Route coordinates (Dummy route from Jakarta to Surabaya)
const routeCoordinates = [
    [-6.2088, 106.8456], // Jakarta
    [-6.3, 107.3],
    [-6.5, 108.0],
    [-6.7, 108.5],
    [-6.8, 109.5],
    [-6.9, 110.4],       // Semarang
    [-7.2504, 112.7688]  // Surabaya
];

// Custom Icons
const originIcon = L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="w-8 h-8 bg-blue-950 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <div class="w-3 h-3 bg-white rounded-full"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const destIcon = L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <div class="w-3 h-3 bg-white rounded-full"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const truckIcon = L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center relative">
             <div class="absolute -inset-2 bg-green-500/30 rounded-full animate-ping"></div>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
             </svg>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});



const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true });
    }, [center, zoom, map]);
    return null;
};

const LiveTrackingMap = ({ currentLat, currentLng, driverName, origin, destination }) => {
    const [originCoords, setOriginCoords] = useState(null);
    const [destCoords, setDestCoords] = useState(null);

    // Geocode origin and destination
    useEffect(() => {
        const fetchCoordinates = async (place, setter) => {
            if (!place) return;
            try {
                // simple fetch from Nominatim
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place + ', Indonesia')}`);
                const data = await res.json();
                if (data && data.length > 0) {
                    setter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                }
            } catch (error) {
                console.error("Geocoding error for", place, error);
            }
        };

        fetchCoordinates(origin, setOriginCoords);
        fetchCoordinates(destination, setDestCoords);
    }, [origin, destination]);

    const hasRealLocation = currentLat && currentLng;
    const truckPosition = hasRealLocation ? [parseFloat(currentLat), parseFloat(currentLng)] : null;
    
    // Default fallback to center of Java if nothing is found
    const fallbackCenter = [-7.1509, 110.1402];
    
    let mapCenter = fallbackCenter;
    let mapZoom = 6;

    if (truckPosition) {
        mapCenter = truckPosition;
        mapZoom = 12;
    } else if (originCoords && destCoords) {
        // center between origin and dest
        mapCenter = [
            (originCoords[0] + destCoords[0]) / 2,
            (originCoords[1] + destCoords[1]) / 2
        ];
        mapZoom = 7;
    } else if (originCoords) {
        mapCenter = originCoords;
        mapZoom = 10;
    }

    // Build the polyline route
    const routeLine = [];
    if (originCoords) routeLine.push(originCoords);
    if (truckPosition) routeLine.push(truckPosition);
    if (destCoords) routeLine.push(destCoords);

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                />

                {routeLine.length > 1 && (
                    <Polyline
                        positions={routeLine}
                        color="#0ea5e9"
                        weight={4}
                        opacity={0.5}
                        dashArray="10, 10"
                    />
                )}

                {originCoords && (
                    <Marker position={originCoords} icon={originIcon}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                            <span className="font-bold text-xs">Asal: {origin}</span>
                        </Tooltip>
                    </Marker>
                )}

                {destCoords && (
                    <Marker position={destCoords} icon={destIcon}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                            <span className="font-bold text-xs">Tujuan: {destination}</span>
                        </Tooltip>
                    </Marker>
                )}

                {truckPosition && (
                    <Marker position={truckPosition} icon={truckIcon} zIndexOffset={1000}>
                        <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent>
                            <span className="font-bold text-green-600 text-xs flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block mr-1"></span>
                                Live: {driverName || 'Kurir'}
                            </span>
                        </Tooltip>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default LiveTrackingMap;
