const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  localName: {
    type: String,
    required: true,
    trim: true,
  },
  scientificName: {
    type: String,
    required: true,
    trim: true,
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
  },
  habit: {
    type: String,
    required: true,
    enum: ['Herb', 'Shrub', 'Tree', 'Aquatic', 'Grass', 'Climber'],
  },
  uses: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Index for search functionality
plantSchema.index({ localName: 'text', scientificName: 'text', familyName: 'text' });

module.exports = mongoose.model('Plant', plantSchema);
