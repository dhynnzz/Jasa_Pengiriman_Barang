import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Rates from './pages/Rates';
import PrintWaybill from './pages/PrintWaybill';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shipments" 
          element={
            <ProtectedRoute>
              <Shipments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rates" 
          element={
            <ProtectedRoute>
              <Rates />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/print/:id" 
          element={
            <ProtectedRoute>
              <PrintWaybill />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
