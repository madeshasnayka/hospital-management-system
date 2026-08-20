import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true, unique: true },
  ward: String,
  status: { type: String, enum: ['Available', 'Occupied', 'Maintenance'], default: 'Available' }
}, { timestamps: true });

export default mongoose.model('Bed', bedSchema);