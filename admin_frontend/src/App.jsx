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
import Branches from './pages/Branches';
import Partnerships from './pages/Partnerships';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
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
        <Route path="/rates" element={<ProtectedRoute><Rates /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute><Branches /></ProtectedRoute>} />
        <Route path="/partnerships" element={<ProtectedRoute><Partnerships /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/print/waybill/:trackingNumber" element={<ProtectedRoute><PrintWaybill /></ProtectedRoute>} />
        
        {/* Catch all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
