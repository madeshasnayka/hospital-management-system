import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { processDischarge } from './controllers/billingController.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';
// import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
// Assuming you created billingController.js from our previous step
// import { processDischarge } from './controllers/billingController.js'; 

// import { errorHandler } from './middlewares/errorHandler.js';
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true }));

// Mount Routes
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/patients', patientRoutes);
// Global Error Handler Middleware (must be at the end)
// Mount all API routes
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/doctors', doctorRoutes);

// Billing Route directly mounted for simplicity
const billingRouter = express.Router();
billingRouter.post('/discharge', processDischarge);
app.use('/api/v1/billing', billingRouter);

app.use(errorHandler);


export default app;