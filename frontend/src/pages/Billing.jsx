import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/ui/Loader';

export const Billing = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch only currently Admitted patients for discharge/billing
  const fetchAdmittedPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/patients');
      const admittedOnly = (res.data.data || []).filter((p) => p.status === 'Admitted');
      setPatients(admittedOnly);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmittedPatients();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!patientId) {
      alert('Please select a patient to discharge.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/v1/billing/discharge', {
        patientId,
        amount
      });
      alert('Payment successful! Patient discharged and bed has been freed.');
      setPatientId('');
      setAmount('');
      fetchAdmittedPatients(); // Refresh list
    } catch (error) {
      console.error(error);
      alert('Error processing payment and discharge.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-2xl">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Billing & Patient Discharge</h2>

      <form onSubmit={handlePayment} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Select Admitted Patient</label>
          <select
            required
            className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none bg-white"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          >
            <option value="">-- Choose Admitted Patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Contact: {p.contact || 'N/A'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Total Bill Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter Amount (e.g. 15000)"
            required
            className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-3 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          Process Payment & Free Up Bed
        </button>
      </form>
    </div>
  );
};