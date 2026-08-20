import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

export const PatientStatsChart = ({ stats }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
    <h3 className="text-base font-bold text-slate-800 mb-4">Patient Statistics</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Admissions</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.admissions}>
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Discharges</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.discharges}>
              <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);