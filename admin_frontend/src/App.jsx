import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Rates from './pages/Rates';
import PrintWaybill from './pages/PrintWaybill';
import Reports from './pages/Reports';
import Drivers from './pages/Drivers';
import Partnerships from './pages/Partnerships';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('adminRole') || 'Admin';

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika allowedRoles ada dan role user tidak ada dalam allowedRoles, tolak akses
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/shipments" element={<ProtectedRoute><Shipments /></ProtectedRoute>} />
        <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
        <Route path="/print/waybill/:trackingNumber" element={<ProtectedRoute><PrintWaybill /></ProtectedRoute>} />
        
        {/* Restricted Routes (Only for Admin & Super Admin) */}
        <Route path="/rates" element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Rates /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Reports /></ProtectedRoute>} />
        <Route path="/partnerships" element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Partnerships /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Users /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['Admin', 'Super Admin']}><Settings /></ProtectedRoute>} />
        
        {/* Catch all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
