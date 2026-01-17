const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/charpathaliya-plants';

console.log('1. Starting Admin Creation Script...');
console.log('2. Conecting to:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('3. MongoDB Connected Successfully');
    
    try {
      // Check if admin exists
      const existingAdmin = await Admin.findOne({ email: 'admin@charpathaliya.com' });
      
      if (existingAdmin) {
        console.log('4. Admin user ALREADY EXISTS in the database.');
        // Optional: Reset password if it exists but user can't login?
        // Let's force update the password just in case it was created incorrectly before
        existingAdmin.password = 'admin123'; 
        await existingAdmin.save();
        console.log('5. Admin password has been RESET to: admin123');
      } else {
        console.log('4. Creating NEW admin user...');
        const newAdmin = new Admin({
          username: 'admin',
          email: 'admin@charpathaliya.com',
          password: 'admin123',
          role: 'admin'
        });
        
        await newAdmin.save();
        console.log('5. Admin user CREATED successfully.');
      }
      
      console.log('6. Credentials are:');
      console.log('   Email: admin@charpathaliya.com');
      console.log('   Password: admin123');
      
      process.exit(0);
    } catch (err) {
      console.error('ERROR during admin creation:', err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('CONNECTION ERROR:', err);
    process.exit(1);
  });
