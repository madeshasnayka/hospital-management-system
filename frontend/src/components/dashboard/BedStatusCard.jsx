import React from 'react';

export const BedStatusCard = ({ bedAvailability, recentActivities }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
    <h3 className="text-base font-bold text-slate-800 mb-4">Bed Status</h3>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Occupied Beds</span>
          <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
            {bedAvailability.occupied}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Available Beds</span>
          <span className="font-bold text-slate-800 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg">
            {bedAvailability.available}
          </span>
        </div>
        <button className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition">
          Manage Beds
        </button>
      </div>

      <div className="border-l border-slate-100 pl-6">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recent Activities</h4>
        <ul className="space-y-2.5 text-xs text-slate-600">
          {recentActivities.map((activity, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {activity.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);