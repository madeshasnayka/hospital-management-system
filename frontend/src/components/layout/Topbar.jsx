import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const Topbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">HOSPITAL MANAGEMENT SYSTEM</h1>
      
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          <Link to="/appointments" className="hover:text-blue-600 transition">Appointments</Link>
          <Link to="/patients" className="hover:text-blue-600 transition">Patients</Link>
          <Link to="/doctors" className="hover:text-blue-600 transition">Doctors</Link>
          <Link to="/billing" className="hover:text-blue-600 transition">Billing</Link>
        </nav>
        
        <button className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 px-3.5 py-1.5 rounded-lg border border-rose-200 transition">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};