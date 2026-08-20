import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },
  type: { type: String, enum: ['Patient', 'Appointment', 'Bed', 'Billing'] },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Activity', activitySchema);