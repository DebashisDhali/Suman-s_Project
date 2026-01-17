const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🧪 Testing Login API...\n');
    
    const credentials = {
      username: 'admin',
      password: 'admin123'
    };
    
    console.log('📤 Sending request to: http://localhost:5000/api/auth/login');
    console.log('📝 Credentials:', credentials);
    console.log('');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    
    console.log('✅ Login Successful!');
    console.log('📦 Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ Login Failed!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
};

testLogin();
