import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  status: { type: String, enum: ['Admitted', 'Discharged', 'Outpatient'], default: 'Outpatient' },
  admissionDate: Date,
  dischargeDate: Date
}, { timestamps: true });

// export default mongoose.model('Patient', patientSchema);
export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);