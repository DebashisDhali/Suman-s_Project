const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// All routes are protected with authMiddleware

// @route   POST /api/admin/plants
// @desc    Create new plant
// @access  Private (Admin only)
router.post('/plants', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { localName, scientificName, familyName, habit, uses, description, location, mapLink } = req.body;

    // Parse uses if it's a string
    let parsedUses = uses;
    if (typeof uses === 'string') {
      try {
        parsedUses = JSON.parse(uses);
      } catch (e) {
        parsedUses = uses.split(',').map(u => u.trim());
      }
    }

    const plantData = {
      localName,
      scientificName,
      familyName,
      habit,
      uses: parsedUses,
      description,
      location,
      mapLink,
      createdBy: req.admin._id,
    };

    // Add image path if uploaded
    if (req.file) {
      plantData.image = req.file.path; // This will be the Cloudinary URL
    }

    const plant = new Plant(plantData);
    await plant.save();

    res.status(201).json({
      success: true,
      message: 'Plant created successfully',
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

// @route   PUT /api/admin/plants/:id
// @desc    Update plant
// @access  Private (Admin only)
router.put('/plants/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { localName, scientificName, familyName, habit, uses, description, location, mapLink } = req.body;

    let plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plant not found' 
      });
    }

    // Parse uses if it's a string
    let parsedUses = uses;
    if (typeof uses === 'string') {
      try {
        parsedUses = JSON.parse(uses);
      } catch (e) {
        parsedUses = uses.split(',').map(u => u.trim());
      }
    }

    // Update fields
    plant.localName = localName || plant.localName;
    plant.scientificName = scientificName || plant.scientificName;
    plant.familyName = familyName || plant.familyName;
    plant.habit = habit || plant.habit;
    plant.uses = parsedUses || plant.uses;
    plant.description = description || plant.description;
    plant.location = location || plant.location;
    plant.mapLink = mapLink || plant.mapLink;

    // Update image if new one uploaded
    if (req.file) {
      // Delete old image if it was local
      if (plant.image && plant.image.startsWith('/uploads')) {
        const oldImagePath = path.join(__dirname, '..', plant.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // If it's Cloudinary, you could optionally delete it here too using plant.image (URL to public_id conversion needed)
      
      plant.image = req.file.path;
    }

    await plant.save();

    res.json({
      success: true,
      message: 'Plant updated successfully',
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

// @route   DELETE /api/admin/plants/:id
// @desc    Delete plant
// @access  Private (Admin only)
router.delete('/plants/:id', authMiddleware, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plant not found' 
      });
    }

    // Delete image file if it was local
    if (plant.image && plant.image.startsWith('/uploads')) {
      const imagePath = path.join(__dirname, '..', plant.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Plant.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Plant deleted successfully',
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

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin only)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalPlants = await Plant.countDocuments();
    const families = await Plant.distinct('familyName');
    const totalFamilies = families.length;

    const recentPlants = await Plant.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('localName scientificName createdAt');

    const habitDistribution = await Plant.aggregate([
      {
        $group: {
          _id: '$habit',
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert distribution array to object
    const habitStats = {};
    habitDistribution.forEach(item => {
      habitStats[item._id] = item.count;
    });

    res.json({
      success: true,
      dashboard: {
        totalPlants,
        totalFamilies,
        recentPlants,
        habitStats,
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

module.exports = router;
