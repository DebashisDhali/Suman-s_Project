const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// @route   GET /api/plants
// @desc    Get all plants with filtering and search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { habit, family, search, page = 1, limit = 12 } = req.query;
    
    let query = {};

    // Filter by habit
    if (habit && habit !== 'all') {
      query.habit = habit;
    }

    // Filter by family
    if (family && family !== 'all') {
      query.familyName = family;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { localName: { $regex: search, $options: 'i' } },
        { scientificName: { $regex: search, $options: 'i' } },
        { familyName: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const plants = await Plant.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Plant.countDocuments(query);

    res.json({
      success: true,
      plants,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/plants/stats
// @desc    Get plant statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const total = await Plant.countDocuments();
    
    const habitStats = await Plant.aggregate([
      {
        $group: {
          _id: '$habit',
          count: { $sum: 1 },
        },
      },
    ]);

    const familyStats = await Plant.aggregate([
      {
        $group: {
          _id: '$familyName',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      success: true,
      stats: {
        total,
        byHabit: habitStats,
        topFamilies: familyStats,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/plants/:id
// @desc    Get single plant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plant not found' 
      });
    }

    res.json({
      success: true,
      plant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/plants/families/list
// @desc    Get list of all unique families
// @access  Public
router.get('/families/list', async (req, res) => {
  try {
    const families = await Plant.distinct('familyName');
    
    res.json({
      success: true,
      families: families.sort(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;
