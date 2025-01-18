const express = require('express');
const router = express.Router();

// GET route for fetching all users (or just a simple message)
router.get('/', (req, res) => {
    res.send("Users route is working!");
});

// POST route for registering a new user
router.post('/register', (req, res) => {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Logic to save the user to the database (in a real app, you'd hash the password and save to MongoDB)
    const newUser = { name, email, password };

    // For now, just log the user data
    console.log('New User Data:', newUser);

    // Respond with a success message and the new user's data (in a real app, you'd send the saved user)
    res.status(201).send({
        message: 'User registered successfully!',
        user: newUser
    });
});

module.exports = router; // Make sure to export the router
