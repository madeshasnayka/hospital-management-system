import Appointment from '../models/Appointment.js';
import Activity from '../models/Activity.js';

export const createAppointment = async (req, res, next) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    await Activity.create({ action: `New appointment scheduled`, type: 'Appointment' });
    res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    // .populate() pulls in the actual names from the Patient and Doctor collections
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name specialization')
      .sort({ date: 1, time: 1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};