import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/ui/Loader';

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: ''
  });

  const fetchData = async () => {
    try {
      const [apptsRes, patientsRes, doctorsRes] = await Promise.all([
        axios.get('https://hospital-management-system-tt4o.onrender.com/api/v1/appointments'),
        axios.get('https://hospital-management-system-tt4o.onrender.com/api/v1/patients'),
        axios.get('https://hospital-management-system-tt4o.onrender.com/api/v1/doctors')
      ]);

      setAppointments(apptsRes.data.data || []);
      setPatients(patientsRes.data.data || []);
      setDoctors(doctorsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId) {
      alert('Please select both a patient and a doctor.');
      return;
    }

    try {
      await axios.post('https://hospital-management-system-tt4o.onrender.com/api/v1/appointments', {
        patient: formData.patientId,
        doctor: formData.doctorId,
        date: formData.date,
        time: formData.time
      });

      alert('Appointment booked successfully!');
      setFormData({ patientId: '', doctorId: '', date: '', time: '' });
      
      const updatedAppts = await axios.get('https://hospital-management-system-tt4o.onrender.com/api/v1/appointments');
      setAppointments(updatedAppts.data.data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* SECTION 1: Booking Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Book Appointment</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Select Patient</label>
            <select
              required
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            >
              <option value="">-- Choose Patient --</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* DOCTOR DROPDOWN (Now with the Availability Filter!) */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Select Available Doctor</label>
            <select
              required
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            >
              <option value="">-- Choose Doctor --</option>
              {doctors
                .filter((d) => d.available !== false) /* ONLY ALLOW AVAILABLE DOCTORS */
                .map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} — {d.specialization}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Date</label>
              <input
                type="date"
                required
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Time</label>
              <input
                type="time"
                required
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-200 mt-2"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* SECTION 2: Scheduled Appointments */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Scheduled Clients</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-50/50">
                  <td className="py-4 font-medium">{appt.patient?.name || 'N/A'}</td>
                  <td className="py-4 text-blue-600 font-medium">{appt.doctor?.name || 'N/A'}</td>
                  <td className="py-4 text-slate-500">{appt.date}</td>
                  <td className="py-4 text-slate-500">{appt.time}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                      {appt.status || 'Scheduled'}
                    </span>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">
                    No appointments booked yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};