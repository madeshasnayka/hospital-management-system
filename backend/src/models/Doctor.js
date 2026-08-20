import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contact: { type: String, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);