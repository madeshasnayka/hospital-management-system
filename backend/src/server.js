import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// 1. Start listening on the port immediately so Render detects the open port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// 2. Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connection established successfully.');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });