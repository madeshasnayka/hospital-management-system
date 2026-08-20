import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import {registerPatient} from '../controllers/patientController.js'
const router = express.Router();

// Route: GET /api/v1/dashboard
router.get('/', getDashboardSummary);
router.post('/patients', registerPatient);

export default router;