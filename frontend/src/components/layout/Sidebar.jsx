import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Stethoscope, Receipt, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Appointments', path: '/appointments', icon: Calendar },
  { label: 'Patients', path: '/patients', icon: Users },
  { label: 'Doctors', path: '/doctors', icon: Stethoscope },
  { label: 'Billing', path: '/billing', icon: Receipt },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-wide">HEALTHCARE+</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};