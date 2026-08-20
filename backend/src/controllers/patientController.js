import Patient from '../models/Patient.js';
import Activity from '../models/Activity.js';

export const registerPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);
    
    // Log this action for the dashboard feed
    await Activity.create({ 
      action: `New patient registered: ${newPatient.name}`, 
      type: 'Patient' 
    });
    
    res.status(201).json({ success: true, data: newPatient });
  } catch (error) {
    next(error);
  }
};
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
};