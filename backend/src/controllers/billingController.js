import Patient from '../models/Patient.js';
import Bed from '../models/Bed.js';
import Activity from '../models/Activity.js';

export const processDischarge = async (req, res, next) => {
  try {
    const { patientId, amount } = req.body;

    // 1. Find and update the patient status to 'Discharged'
    const patient = await Patient.findByIdAndUpdate(
      patientId, 
      { status: 'Discharged', dischargeDate: new Date() },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // 2. Find an occupied bed and make it available (Simulating releasing their specific bed)
    // In a real app, the patient schema would hold their specific bedId. 
    // Here, we just grab one occupied bed and free it up to increment the count.
    const bedToFree = await Bed.findOne({ status: 'Occupied' });
    
    if (bedToFree) {
      bedToFree.status = 'Available';
      await bedToFree.save();
    }

    // 3. Log the activity for the dashboard feed
    await Activity.create({
      action: `Bill paid (₹${amount}). ${patient.name} discharged. Bed freed.`,
      type: 'Billing'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Patient discharged successfully',
      data: patient 
    });
  } catch (error) {
    next(error);
  }
};