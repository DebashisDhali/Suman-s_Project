const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing JWT Signing...');
try {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is undefined in process.env');
  }
  
  const token = jwt.sign(
    { id: '123' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  console.log('✅ JWT Sign Success!');
} catch (error) {
  console.error('❌ JWT Sign Failed:', error.message);
}
