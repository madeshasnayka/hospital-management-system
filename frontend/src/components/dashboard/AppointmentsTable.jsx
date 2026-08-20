import React from 'react';

export const AppointmentsTable = ({ appointments }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-4">Upcoming Appointments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-3">Patient Name</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Time</th>
              <th className="pb-3">Doctor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700">
            {appointments.map((appt, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="py-3 font-medium">{appt.patient?.name || appt.patientName || 'N/A'}</td>
                <td className="py-3 text-slate-500">{appt.date}</td>
                <td className="py-3 text-slate-500">{appt.time}</td>
                <td className="py-3 font-medium text-blue-600">{appt.doctor?.name || appt.doctorName || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <button className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition">
        View All
      </button>
    </div>
  </div>
);