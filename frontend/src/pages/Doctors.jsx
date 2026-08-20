import React from 'react';

const doctorList = [
  { id: 1, name: 'Dr. Ramesh Kumar', specialization: 'Cardiology', contact: '9876543210', status: 'Available' },
  { id: 2, name: 'Dr. Priya Sharma', specialization: 'Neurology', contact: '8765432109', status: 'Available' },
  { id: 3, name: 'Dr. Anita Desai', specialization: 'Pediatrics', contact: '7654321098', status: 'Available' },
  { id: 4, name: 'Dr. Sanjay Gupta', specialization: 'Orthopedics', contact: '6543210987', status: 'In Surgery' },
  { id: 5, name: 'Dr. Vikram Singh', specialization: 'Oncology', contact: '5432109876', status: 'Available' },
  { id: 6, name: 'Dr. Meera Reddy', specialization: 'Dermatology', contact: '4321098765', status: 'On Leave' },
  { id: 7, name: 'Dr. Arun Patel', specialization: 'General Surgery', contact: '3210987654', status: 'Available' },
  { id: 8, name: 'Dr. Sunita Rao', specialization: 'Psychiatry', contact: '2109876543', status: 'Available' }
];

export const Doctors = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Medical Staff Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {doctorList.map((doc) => (
          <div key={doc.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50 hover:shadow-md transition">
            <h3 className="text-lg font-bold text-blue-600">{doc.name}</h3>
            <p className="text-sm font-medium text-slate-600 mt-1">{doc.specialization}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">{doc.contact}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                doc.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};