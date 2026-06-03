import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rates from './pages/Rates';
import About from './pages/About';
import Services from './pages/Services';
import Terms from './pages/Terms';
import Help from './pages/Help';
import Tracking from './pages/Tracking';
import CoverageMap from './pages/CoverageMap';
import Track from './pages/Track';
import Partnership from './pages/Partnership';
import Branches from './pages/Branches';

import { Toaster } from 'react-hot-toast';
import AILiveChat from './components/AILiveChat';

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Global Widgets */}
      <Toaster position="top-center" reverseOrder={false} />
      <AILiveChat />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<Help />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/coverage-map" element={<CoverageMap />} />
            <Route path="/track" element={<Track />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/branches" element={<Branches />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
