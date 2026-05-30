import React from 'react';
import { createRoot } from 'react-dom/client';
import CoverageMapApp from './components/CoverageMapApp';
import LiveTrackingMap from './components/LiveTrackingMap';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import '../css/map-custom.css';

const rootElement = document.getElementById('coverage-map-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<CoverageMapApp />);
}

const liveTrackingElement = document.getElementById('live-tracking-root');
if (liveTrackingElement) {
    const root = createRoot(liveTrackingElement);
    root.render(<LiveTrackingMap />);
}
