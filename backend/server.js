/**
 * server.js - Main application entry point
 * 
 * This file bootstraps the Express server:
 * - Loads environment variables from .env
 * - Connects to MongoDB
 * - Sets up middleware (cors, json parsing)
 * - Mounts all API route handlers
 * - Starts listening on the configured port
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Connect to MongoDB
connectDB()

// ─── Middleware ───────────────────────────────────────────────────────────────
// Enable Cross-Origin Resource Sharing so the React frontend can talk to this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));


// ─── Root health check ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Disaster Awareness Learning Platform API is running!' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
