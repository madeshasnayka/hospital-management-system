// import { Patient, Doctor, Appointment, Bed, Activity } from '../models/DashboardSchemas.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Bed from '../models/Bed.js';
import Activity from '../models/Activity.js';
export const getDashboardSummary = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Parallel aggregate fetches for optimal performance
    const [
      totalPatients,
      totalDoctors,
      appointmentsToday,
      totalBeds,
      occupiedBeds,
      upcomingAppointments,
      doctorsList,
      recentActivities
    ] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments({ date: today, status: 'Scheduled' }),
      Bed.countDocuments(),
      Bed.countDocuments({ status: 'Occupied' }),
      Appointment.find({ status: 'Scheduled' })
        .populate('patient', 'name')
        .populate('doctor', 'name specialization')
        .sort({ date: 1, time: 1 })
        .limit(4),
      Doctor.find().limit(3).select('name specialization contact'),
      Activity.find().sort({ timestamp: -1 }).limit(4)
    ]);

    const availableBeds = totalBeds - occupiedBeds;

    // Monthly patient statistics mockup/aggregation
    const patientStats = {
      admissions: [
        { month: 'Jan', count: 45 },
        { month: 'Feb', count: 65 },
        { month: 'Mar', count: 35 },
        { month: 'Apr', count: 50 },
      ],
      discharges: [
        { month: 'Jan', count: 30 },
        { month: 'Feb', count: 48 },
        { month: 'Mar', count: 28 },
        { month: 'Apr', count: 42 },
      ]
    };

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalPatients,
          totalDoctors,
          appointmentsToday,
          bedAvailability: {
            occupied: occupiedBeds,
            available: availableBeds,
            total: totalBeds
          }
        },
        upcomingAppointments,
        doctorsList,
        patientStats,
        recentActivities
      }
    });
  } catch (error) {
    next(error);
  }
};