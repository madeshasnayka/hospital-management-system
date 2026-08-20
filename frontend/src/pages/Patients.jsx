import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/ui/Loader';

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://hospital-management-system-ei40.onrender.com/api/v1/patients');
        setPatients(response.data.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // The empty array ensures this runs once when the page opens

  if (loading) return <Loader />;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Patient Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold bg-slate-50">
              <th className="p-4 rounded-tl-lg">Patient Name</th>
              <th className="p-4">Age/Gender</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Admission Date</th>
              <th className="p-4 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700">
            {patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium">{patient.name}</td>
                <td className="p-4">{patient.age} / {patient.gender}</td>
                <td className="p-4">{patient.contact}</td>
                <td className="p-4">{new Date(patient.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    patient.status === 'Admitted' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500">No patients found. Add one from the Dashboard!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};