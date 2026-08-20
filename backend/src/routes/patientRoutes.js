import express from 'express';
import { registerPatient, getAllPatients } from '../controllers/patientController.js';

const router = express.Router();

// Route: POST /api/v1/patients
router.post('/', registerPatient);
router.get('/', getAllPatients);

export default router;