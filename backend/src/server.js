import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB FIRST, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
});