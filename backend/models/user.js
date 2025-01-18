const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the User model using the schema
module.exports = mongoose.model('User', userSchema);
