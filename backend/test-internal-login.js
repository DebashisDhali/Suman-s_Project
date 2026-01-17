const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const testAdmin = async () => {
  try {
    console.log('🧪 Testing Admin Login Logic (Internal)...\n');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/charpathaliya-plants';
    console.log('🔗 Connecting to:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    const username = 'admin'; // Change if your test admin has different username
    const password = 'admin123'; // Change if your test admin has different password

    console.log(`🔍 Searching for admin: ${username}`);
    const admin = await Admin.findOne({ 
      $or: [{ username }, { email: username }] 
    });

    if (!admin) {
      console.log('❌ Admin not found in database!');
      const allAdmins = await Admin.find({}, { username: 1, email: 1 });
      console.log('Current admins in DB:', allAdmins);
      process.exit(1);
    }

    console.log('✅ Admin found');
    console.log('🔑 Email:', admin.email);
    console.log('📝 Stored Hash:', admin.password);

    console.log('\n🔄 Verifying password...');
    const isMatch = await admin.comparePassword(password);
    
    if (isMatch) {
      console.log('✅ Password Match! Login logic is correct.');
    } else {
      console.log('❌ Password Incorrect!');
    }

  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

testAdmin();
