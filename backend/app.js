const express = require('express');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');
require('dotenv').config();

const learningPathsRoute = require('./routes/learningPaths');
const userRoutes = require('./routes/users');
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://127.0.0.1:49338', // Allow requests from this frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // If you're using cookies
};

// Middleware
app.use(cors(corsOptions)); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/learningPaths', learningPathsRoute);
app.use('/api/users', userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to AI Learning Hub!');
});

module.exports = app;
