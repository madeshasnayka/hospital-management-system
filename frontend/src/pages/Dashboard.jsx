import React, { useEffect, useState } from 'react';
import { Loader } from '../components/ui/Loader';
import { StatCard } from '../components/dashboard/StatCard';
import { AppointmentsTable } from '../components/dashboard/AppointmentsTable';
import { PatientStatsChart } from '../components/dashboard/PatientStatsChart';
import { DoctorList } from '../components/dashboard/DoctorList';
import { BedStatusCard } from '../components/dashboard/BedStatusCard';
import { fetchDashboardData } from '../api/dashboardApi'; 
import { PatientRegistration } from '../components/dashboard/PatientRegistration';

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result.data);
      } catch (error) {
        // Fallback Mock Data matching your Wireframe if backend is not running
        setData({
          metrics: { 
            totalPatients: 1250, 
            totalDoctors: 45, 
            appointmentsToday: 32, 
            bedAvailability: { available: 12, occupied: 8 } 
          },
          upcomingAppointments: [
            { patientName: 'John Doe', date: '10/12/2024', time: '10:00 AM', doctorName: 'Dr. Smith' },
            { patientName: 'John Doe', date: '10/12/2024', time: '10:00 AM', doctorName: 'Dr. Smith' },
            { patientName: 'John Doe', date: '10/12/2024', time: '10:00 AM', doctorName: 'Dr. Smith' },
            { patientName: 'John Doe', date: '10/12/2024', time: '10:00 AM', doctorName: 'Dr. Smith' }
          ],
          doctorsList: [
            { name: 'Dr. Smith', specialization: 'Cardiology', contact: '123-456-7890' },
            { name: 'Dr. Smith', specialization: 'Cardiology', contact: '123-456-7890' },
            { name: 'Dr. Smith', specialization: 'Cardiology', contact: '123-456-7890' }
          ],
          patientStats: {
            admissions: [{ month: 'W1', count: 10 }, { month: 'W2', count: 25 }, { month: 'W3', count: 15 }, { month: 'W4', count: 20 }],
            discharges: [{ month: 'W1', count: 8 }, { month: 'W2', count: 18 }, { month: 'W3', count: 12 }, { month: 'W4', count: 22 }]
          },
          recentActivities: [
            { action: 'New patient registered' },
            { action: 'Appointment scheduled' },
            { action: 'Discharge completed' },
            { action: 'Billing updated' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={data.metrics.totalPatients} />
        <StatCard title="Total Doctors" value={data.metrics.totalDoctors} />
        <StatCard title="Appointments Today" value={data.metrics.appointmentsToday} />
        <StatCard 
          title="Bed Availability" 
          value={`${data.metrics.bedAvailability.available} Beds Free`} 
          highlight={true} 
        />
      </div>

      {/* Patient Registration & Appointments Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PatientRegistration />
        </div>
        <div className="lg:col-span-2">
          <AppointmentsTable appointments={data.upcomingAppointments} />
        </div>
      </div>

      {/* Patient Stats & Doctor List Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PatientStatsChart stats={data.patientStats} />
        <DoctorList doctors={data.doctorsList} />
      </div>

      {/* Bed Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BedStatusCard 
          bedAvailability={data.metrics.bedAvailability} 
          recentActivities={data.recentActivities} 
        />
      </div>
    </div>
  );
};