import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from './models/Patient.js';
import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';
import Bed from './models/Bed.js';
import Activity from './models/Activity.js';

// Load environment variables so it can find your MONGO_URI
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // 1. Clear out any old/broken testing data
    await Promise.all([
      Patient.deleteMany(),
      Doctor.deleteMany(),
      Appointment.deleteMany(),
      Bed.deleteMany(),
      Activity.deleteMany(),
    ]);

    // 2. Create Doctors (Notice Dr. Sanjay Gupta is marked available: false)
    const docs = await Doctor.insertMany([
      { name: 'Dr. Ramesh Kumar', specialization: 'Cardiology', contact: '9876543210', available: true },
      { name: 'Dr. Priya Sharma', specialization: 'Neurology', contact: '8765432109', available: true },
      { name: 'Dr. Anita Desai', specialization: 'Pediatrics', contact: '7654321098', available: true },
      { name: 'Dr. Sanjay Gupta', specialization: 'Orthopedics', contact: '6543210987', available: false }, 
      { name: 'Dr. Vikram Singh', specialization: 'Oncology', contact: '5432109876', available: true }
    ]);

    // 3. Create Patients
    const patients = await Patient.insertMany([
      { name: 'Rahul Gowda', age: 45, gender: 'Male', contact: '9998887776', status: 'Admitted' },
      { name: 'Kavya N', age: 28, gender: 'Female', contact: '8887776665', status: 'Outpatient' }
    ]);

    // 4. Create Appointments
    await Appointment.insertMany([
      { patient: patients[0]._id, doctor: docs[0]._id, date: new Date().toISOString().split('T')[0], time: '10:00 AM', status: 'Scheduled' },
      { patient: patients[1]._id, doctor: docs[1]._id, date: new Date().toISOString().split('T')[0], time: '11:30 AM', status: 'Scheduled' }
    ]);

    // 5. Create Beds
    await Bed.insertMany([
      { bedNumber: 'B-101', ward: 'General', status: 'Occupied' },
      { bedNumber: 'B-102', ward: 'General', status: 'Available' },
      { bedNumber: 'ICU-1', ward: 'ICU', status: 'Available' }
    ]);

    // 6. Create Recent Activities
    await Activity.insertMany([
      { action: 'Rahul Gowda admitted to General Ward', type: 'Patient' },
      { action: 'Appointment scheduled for Kavya N', type: 'Appointment' }
    ]);

    console.log('✅ Data successfully seeded! You can now start your server.');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();