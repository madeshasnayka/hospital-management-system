import React, { useState } from 'react';
import { registerNewPatient } from '../../api/dashboardApi';

export const PatientRegistration = () => {
  const [formData, setFormData] = useState({ 
    name: '', age: '', gender: 'Male', contact: '', status: 'Admitted' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerNewPatient(formData);
      alert('Patient Registered Successfully!');
      setFormData({ name: '', age: '', gender: 'Male', contact: '', status: 'Admitted' });
    } catch (error) {
      alert('Failed to register patient');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Patient Admission Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Patient Name" required className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" placeholder="Age" required className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
            value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
          
          <select className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500" value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        
        <input type="text" placeholder="Contact Number" required className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
          value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-200">
          Admit Patient
        </button>
      </form>
    </div>
  );
};