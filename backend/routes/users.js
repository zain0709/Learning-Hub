const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// GET route for fetching all users
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        res.status(200).json(users); // Send the list of users
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// POST route to register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password is correct (if hashed, use bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If login is successful, send user data (excluding password)
        res.status(200).json({
            message: 'Login successful',
            user: { email: user.email },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 