import React from 'react';

export const StatCard = ({ title, value, highlight }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>
      {value}
    </p>
  </div>
);