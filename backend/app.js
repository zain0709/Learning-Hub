const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const learningPathsRoute = require('./routes/learningPaths');
const userRoutes = require('./routes/users');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/learningPaths', learningPathsRoute);
app.use('/api/users', userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to AI Learning Hub!');
});

module.exports = app;
