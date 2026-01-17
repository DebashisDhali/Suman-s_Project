const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/charpathaliya-plants';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Find all admins
    const admins = await Admin.find({});
    console.log('\n📋 All Admin Users in Database:');
    console.log('================================');
    
    if (admins.length === 0) {
      console.log('❌ No admin users found in database!');
    } else {
      admins.forEach((admin, index) => {
        console.log(`\nAdmin ${index + 1}:`);
        console.log(`  Username: ${admin.username}`);
        console.log(`  Email: ${admin.email}`);
        console.log(`  Hashed Password: ${admin.password.substring(0, 20)}...`);
      });
    }
    
    // Test password comparison
    console.log('\n🔐 Testing Password Comparison:');
    console.log('================================');
    const testAdmin = await Admin.findOne({ username: 'admin' });
    if (testAdmin) {
      const testPassword = 'admin123';
      const isMatch = await testAdmin.comparePassword(testPassword);
      console.log(`Password "${testPassword}" matches: ${isMatch ? '✅ YES' : '❌ NO'}`);
      
      // Also test bcrypt directly
      const directMatch = await bcrypt.compare(testPassword, testAdmin.password);
      console.log(`Direct bcrypt compare: ${directMatch ? '✅ YES' : '❌ NO'}`);
    } else {
      console.log('❌ Admin user not found!');
    }
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection Error:', err);
    process.exit(1);
  });
