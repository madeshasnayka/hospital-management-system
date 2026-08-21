import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { processDischarge } from './controllers/billingController.js';

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://hospital-management-system-sigma-dun.vercel.app', // <-- Trailing slash REMOVED!
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ status: "success", message: "Backend is live and healthy!" });
});

// Mount All API Routes (Duplicates Removed)
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/doctors', doctorRoutes);

// Billing Route directly mounted for simplicity
const billingRouter = express.Router();
billingRouter.post('/discharge', processDischarge);
app.use('/api/v1/billing', billingRouter);

// Global Error Handler (must be at the very end)
app.use(errorHandler);

export default app;