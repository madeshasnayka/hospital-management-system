import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { Patients } from './pages/Patients';
import { Doctors } from './pages/Doctors';
import { Billing } from './pages/Billing';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen font-sans">
        {/* Sidebar stays fixed on the left */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Topbar stays fixed at the top */}
          <Topbar />
          
          {/* Main content area that changes based on the URL */}
          <main className="flex-1 overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;