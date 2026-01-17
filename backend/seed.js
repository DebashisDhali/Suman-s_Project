const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Plant = require('./models/Plant');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/charpathaliya-plants';

const samplePlants = [
  {
    localName: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    familyName: 'Lamiaceae',
    habit: 'Herb',
    uses: [
      'Used for common cold and cough',
      'Acts as an adaptogen to reduce stress',
      'Anti-inflammatory and antioxidant properties',
      'Support oral health'
    ],
    description: 'A sacred herb in Hindu culture, Tulsi is known as the "Queen of Herbs" for its immense medicinal value.',
    location: 'Charpathaliya',
    mapLink: 'https://goo.gl/maps/example1'
  },
  {
    localName: 'Water Lily',
    scientificName: 'Nymphaea pubescens',
    familyName: 'Nymphaeaceae',
    habit: 'Aquatic',
    uses: [
      'Ornamental value',
      'Used in traditional medicine for skin diseases',
      'Roots are used as food in some cultures',
      'Helps maintain aquatic ecosystem balance'
    ],
    description: 'A beautiful aquatic plant that thrives in the ponds and slow-moving streams of Charpathaliya.',
    location: 'Charpathaliya',
    mapLink: 'https://goo.gl/maps/example2'
  },
  {
    localName: 'Neem',
    scientificName: 'Azadirachta indica',
    familyName: 'Meliaceae',
    habit: 'Tree',
    uses: [
      'Antibacterial and antifungal properties',
      'Used for skin disorders and wound healing',
      'Natural pesticide',
      'Dental care (neem twigs)'
    ],
    description: 'Neem is a fast-growing tree that can reach a height of 15–20 meters and is famous for its bitter medicinal properties.',
    location: 'Charpathaliya',
    mapLink: 'https://goo.gl/maps/example3'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // 1. Create Admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'admin',
        email: 'admin@charpathaliya.com',
        password: 'admin123', // Will be hashed by pre-save hook
      });
      await admin.save();
      console.log('✅ Admin user created: admin / admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // 2. Clear existing plants (optional)
    // await Plant.deleteMany({});

    // 3. Add sample plants if none exist
    const plantCount = await Plant.countDocuments();
    if (plantCount === 0) {
      await Plant.insertMany(samplePlants);
      console.log(`✅ ${samplePlants.length} sample plants added`);
    } else {
      console.log('ℹ️ Plant database already contains data');
    }

    console.log('🚀 Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
