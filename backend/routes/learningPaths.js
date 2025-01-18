const express = require('express');
const LearningPath = require('../models/LearningPath');
const router = express.Router();

// Create a new learning path
router.post('/add', async (req, res) => {
  const { title, description, difficulty } = req.body;

  const newLearningPath = new LearningPath({
    title,
    description,
    difficulty,
  });

  try {
    const savedLearningPath = await newLearningPath.save();
    res.status(201).json(savedLearningPath);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Your routes here
router.get('/', (req, res) => {
  res.send("Learning Paths");
});

module.exports = router;
